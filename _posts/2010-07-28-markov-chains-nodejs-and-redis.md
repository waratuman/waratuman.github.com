---
title: Markov Chains, Node.js, and Redis
author: James R. Bracy
layout: post
---

Today's task is to create pseudo random text by using a [Markov Chain](http://en.wikipedia.org/wiki/Markov_chain). [Redis](http://code.google.com/p/redis/)
will be used to store the data and [Node.js](http://nodejs.org/) will do the
processing!

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

Open a file named server.js and add the following code. Don't worry, we will
go through the code in a bit.

    require.paths.unshift(__dirname + '/lib');

    var fs = require('fs'),
    	sys = require('sys'),	
    	redis = require('redis-client').createClient();

    var init = function() {
      var texts = fs.readdirSync(__dirname + '/texts');
    	for(var i = 0; i < 1; i++) {
    		var filename = __dirname + '/texts/' + texts[i];
    		fs.readFile(filename, 'ascii', function(err, data) {
    			var words = data.split(/\s+/);
    			for(var j = 0; j < words.length - 1; j++) {
    				redis.hincrby(words[j], words[j+1], 1);
    			}
    			redis.close();
    		});
    	}
    }

    var randomWord = function(callback) {
    	redis.randomkey(function(result, key) {
    		callback(key);
    	});
    }

    var nextWord = function(word, callback) {
    	redis.exists(word, function(err, data) {
    		if (data == null) { callback(null); }
    		else {
    			redis.hgetall(word, function(result, data) {
    				var sum = 0;
    				for (var i in data) {
    					sum += data[i];
    				}
    				var rand = Math.floor(Math.random()*sum+1);
    				var partial_sum = 0;
    				var next = null;
    				for (var i in data) {
    					partial_sum += data[i];
    					if (partial_sum >= rand) { next = i; }
    				}
    				callback(next);
    			});
    		}
    	});
    }

    var randomSentance = function(callback) {
    	var sentance = '';
    	randomWord( function(word) {
    		sentance = word;
    		function build(next) {
    			sentance += ' ' + next;
    			if (/(\.|!|\?)/.exec(sentance)) {
    				sys.puts(sentance);
    				redis.close();
    			} else
    			{ nextWord(next, build); }
    		}
    		build(word);
    	});
    }


    if (process.argv[2] == 'init') {
    	init();
    } else {
    	randomSentance();
    }
    
Ok, lets take the first section:

    require.paths.unshift(__dirname + '/lib');

    var fs = require('fs'),
        sys = require('sys'),   
        redis = require('redis-client').createClient();
        
This just loads the require libraries to use. `fs` is for filesystem tools,
`sys` is for system tools, and `redis-client` is what we will use to talk to
Redis.

The next section is the initialization function:

    var init = function() {
      var texts = fs.readdirSync(__dirname + '/texts');
        for(var i = 0; i < 1; i++) {
            var filename = __dirname + '/texts/' + texts[i];
            fs.readFile(filename, 'ascii', function(err, data) {
                var words = data.split(/\s+/);
                for(var j = 0; j < words.length - 1; j++) {
                    redis.hincrby(words[j], words[j+1], 1);
                }
                redis.close();
            });
        }
    }

This will load each of the texts, split the words based on whitespace, create
a hash in Redis for the word. Each hash as keys the next word in the text, the
value of which is the frequency that it occurs. This is how the first order
Markov Chain is constructed.

Go ahead and start Redis or use [Redis To Go](http://redistogo.com). Now run
the following the construct the Markov Chain:

    $ node server.js init
    
Now see what you get for output!

    I'M for whisky; and blooded the humans, but dog not wishin' to drive at that-air sasser o' ye!

Lets look at the `randomWord` function and `nextWord`.

    var randomWord = function(callback) {
    	redis.randomkey(function(result, key) {
    		callback(key);
    	});
    }

    var nextWord = function(word, callback) {
    	redis.exists(word, function(err, data) {
    		if (data == null) { callback(null); }
    		else {
    			redis.hgetall(word, function(result, data) {
    				var sum = 0;
    				for (var i in data) {
    					sum += data[i];
    				}
    				var rand = Math.floor(Math.random()*sum+1);
    				var partial_sum = 0;
    				var next = null;
    				for (var i in data) {
    					partial_sum += data[i];
    					if (partial_sum >= rand) { next = i; }
    				}
    				callback(next);
    			});
    		}
    	});
    }

The `randomWord` function just picks a random key from Redis. This is used to
start out the sentence.

Now `nextWord` will return a word that would come after the one given. First
we check to see if the word has a next word. If so we proceed to randomly
select a word giving weight to its frequency.

And the last major function is the `randomSentance`.

    var randomSentance = function(callback) {
    	var sentance = '';
    	randomWord( function(word) {
    		sentance = word;
    		function build(next) {
    			sentance += ' ' + next;
    			if (/(\.|!|\?)/.exec(sentance)) {
    				sys.puts(sentance);
    				redis.close();
    			} else
    			{ nextWord(next, build); }
    		}
    		build(word);
    	});
    }

All this does is find word after word until we notice a character notifying
the end of a sentence. Once completed it will print out the sentence.

So that is it! We have just made and evented system for generating pseudo
random text with a first order Markov Chain using Node.js and Redis. If you
are feeling like having a 'buzzword' compliant stack, stick a web front end on
and put it on [Heroku](http://heroku.com).

This post is inspired by [Ruby Quiz](http://rubyquiz.com/quiz74.html).

Take note that this code is just meant as a learning exercise. The code is
horrible and you probably don't want to use it.