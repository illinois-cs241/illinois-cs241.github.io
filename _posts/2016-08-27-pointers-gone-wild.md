---
layout: doc
title: "Pointers Gone Wild"
permalink: pointers_gone_wild
---

## Introduction

In CS 125, CS 225, and other classes, you have used various languages that are considered to be "C based", but up to now you may have very limited experience in C programming. This MP will provide a short programming introduction to pointers, strings, and functions in C.

This machine problem will be divided up into two pieces. In the first piece, you will be modifying functions originally with errors such that the outputs match the given output. In the second piece, you will need to write some code to call some 'creatively defined' functions so that those functions produce the desired output.

For this MP, you may modify:

*   <tt>part1-functions.c</tt>
*   <tt>part2-main.c</tt>

All other files will be replaced with new/different files for grading. If you modify any other files for debugging purposes, please ensure you test your program with the original file.

## Part 1:

There are erroneous/unimplemented functions in <tt>part1-functions.c</tt>. Your task is to modify functions according to comment above each function such that the output of part1 looks exactly as follows:
{% highlight text %}
== one() ==
3^2 + 4^2 = 25
10^2 + 10^2 = 200
== two() ==
20 not passed!
100 passed!
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

## Part 2:

We have pre-uploaded some files to your mp0 svn directory, including <tt>part2-functions.c</tt>. Inside <tt>part2-functions.c</tt>, you will see twelve different functions, including <tt>first_step()</tt> (re-printed below).

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

<span style="color: #800">You should NOT edit the part2-functions.c file. In fact, when we grade your program, we will replace the part2-functions.c file with a new version of the file (and we'll change the "Illinois" string so printing out "Illinois" in a for-loop will get you no credit).</span>

## Compile and Run

To compile the release version of the code run:

{% highlight bash %}
make clean
make
{% endhighlight %}


This will compile your code with some optimizations enabled, and will not include debugging information (if you use a debugger on the 'release' build, it will not be able to show you the original source code, or line numbers). Optimizations sometimes expose some bugs in your code that would not show up when no optimizations are enabled, but since optimizations tend to reorder your code while compiling, an optimized version of your code is not optimal for debugging.

You probably don't need to worry about the different build types very much for this assignment, but the distinction will become more important on future assignments.

To compile your code in debug mode, run `make debug` instead of `make`

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

## Grading, Submission, and Other Details

Please fully read details on [Academic Honesty](https://courses.engr.illinois.edu/cs241/#/overview#integrity). These are shared between all MPs in CS 241.

We will be using Subversion as our hand-in system this semester. Our grading system will checkout your most recent (pre-deadline) commit for grading. Therefore, to hand in your code, all you have to do is commit it to your Subversion repository.

To check out the provided code for `pointers_gone_wild`from the class repository, go to your cs241 directory (the one you checked out for "know your tools") and run:

{% highlight bash %}
svn up
{% endhighlight %}

If you run `ls` you will now see a `pointers_gone_wild` folder, where you can find this assignment! To commit your changes (send them to us) type:

{% highlight bash %}
svn ci -m "mp0 submission"
{% endhighlight %}

Your repository directory can be viewed from a web browser from the following URL: [https://subversion.ews.illinois.edu/svn/fa16-cs241/NETID/pointers_gone_wild](https://subversion.ews.illinois.edu/svn/fa16-cs241/NETID/pointers_gone_wild) where NETID is your University NetID. It is important to check that the files you expect to be graded are present and up to date in your svn copy.
