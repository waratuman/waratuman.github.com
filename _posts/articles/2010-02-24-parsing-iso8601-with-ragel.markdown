---
title: Parsing ISO8601 with Ragel
author: James R. Bracy
category: articles
layout: post
tags:
  - Ragel
  - Clojure
  - Java
  - State Machine
  - ISO8601
extract: "<p>A state machine is a perfect way to parse dates that are represented
as strings. Ragel is a state machine compiler that can interface with
a varity of lanuages. Using a tool like Ragel is far better than using
a typical regular expression in terms of both speed and handling
actions.</p>"
---

A state machine is a perfect way to parse dates that are represented
as strings. Ragel is a state machine compiler that can interface with
a varity of lanuages. Using a tool like Ragel is far better than using
a typical regular expression in terms of both speed and handling
actions.

For this exercise we will write a parser for several of the date
formats specified in the ISO8061 standard. To keep the scope of this
project within reach the first phase is to parse all of the following
formats:

    (date){1} . ((" " | "T") . (time) . (time zone)){0,1}

In English we want a date, where the date formats are specified below,
followed by a space or the capital letter "T" after which is the time
and time zone. The date must be present, but the time and time zone
portions are optional.

### dates:
    YY                          
    YYYY
    YYYY-MM
    YYYYMMDD
    YYYY-MM-DD
### times:
    hh
    hhmm
    hh:mm
    hhmmss
    hh:mm:ss
### time zones:
    Z
    ±hh
    ±hhmm
    ±hh:mm

For this project the interface language for Ragel is going to be Java
(not my first choice, but we have to do it), with the ultimate goal of
using the parser from Clojure. So lets go ahead and get started.

Leiningen is the favored build tool for Clojure at the moment. So
start a new project with `lein` (the Leiningen executable).

Create the directory for the project.

    lein new iso_parser && cd iso_parser

Open the `project.clj` and replace what is there with the following:

    (defproject iso-parser "0.0.1"
      :description "ISO8601 parser for Clojure."
      :source-path "src/clj"
      :java-source-path "src/jvm"
      :javac-fork "true"
      :dependencies [[org.clojure/clojure "1.1.0"]
                     [org.clojure/clojure-contrib "1.1.0-master-SNAPSHOT"]]
      :dev-dependencies [[lein-javac "0.0.2-SNAPSHOT"]])

This file simple state the dependencies that are required to build the
project and the source paths for compiling the Java code and finding
where the Clojure is.

Now make the source directories:

    mkdir -p src/clj/iso_parser
    mkdir -p src/jvm/iso_parser

The first file we will create and edit is the Ragel file. This is will
be located in `src/jvm/iso_parser/ISODateParser.rl`. Lets touch the
file and open it in the editor.

     touch src/jvm/iso_parser/ISODateParser.rl

Open the file in you editor of choice and lets get started with the
state machine.

    package iso_parser;
    
    import java.text.ParseException;
    import java.util.GregorianCalendar;

    %%{
      machine ISO8601;
      
      year = digit{2} | digit{4};

      main := year;
    }%%

    public class ISODateParser {
      
      %% write data;
          
      public static GregorianCalendar parse(String string) throws ParseException {
        char[] data = string.toCharArray();
        int cs;
        int eof = data.length;
        int p = 0;
        int pe = eof;
        GregorianCalendar calendar = null;
        
        %% write init;
        %% write exec;
        
        if (cs == ISO8601_error || calendar == null) {
          throw new ParseException("Unparseable Date.", p);
        }
        
        return calendar;
      }
    }

So a lot is going on here. The parts of the code that either start
with `%%` or are wrapped in `%%{` and `}%%` are the Ragel code. The
rest of the code is simply Java. The line `machine ISO8601;` states the
name of the state machine.

At first we are just going to parse 2 digit years and 4 digit
years. This is obviously the statement `year = digit{2,4};`.
The `main := year` is the definition of the machine and where the point of entry
into the machine will occur.

In order for Ragel to actually execute code several variables are
required `data` (a character array), `cs` for the current state of the
state machine, `eof` for the where the data ends, `p` for the pointer
to the current character being processed, and `pe` for the end point
in the data array.

The statement `%% write data;` causes Ragel to output Java code that is
required for when the state machine runs. The `%% write init;`
statement writes code that initializes the state machine and the `%%
write exec;` produces the code that will execute the state machine.

The rest of the code is pure Java and is for returning a value after
the data is parsed or throwing an error if the data was unable to be
parsed.

Go ahead and compile the Ragel code to Java with the following
command:

    ragel -J src/jvm/iso_parser/ISODateParser.rl

Everything should compile just find. If you are interested we can also
output a `dot` file that we can then use to visualize the state
machine using [graphviz](http://www.graphviz.org/) with the following
command:

    ragel -V src/jvm/iso_parser/ISODateParser.rl > sm.dot

If you open the `dot` file `graphviz` you will see the following:

![Visualization of State Machine](/resources/images/articles/2010-02-24-year-dot.png)

The `IN` represents the entry point into the state machine. In this
case it starts at the node `1`. From node `1` a character with the
byte value of 48 to 57 (ASCII for 0-9) is expected. If value is found
that is not between 48 and 57 the machine is put into an error
state and the `cs` value is set to `ISO8601_error`. This is how we
tell if a parse error occurred and throw an exception.

The double circles represent final states. In this case the only final
states are after 2 characters have been read or 4 characters have been
read. If the `cs` is set to a final state and the `eof` has been
reached then we can say that the data was successfully parsed.

The flow should now be obvious. If two digits, and two digits only, are
found sequentially, then the state machine ends up in the final state
`4`. If four digits are found sequentially and the `eof` is reached
then the state machine ends up in the final state `5`.

So it looks like the machine goes into the right states and ends up in
the correct state, but what happens after we are done processing the
data? Some how we need to set the `calendar` object after the data has
been processed. This is done with actions. Specifically we want an
action that will execute when the `eof` has been reached and the state
is a final state. The updated Ragel code to do this is:

    package iso_parser;
    
    import java.text.ParseException;
    import java.util.GregorianCalendar;

    %%{
      machine ISO8601;
      
      action tag { ts = p; }
      action set_year { 
        year = Integer.parseInt(new String(data, ts, p));
        calendar = new GregorianCalendar(year, 0, 1);
      }
      
      year = (digit{2} | digit{4}) >tag  %/set_year;

      main := year;
    }%%

    public class ISODateParser {
      
      %% write data;
          
      public static GregorianCalendar parse(String string) throws ParseException {
        char[] data = string.toCharArray();
        int cs;
        int eof = data.length;
        int p = 0;
        int pe = eof;
        GregorianCalendar calendar = null;

        int ts = 0;
        int year = 0;
        
        %% write init;
        %% write exec;
        
        if (cs == ISO8601_error || calendar == null) {
          throw new ParseException("Unparseable Date.", p);
        }
        
        return calendar;
      }
    }

Notice that two actions `tag` and `set_year`. The `tag` simply
marks a point in the data, in this case where the year starts. The
`set_year` parses the integer and sets the `year` variable to that
value. 

The syntax for executing an action when a state is entered is `>`. The
syntax to execute an action when the `eof` is reached and the state is
a final state is `%/`. Looking at where the year expression is set we
see that the `tag` action is executed at the start of the year and
that the `set_year` action is executed when the end of the year is
reached.

So update the code and compile the Ragel file again:

    ragel -J src/jvm/iso_parser/ISODateParser.rl

Now that the Ragel file has been compiled we can compile the Java code,
fire up a REPL and see how this thing works in Clojure.

    lein deps
    lein compile-java
    lein compile
    lein repl
    
    user=>(import 'iso_parser.ISODateParser)
    iso_parser.ISODateParser
    user=>(ISODateParser/parse "12")
    ... nasty output ...
    user=>(ISODateParser/parse "2010")
    ... nasty output ...
    user=>(ISODateParser/parse "Hello, World!")
    java.text.ParseException: Unparseable Date. (NO_SOURCE_FILE:0)

Sweet! Looks like things are working. The function accepts both 2
digit and 4 digit years. (Although in the code we are getting year 12
instead of year 1200, I'll leave this bug as an exercise for you to
fix).

Now lets make a Clojure wrapper so that this can be accessed in a more
functional/lisp manner. Luckily this part isn't going to be nearly as
bad.

Go ahead and create the file:

    touch src/clj/iso_parser/core.clj

Now we need to add the parse function to this file:

    (ns iso-parser.core
      (:import java.util.GregorianCalendar
               iso_parser.ISODateParser))
    
    (defn parse [string]
      (ISODateParser/parse string))

    (defn year [cal]
      (.get cal GregorianCalendar/YEAR))

Great, so now this will give us the ability to parse a 2 and 4 digit
year as well as use the `year` function to extract it. Go ahead and
compile and lets see this in action!

    lein compile
    lein repl
    user=> (use 'iso-parser.core)
    nil
    user=> (parse "12")
    ... nasty stuff (but it works) ...
    user=> (year (parse "1999"))
    1999

Ok, things are looking good. We have now successfully created a
program that can parse 2 and 4 digit years. It took a lot to get here
and there is a lot going on. If you have gotten this far,
congrats. We have built a state machine using Ragel, wrote some Java
code, and made some Clojure code that interfaces with the Java
code. But now the road gets tougher. We did all of this and only 
have a small subset of what the ISO standards states.

The code for this project is hosted at
[github.com](http://github.com/waratuman/date-utils)
if you are interested in looking at a more thought through solution
and code that is actually begin used. For instance how do you handle
leap years? Can you do that in a state machine like this? You can.

[Here](/resources/images/articles/2010-02-24-date-utils.dot) is the final `dot` file for the code that is hosted on github if
you are interested.



