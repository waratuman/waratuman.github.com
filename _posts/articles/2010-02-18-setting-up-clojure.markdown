---
title: Installing Clojure on Mac OS X
author: James R. Bracy
category: articles
layout: post
tags:
  - Clojure
  - java
  - Mac
  - OS X
  - Snow Leopard
extract: "<p>The following instructions are for installing Clojure on Mac OS X 10.6
(Snow Leopard), although they should work for any *nix based system.</p>"
---

The following instructions are for installing Clojure on Mac OS X 10.6
(Snow Leopard), although they should work for any \*nix based system.

## Dependencies

Java 1.5 or greater is require for running Clojure. This already comes
pre-installed on OS X. Run the following command from the Terminal (in
`/Applications/Utilities`) to ensure that this dependency is met.

    $ java -version
    java version "1.6.0_17"
    Java(TM) SE Runtime Environment (build 1.6.0_17-b04-248-10M3025)
    Java HotSpot(TM) 64-Bit Server VM (build 14.3-b01-101, mixed mode)

If you don't see something similar to the previous you will need to
install java. Also since we will be compiling Clojure from source
`git` is required to check out the source code and Ant is required to
build Clojure. Run the following to see if `git` is installed.

    $ git --version
    git version 1.6.6

If you see something similar, git is installed and you can move on. If
you don't see something similar to the previous then you will need to
install `git`. Follow
[these
instructions](http://solutions.treypiepmeier.com/2008/02/25/installing-git-on-os-x-leopard/ "Install git").

And now make sure `ant` is installed. Its included with OS X, so it
you won't have to install anything.

    $ ant -version
    Apache Ant version 1.7.1 compiled on September 22 2009

## Set the `PATH`

The `PATH` variable tells the Terminal where to find the programs that
are about to be installed.

If you are using Textmate you can use the following command to open
the file.

    $ mate ~/.profile

Go ahead and open the `~/.profile` and make sure that the `PATH`
variable is set and includes `/usr/local/bin` and
`/usr/local/sbin`. You should have a line in the file that looks
similar to the following, if not add it to the end of the file.

    export PATH="/usr/local/bin:/usr/local/sbin:$PATH"

After saving the file, return to the Terminal and run the following
command.

    $ source ~/.profile

## Download and Install

Since we will be installing from source we need a place that we can
download the source to and compile. Once the installation is complete
the directory can then be deleted.

Make the folder:

    $ mkdir ~/src && cd ~/src

Download Clojure:

    $ git clone git://github.com/richhickey/clojure.git
    $ cd clojure
    $ git checkout 1.1.0
    $ ant

Test the build:

    $ java -cp clojure-1.1.0.jar clojure.main
    Clojure 1.1.0
    user=> (+ 1 1)
    2
    user=> (System/exit 0)

If Clojure told you that `1 + 1` is `2` then it looks like things are
working. Now we can install. This is not a typical install, all we do
is just move the `.jar` file.

    $ sudo mkdir /usr/local/lib/clojure
    $ sudo cp clojure-1.1.0.jar /usr/local/lib/clojure/clojure.jar

## Install `rlwrap`

 `rlwrap` will make interacting with the Clojure REPL much more
 friendly. It is not necessary but I recommend it. With `rlwrap` you
 will have tab completion, parenthesis matching, and much more. The
 easiest way to install `rlwrap` is with
 [MacPorts](http://www.macports.org/ "MacPorts"). Go ahead and install
 MacPorts if you don't have it installed.

    $ sudo port install rlwrap

Now you should be able to run the following command.

    $ rlwrap --version
    rlwrap 0.30

## Create the `clj` Script

This is the script that will be called from the command line when you
type `clj`. In your editor of choice open `/usr/local/bin/clj`. If you
are using Textmate you can use the following command.

    $ mate /usr/local/bin/clj

Copy the following text into the file:

    #!/bin/sh
    # Parts of this file come from:
    # http://en.wikibooks.org/wiki/Clojure_Programming/Getting_Started#Create_clj_Script 
    
    BREAK_CHARS="\(\){}[],^%$#@\"\";:''|\\"
    CLOJURE_DIR=/usr/local/lib/clojure
    CLOJURE_JAR=$CLOJURE_DIR/clojure.jar
    CLASSPATH="$CLOJURE_DIR/*:$CLOJURE_JAR"
    
    while [ $# -gt 0 ]
    do
    	case "$1" in
        -cp|-classpath)
                CLASSPATH="$CLASSPATH:$2"
		shift ; shift
		;;
	-e) tmpfile="/tmp/`basename $0`.$$.tmp"
		echo "$2" > "$tmpfile"
		shift ; shift
		set "$tmpfile" "$@"
		break # forces any -cp to be before any -e
		;;
	*)  break
		;;
	esac
    done
    
    if [ $# -eq 0 ]
    then
      exec rlwrap --remember -c -b $BREAK_CHARS \
              -f "$HOME"/.clj_completions \
              java -cp $CLASSPATH clojure.main
    else
      exec java -cp $CLASSPATH clojure.main $1 -- "$@"
    fi

Make the script executable: 

    $ sudo chmod +x /usr/local/bin/clj

Now you should be able to run Clojure from the command line.

    $ clj

You are now in command of a Clojure REPL. The installation is
complete. Try a few commands in the REPL:

    user=> (+ 3 5)
    8
    user=> (def A [[0 1 2] [3 4 5] [6 7 8]])
    #'user/A
    user=> (let [[x y z] (first A)]
                (println (+ x y z)))
    3
    nil
    user=> (println "Hello, World!")
    Hello, World!
    nil

A file can also be passed to `clj` to run as a script.

    $ clj clojure_script.clj


## Installing `clojure-contrib`

Clojure Contrib contains useful libraries for Clojure. Chances are
that they will be used in almost all projects in Clojure. The install
is similar to Clojure. Go ahead an check out the source and install
with the following commands.

    $ cd ~/src
    $ git clone git://github.com/richhickey/clojure-contrib.git
    $ cd clojure-contrib/
    $ git checkout 1.1.0
    $ ant -Dclojure.jar=/usr/local/lib/clojure/clojure.jar
    $ sudo cp clojure-contrib.jar /usr/local/lib/clojure/clojure-contrib.jar

From the REPL you should be able use the `clojure-contrib` libraries
(`clojure-contrib` will be on the classpath since it was installed
into `/usr/local/lib/clojure/`).

    $ clj
    user=> (use 'clojure.contrib.combinatorics)
    nil
    user=> (permutations [1 2])
    ((1 2) (2 1))

## Clean up

Now you can go ahead an remove the directory that we created at the start to hold the source code and compile it.

    $ rm -rf ~/src
