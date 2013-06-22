---
title: Algebraic Word Problems
author: James R. Bracy
layout: post
font: sans
---

The next section in the book *Problem Solving Through Recreation 
Mathematics* that I am doing is about taking a word problem, representing it
in algebraic form and then solving it.

While reading the chapter I found what the term *Algebra* actually means and 
where it came from. From the page 70 of the book:

> The word algebra is derived from the title of a book on the subject (as it
> existed at the time), *His&acirc;b al-jabr w'al-muq&acirc;balah*, which 
> was written by the Persian mathematician Al-Khowarizmi (c. 825). The term
> al-jabr apparently meant  "restoring," as in restoring the balance between
> the two sides of an equation by subtracting from one side what has been 
> subtracted from another.

So all of these years of simply accepting the term *algebra* and now I know
what it means. It actually makes a lot of sense.

## The Problem

On with the problem:

> **3.51.** Peter Piper and his wife Pepper have a vegetable garden and a
> fruit orchard. Working together they can collect the harvest from the garden
> in 3 hours, whereas Pepper, working alone, requires 12 hours. Furthermore,
> together they can harvest the orchard in 2 hours, whereas Peter,  alone,
> takes 10 hours.
> 
> It would seem that to harvest both the garden and the orchard, they should
> first spend 3 hours in the garden and then 2 hours in the orchard -- a total
> of five hours in all. However, Peter is much more skillful at picking
> vegetables and Pepper is better at picking fruit, so that they can time by 
> having Peter work in the garden and Pepper work in the orchard until one of 
> them finishes. That person would then help the other.
> 
> How much time can they save in this manner?

First lets understand what the problem is asking for. Sometimes I go through 
the whole process of solving the equations, but don't do the last step. We 
want to know the difference between the time it would take both Peter and 
Pepper to harvest both the garden and orchard together one right after 
another, 5 hours, and the time it would take if they worked separately at what
each did best then join together on whatever remains when one finishes.

## Work it Out

First we extract the variables and formulas from the text. (Note that you must
have a MathML enabled browser to view the equations.)

- <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>a</mi><mn>g</mn></msub></mrow></math>:
  the time that it takes Peter to complete harvesting the garden
- <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>b</mi><mn>g</mn></msub></mrow></math>:
  the time that it takes Pepper to complete harvesting the garden
- <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>a</mi><mn>o</mn></msub></mrow></math>:
  the time that it takes Peter to complete harvesting the orchard
- <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>b</mi><mn>o</mn></msub></mrow></math>:
  the time that it takes Pepper to complete harvesting the orchard

"Working together they can collect the harvest from the garden in 3 hours"
translates to:

<math xmlns="http://www.w3.org/1998/Math/MathML">
<mrow>
<mfenced>
<mrow>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>a</mi><mn>g</mn></msub></mrow>
</mfrac>
<mo>+</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>b</mi><mn>g</mn></msub></mrow>
</mfrac>
</mrow>
</mfenced>
</mrow>
<mo>=</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><mi>3</mi></mrow>
</mfrac>
</math>

"Whereas Pepper, working alone, requires 12 hours." translates to:

<math xmlns="http://www.w3.org/1998/Math/MathML">
<mrow>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>b</mi><mn>g</mn></msub></mrow>
</mfrac>
<mo>=</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><mi>12</mi></mrow>
</mfrac>
</mrow>
</math>

Here we can clearly see that
<math xmlns="http://www.w3.org/1998/Math/MathML">
<mrow>
<msub><mi>b</mi><mn>g</mn></msub>
<mo>=</mo>
<mi>12</mi>
</math>

Next: "together they can harvest the orchard in 2 hours"

<math xmlns="http://www.w3.org/1998/Math/MathML">
<mrow>
<mfenced>
<mrow>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>a</mi><mn>o</mn></msub></mrow>
</mfrac>
<mo>+</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>b</mi><mn>o</mn></msub></mrow>
</mfrac>
</mrow>
</mfenced>
<mo>=</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><mi>2</mi></mrow>
</mfrac>
</mrow>
</math>

"whereas Peter, alone, takes 10 hours":

<math xmlns="http://www.w3.org/1998/Math/MathML">
<mrow>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>a</mi><mn>o</mn></msub></mrow>
</mfrac>
<mo>=</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><mi>10</mi></mrow>
</mfrac>
<mo>&#x27F6;<!-- &longrightarrow; --></mo>
<msub><mi>a</mi><mn>o</mn></msub>
<mo>=</mo>
<mi>10</mi>
</mrow>
</math>

Now we can solve for <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>a</mi><mn>g</mn></msub></mrow></math>
and <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><msub><mi>b</mi><mn>o</mn></msub></mrow></math>.

<math xmlns="http://www.w3.org/1998/Math/MathML">
<mrow>
<mfenced>
<mrow>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>a</mi><mn>g</mn></msub></mrow>
</mfrac>
<mo>+</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><mi>12</mi></mrow>
</mfrac>
</mrow>
</mfenced>
<mo>=</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><mi>3</mi></mrow>
</mfrac>
<mo>&#x27F6;<!-- &longrightarrow; --></mo>
<msub><mi>a</mi><mn>g</mn></msub>
<mo>=</mo>
<mi>4</mi>
</mrow>
</math>

<math xmlns="http://www.w3.org/1998/Math/MathML">
<mrow>
<mfenced>
<mrow>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><mi>10</mi></mrow>
</mfrac>
<mo>+</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>b</mi><mn>o</mn></msub></mrow>
</mfrac>
</mrow>
</mfenced>
<mo>=</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><mi>2</mi></mrow>
</mfrac>
<mo>&#x27F6;<!-- &longrightarrow; --></mo>
<msub><mi>b</mi><mn>o</mn></msub>
<mo>=</mo>
<mfrac>
<mrow><mi>5</mi></mrow>
<mrow><mi>2</mi></mrow>
</mfrac>
</mrow>
</math>

So it takes 2.5 hours for Pepper to finish the orchard and 4 hours for Peter
to finish the garden. After 2.5 hours Pepper will then help out in the garden
because she will be done with the orchard. After spending
<math xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mi>t</mi></mrow></math>
amount of time working together they will have completed harvesting. We
represent that with the following:

<math xmlns="http://www.w3.org/1998/Math/MathML">
<mrow>
<mfenced>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>b</mi><mn>o</mn></msub></mrow>
</mfrac>
</mfenced>
<mfenced>
<mfrac>
<mrow><mi>5</mi></mrow>
<mrow><mi>2</mi></mrow>
</mfrac>
</mfenced>
<mo>+</mo>
<mfenced>
<mrow>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>a</mi><mn>g</mn></msub></mrow>
</mfrac>
<mo>+</mo>
<mfrac>
<mrow><mi>1</mi></mrow>
<mrow><msub><mi>b</mi><mn>g</mn></msub></mrow>
</mfrac>
</mrow>
</mfenced>
<mi>t</mi>
<mo>=</mo>
<mi>1</mi>
<mo>&#x27F6;<!-- &longrightarrow; --></mo>
<mi>t</mi>
<mo>=</mo>
<mfrac>
<mrow><mi>9</mi></mrow>
<mrow><mi>8</mi></mrow>
</mfrac>
</mrow>
</math>

So the total time spent is 
<math xmlns="http://www.w3.org/1998/Math/MathML">
<mrow>
<mfrac>
<mrow><mi>5</mi></mrow>
<mrow><mi>2</mi></mrow>
</mfrac>
<mo>+</mo>
<mfrac>
<mrow><mi>9</mi></mrow>
<mrow><mi>8</mi></mrow>
</mfrac>
<mo>=</mo>
<mi>3.62500</mi></mrow></math>. And the difference is <math xmlns="http://www.w3.org/1998/Math/MathML">
<mrow><mi>5</mi>
<mo>-</mo>
<mi>3.62500</mi>
<mo>=</mo>
<mi>1.37500</mi></mrow></math> hours. And that is the answer.