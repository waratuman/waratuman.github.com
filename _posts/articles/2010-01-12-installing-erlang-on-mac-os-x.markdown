---
title: Installing Erlang on Mac OS X
author: James R. Bracy
category: articles
layout: post
tags:
  - Erlang
  - Mac
  - OS X
  - Snow Leopard
extract: "<p>The following instructions are for installing Erlang on Mac OS X 10.6 (Snow Leopard).</p>
	  <p>Dan Benjamin has commented on the benefits of installing from source and using <code>/usr/local</code>
	  and his postings can be found <a href='http://hivelogic.com/articles/using_usr_local/'>here</a>
	  and <a href='http://hivelogic.com/articles/ruby-rails-leopard/'>here</a>&hellip;
          </p>
---

The following instructions are for installing Erlang on Mac OS X 10.6 (Snow Leopard).

Dan Benjamin has commented on the benefits of installing from source and using `/usr/local` and his postings can be found [here](http://hivelogic.com/articles/using_usr_local/ "Using /usr/local") and [here](http://hivelogic.com/articles/ruby-rails-leopard/ "Installing Ruby, Rubygems, Rails, and Mongrel on Mac OS X 10.5 (Leopard)").

Before starting be sure that the Xcode Tools have been installed. They can either be installed from the OS X installation disc or found [here](http://developer.apple.com/tools/xcode/).

## Set the PATH

First, launch the Terminal program found in `/Applications/Utilities`. The `PATH` tells the Terminal where to find the applications that are about to be installed.

<blockquote cite="http://hivelogic.com/articles/compiling-ruby-rubygems-and-rails-on-snow-leopard/">
<p>The PATH variable determines where your system searches for command-line programs. You’ll need to set it so that it can find the new apps you’re about to install.</p><p>&ndash; <cite>Dan Benjamin</cite></p></blockquote>

If you are using [Textmate](http://macromates.com/ "Textmate") you can use the following command. If you are not using Textmate, open the same file (`~/.profile`) in your editor of choice.

    $ mate ~/.profile

The following line needs to be added to the end of the file.

    $ export PATH="/usr/local/bin:/usr/local/sbin:$PATH"

After saving the file, return to Terminal and run the following command:

    $ source ~/.profile

## Download

First we need a place that we can download and compile Erlang. Once the installation is complete the folder can be deleted.

Make the folder:

    $ mkdir ~/src && cd ~/src

Download Erlang:

    $ curl -O http://ftp.sunet.se/pub/lang/erlang/download/otp_src_R13B03.tar.gz
    $ tar -xzf otp_src_R13B03.tar.gz
    $ cd otp_src_R13B03

## Compile and Install

    $ ./configure --prefix=/usr/local  \
    $             --enable-kernel-poll \
    $             --enable--threads    \
    $             --enable-smp-support \
    $             --enable-hipe        \
    $             --enable-m64-build
    $ make
    $ sudo make install

## Run

You should now be able to run and compile Erlang programs. Try the following to ensure that everything is working:

    $ erl
    Erlang R13B03 (erts-5.7.4) [source] [smp:2:2] [rq:2] [async-threads:0] [kernel-poll:false]
    
    Eshell V5.7.4  (abort with ^G)
    1> 

A prompt should appear telling you that you are in the Eshell. If everything worked, then the installed worked.

To quit the prompt type:

    1>q().

## Clean up

Now you can go ahead an remove the directory that we created at the start to hold the source code and compile it.

    cd ~/
    rm -rf ~/src
