---
layout: doc
title: "Pointers Gone Wild"
permalink: pointers_gone_wild
submissions:
- title: Entire Assignment
  due_date: 10/24 11:59pm
  graded_files:
  - part1-functions.c
  - part2-main.c 
learning_objectives:
  - Pointers
  - Strings
  - Functions
---

## Introduction

In CS 125, CS 225, and other classes, you have used various languages that are considered to be "C-based", but up to now you may have very limited experience in C programming. This MP will provide a short programming introduction to pointers, strings, and functions in C.

This machine problem will be divided up into two parts. In the first part, you will be modifying broken functions so that their output matches the given output. In the second part, you will need to write code to call some 'creatively defined' functions so that those functions produce the desired output.

For this MP, you should modify:

*   <tt>part1-functions.c</tt>
*   <tt>part2-main.c</tt>

All other files will be replaced with new/different files for grading. If you modify any other files for debugging purposes, please ensure you test your program with the original files.

## Part 1:

There are erroneous/unimplemented functions in <tt>part1-functions.c</tt>. Your task is to modify functions according to comment above each function such that the output of part1 looks exactly as follows:
{% highlight text %}
== one() ==
3^2 + 4^2 = 25
10^2 + 10^2 = 200
== two() ==
20 not passed!
100.000000 passed!
== three() ==
The value of p is: 4
== four() ==
The value is between zero and one.
The value is not between zero and one.
== five() ==
x and y are equal.
x and y are different.
== six() ==
4 == 4.000000
432 == 432.000000
== seven() ==
a is a letter.
a is not a letter.
== eight() ==
Hello
== nine() ==
The value of p is: 12.500000
== ten() ==
0 == 0?
== eleven() ==
Hello World!
== twelve() ==
0.000000 0.100000 0.200000 0.300000 0.400000 0.500000 0.600000 0.700000 0.800000 0.900000 
== thirteen() ==
0 10 40 90 160 250 360 490 640 810 
== fourteen() ==
orange and blue!
ORANGE and blue!
Orange and BLUE!
orange and blue!
== fifteen() ==
You passed in the value of one!
You passed in the value of two!
You passed in some other value!
== sixteen() ==
Hello
== seventeen() ==
The radius of the circle is: 17.500000.
The radius of the circle is: 10.000000.
== eighteen() ==
Result: 323
Result: 2499
== clear_bits() ==
170
0
171
0
20
0
== little finite automatons
5
4
6
7
{% endhighlight %}

Note that you can just diff with ```part1-expected-output```.

## Part 2:

We have pre-uploaded some files to your mp0 SVN directory, including <tt>part2-functions.c</tt>. Inside <tt>part2-functions.c</tt>, you will see twelve different functions, including <tt>first_step()</tt> (re-printed below).

{% highlight c %}
void first_step(int value) {
  if (value == 81)
    printf("1: Illinois\n");
}
{% endhighlight %}

To complete Part 2, you must complete the program <tt>part2-main.c</tt> so that <tt>part2-main.c</tt> makes calls to all twelve functions in <tt>part2-functions.c</tt> such that they print their "Illinois" line. When running <tt>./part2</tt>, your output should look exactly like:

{% highlight text %}
1: Illinois
2: Illinois
3: Illinois
4: Illinois
5: Illinois
6: Illinois
7: Illinois
8: Illinois
9: Illinois
10: Illinois
11: Illinois
{% endhighlight %}

Note that you can just diff with ```part2-expected-output```.

<span style="color: #800">You should NOT edit the part2-functions.c file. In fact, when we grade your program, we will replace the part2-functions.c file with a new version of the file (and we'll change the "Illinois" string so printing out "Illinois" in a for-loop will get you no credit).</span>

## Compile and Run

To compile the release version of the code run:

{% highlight bash %}
make clean
make
{% endhighlight %}


This will compile your code with some optimizations enabled, and will not include debugging information (if you use a debugger on the 'release' build, it will not be able to show you the original source code, or line numbers). Optimizations sometimes expose bugs in your code that would not show up otherwise, but since optimizations tend to reorder your code while compiling, an optimized version of your code is not optimal for debugging.

You probably don't need to worry about the different build types very much for this assignment, but the distinction will become more important on future assignments.

To compile your code in debug mode, run `make debug` instead of `make`.

To run Part 1:

{% highlight bash %}
./part1
{% endhighlight %}

or

{% highlight bash %}
./part1-debug
{% endhighlight %}

To run Part 2:

{% highlight bash %}
./part2
{% endhighlight %}

or

{% highlight bash %}
./part2-debug
{% endhighlight %}
