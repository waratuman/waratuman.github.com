---
title: Vectors in Ada
author: James R. Bracy
layout: post
font: sans
tags:
  - Ada
  - gnat
  - Vectors
---

Recently I decided to learn Ada by doing a few problems from the
[Project Euler](http://projecteuler.net/). The first two problems were pretty
straightforward when it came to the implementation. The third problem was a
little more complicated because the solution that I choose to implement
required the use of a vector as I did not know the number of elements that
would need stored in an array before run-time. It turns out this was
more difficult than I had imagined because Google either failed to turn up any
results for 'vector ada example' that gave an example of how to actually use
them or the internet did not have any articles covering this. So this post
will remedy that and give the internet at least one example of how to use
vectors in Ada.

First we have to use the `Ada.Containers.Vectors`. Open up a file titled
`euler3.adb` and add the following statements:

    with Ada.Containers.Vectors;
    with Ada.Integer_Text_IO;
    with Ada.Text_IO;
    
    use Ada.Containers;

    procedure Euler3 is

        package Integer_Vectors is new Vectors(Natural, Integer);
    
    begin
    
        Ada.Text_IO.Put_Line("Hello, World!");
    
    end


The line `package Integer_Vectors is new Vectors(Natural, Integer);` states
that the package `Integer_Vectors` is a vector with the indexs being
natural numbers and the values being integers.

Ok, now lets make the program actually do something:

    with Ada.Containers.Vectors;
    with Ada.Integer_Text_IO;
    with Ada.Text_IO;
    
    use Ada.Containers;

    procedure Euler3 is

        package Integer_Vectors is new Vectors(Natural, Integer);
        
        Numbers : Integer_Vectors.Vector;
        
    begin
        
        Numbers.Append(43);
        Ada.Integer_Text_IO.Put(Numbers.First_Element);
    
    end
    
Go ahead and compile with GNAT: `gnat make euler3.adb`. After running the
program it will out put  `43`.

Note that the operations on the vector can either but done using the Object
Oriented notation or the traditional:

    with Ada.Containers.Vectors;
    with Ada.Integer_Text_IO;
    with Ada.Text_IO;
    use Ada.Containers;

    procedure Euler3 is

        package Integer_Vectors is new Vectors(Natural, Integer);

        Numbers : Integer_Vectors.Vector;

    begin

        Integer_Vectors.Append(Numbers, 43);
        Ada.Integer_Text_IO.Put(Integer_Vectors.First_Element(Numbers));

    end Euler3;

Compile and run and the output will be the same.

For more useful functions and procedures see the [Ada Reference Manual](http://www.adaic.com/standards/05rm/html/RM-A-18-2.html).

But there is one more thing that I would like to touch on, Cursors. Some
languages offer easy iteration. Ruby for example allows nice concise syntax: 
`[1,2,3].each { |x| puts x }`. Others are not so easy.

    with Ada.Containers.Vectors;
    with Ada.Integer_Text_IO;
    with Ada.Text_IO;
    use Ada.Containers;

    procedure Euler3 is

        package Integer_Vectors is new Vectors(Natural, Integer);

        Numbers : Integer_Vectors.Vector;
        Cursor : Integer_Vectors.Cursor;

    begin

        -- Get some content
        Integer_Vectors.Append(Numbers, 43);
        Integer_Vectors.Append(Numbers, 44);
        Integer_Vectors.Append(Numbers, 45);

        Cursor := Integer_Vectors.First(Numbers);
        while Integer_Vectors.Has_Element(Cursor) loop
            Ada.Integer_Text_IO.Put(Integer_Vectors.Element(Cursor));
            Ada.Text_IO.New_Line;
            Integer_Vectors.Next(Cursor);
        end loop;

    end Euler3;
    
And that is how it is done in Ada.
