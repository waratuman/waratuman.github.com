---
title: Installing RabbitMQ on Mac OS X
author: James R. Bracy
layout: post
tags:
  - AMQP
  - RabbitMQ
  - OS X
  - Snow Leopard
---

The following instructions are for installing RabbitMQ on Mac OS X
10.6 (Snow Leopard).

Before starting be sure that the Xcode Tools have been installed and
that Erlang is installed. If it is not, this
[post](/installing-erlang-on-mac-os-x.html) will take you through the 
necessary steps to get it installed.

## Set the `PATH`

First, launch the Terminal program found in
`/Applications/Utilities`. The `PATH` tells the Terminal where to find
the applications that are about to be installed.

<blockquote cite="http://hivelogic.com/articles/compiling-ruby-rubygems-and-rails-on-snow-leopard/">
<p>The <code>PATH</code> variable determines where your system searches for
command-line programs. You’ll need to set it so that it can find the
new apps you’re about to install.</p><p>&ndash; <cite>Dan
Benjamin</cite></p></blockquote>

If you are using [Textmate](http://macromates.com/ "Textmate") you can
use the following command. If you are not using Textmate, open the
same file (`~/.profile`) in your editor of choice.

    $ mate ~/.profile

The following line needs to be added to the end of the file.

    $ export PATH="/usr/local/bin:/usr/local/sbin:$PATH"

After saving the file, return to Terminal and run the following command:

    $ source ~/.profile

## Download

First we need a place to download and compile RabbitMQ. Once the
installation is complete the folder can be removed.

From the terminal run the following command to make the folder that we
will use to download and compile RabbitMQ: 

    $ mkdir ~/src && cd ~/src

Download AMQP and unarchive it:

    $ curl -O http://www.rabbitmq.com/releases/rabbitmq-server/v1.7.2/rabbitmq-server-1.7.2.tar.gz
    $ tar -xzf rabbitmq-server-1.7.2.tar.gz
    $ cd rabbitmq-server-1.7.2

## Compile and Install

    $ make
    $ sudo make install TARGET_DIR=/usr/local/rabbitmq-server \
                        SBIN_DIR=/usr/local/bin \
                        MAN_DIR=/usr/local/man

This will install RabbitMQ to the `/usr/local` directory.

## Run

To run simple use the following command:

    $ sudo rabbitmq-server

Congratulations! You are now running RabbitMQ.

## Clean Up

Now you can go ahead an remove the directory that we created at the
start to hold the source code and compile it.

    $ cd ~/
    $ rm -rf ~/src
