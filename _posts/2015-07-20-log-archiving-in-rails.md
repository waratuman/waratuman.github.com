---
title: Log Archiving in Rails
author: James R. Bracy
layout: post
font: sans
tags:
  - Rails
  - Logging
  - S3
---

Archiving your logs to [Amazon S3](http://aws.amazon.com/s3/) is a simple way to
backup your log files. They'll be on S3 if you ever need them and you'll free up
space on you servers. You could use a logging service, but if you're like me you
won't be using the fancy interface. Ruby has a built in solution to log rotation.
The only other things you need is the rake task to archive the files to S3 and a
[Systemd Timer](http://www.freedesktop.org/software/systemd/man/systemd.timer.html)
(or use the [crontab](http://crontab.org/)).

## The Logger

The Rails [ActiveSupport::Logger](http://api.rubyonrails.org/classes/ActiveSupport/Logger.html)
is a wrapper over Ruby's built in [Logger](http://ruby-doc.org/stdlib-2.1.0/libdoc/logger/rdoc/Logger.html).
The Ruby logger has an option for rotating the logs based on size or time.

To create a new logger that rotates based on time:

    logger = Logger.new('production.log', 'daily') # or 'weekly', 'monthly'

The time based logger rotation didn't seem to work to well for me though, so I
ended up using a sized based rotation and haven't had any issues with it.

To create a new logger based on time:

    logger = Logger.new('production.log', 10, 104857600)   # Roteate logs when it is 100MB in size and keep 10
    logger = Logger.new('production.log', 1000, 104857600) # Roteate logs when it is 100MB in size and keep 1000)

To add support for [Rails](http://rubyonrails.org/) we just modify the
environment file (`config/environments/production.rb`) and pass the same
arguments to ActiveSupport::Logger which will then be passed on to the standard
Ruby Logger.

    Rails.application.configure do

        # Your production configuration.

        # Roteate logs when it is 100MB in size and keep 100.
        config.logger = ActiveSupport::Logger.new(config.paths['log'].first, 100, 104857600)

    end

The `configs.paths['log'].first` will grab the file used for logging based off
the current environment (eg. `log/production.log`).

## The Rake Task

The rake task is what will clean up any of the rotated log files and archive
them to S3. It looks for all rotated log files and then uses [`s3cmd`](http://s3tools.org/s3cmd)
to upload them to an Amazon S3 bucket. Once completed, the task removes the
rotated logs. The task uses the AWS credentials in a configuration file
(`config/application.yml` in this case).

The full rake task with comments (`lib/tasks/log.rake`):

    namespace :log do

      desc "Archive Roated logs to S3"
      task :archive do

        config = Rails.application.config_for(:application)['aws']

        # Find all of the log files that have been rotated
        files = Dir.entries("#{Rails.root}/log").select { |x| x =~ /\A.+\.log\.\d+\z/ }

        # Compress the log files
        files.each { |file| `/usr/bin/gzip #{Rails.root}/log/#{file}` }
        gziped_files = Dir.entries("#{Rails.root}/log").select { |x| x =~ /\A.+\.log\.\d+\.gz\z/ }

        # Write the configuration for s3cmd
        f = File.new("#{Rails.root}/tmp/.s3cfg", 'w')
        f << (<<-S3CONFIG).strip_heredoc
            [default]
            access_key = #{config['access_key_id']}
            bucket_location = US
            encoding = UTF-8
            guess_mime_type = True
            host_base = s3.amazonaws.com
            host_bucket = %(bucket)s.s3.amazonaws.com
            secret_key = #{config['secret_access_key']}
            use_https = True
        S3CONFIG
        f.close

        # Store the compressed files to S3
        hostname = `/usr/bin/hostname`.strip
        app_name = Rails.application.class.name.split('::')[0..-2].join('::')
        log_bucket = 'AWS_BUCKET' # Your AWS bucket for the logs
        gziped_files.each do |file|
          time = Time.now.utc.iso8601
          destination = file.gsub(/\A(.+)\.log\.(\d+)\.gz\z/, "s3://#{AWS_BUCKET}/#{app_name}/\\1/#{time}-#{hostname}.\\2.log.gz")
          `s3cmd --config '#{Rails.root}/tmp/.s3cfg' put '#{Rails.root}/log/#{file}' '#{destination}'`
          `rm '#{Rails.root}/log/#{file}'` if $? == 0
        end
      end

    end

And example configuration file:

    production:
      aws:
        access_key_id:  'ACCESS_KEY'
        secret_access_key:  'SECRET_KEY'
        asset_bucket:  'BUCKET'
        asset_bucket_host_alias: 'BUCKET_ALIAS'

## The Systemd Timer

The last piece is to setup the periodic task to archive all rotated logs. The
crontab is an alternative if you aren't familiar with Systemd. Most systems are
now using [systemd](http://www.freedesktop.org/wiki/Software/systemd/), and if
you are using [systemd units](http://www.freedesktop.org/software/systemd/man/systemd.unit.html)
to controll your app, it's the way to go.

There are two files to create to setup the timer, the service file and the timer
file. Place the following into the `/usr/lib/systemd/system/APPNAME-log-archiver.timer`.

    [Unit]
    Description=APPNAME Log Archiver

    [Timer]
    # How often you want the logs to be archived
    # See: http://www.freedesktop.org/software/systemd/man/systemd.time.html
    OnCalendar=daily

    [Install]
    # Use WantedBy to add as a dependency to the application
    # WantedBy=app.target

Then create the related service for the timer `/usr/lib/systemd/system/APPNAME-log-archiver.service`.


    [Unit]
    Description=APPNAME Log Archiver
    After=network.target

    [Service]
    # I tend to have a conf file for my Rails App Systemd Servcie for specifing
    # the environment to run in. Depends on how your setup is though.
    # .include /usr/lib/systemd/system/core.target.conf
    User=APPUSER
    Group=APPUSER
    # The working directory for your Rails app, my apps are all served
    # from the /srv/APPNAME/current directory (Capistrano setup)
    WorkingDirectory=/srv/APPNAME/current
    ExecStart=/usr/bin/bundle exec rake log:archive

## Enable

Once you deploy the app you can then enable the systemd timer on each server.

    systemctl enable APPNAME-log-archvier.timer
    systemctl start APPNAME-log-archvier.timer
