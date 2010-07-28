---
title: Markov Chains, Node.js, and Redis
author: James R. Bracy
layout: post
---

Today's task is to create pseudo random text by using a Markov Chain. Redis
will be used to store the data and Node.js will do the processing and be the
server for a simple web front end.

## Install Redis and Node.js

Start with Redis:

    $ git clone http://github.com/antirez/redis.git
    $ cd redis
    $ make
    $ sudo make install
    $ cd ..
    $ rm -rf redis
    
Now Node.js:

    $ git clone http://github.com/ry/node.git
    $ cd node
    $ ./configure
    $ make
    $ sudo make install
    $ cd ..
    $ rm -rf node

## Create the Project

Create a new directory for the project.

    $ mkdir textgen
    $ cd textgen

Create a `lib` directory for storing any dependencies that application will
have.

    $ mkdir lib

Install the `redis-node` client.

    $ curl -o lib/redis-client.js http://github.com/fictorial/redis-node-client/raw/master/lib/redis-client.js

Make a directory to store some texts in.

    $ mkdir texts
    $ curl -o texts/30601.txt http://www.gutenberg.org/files/30601/30601.txt
    $ curl -o texts/27827.txt http://www.gutenberg.org/files/30601/27827.txt
    $ curl -o texts/1661.txt http://www.gutenberg.org/files/1661/1661.txt
    $ curl -o texts/7ldvc10.txt http://www.gutenberg.org/dirs/etext04/7ldvc10.txt

Open a file named analyze.js and add the following code.

    