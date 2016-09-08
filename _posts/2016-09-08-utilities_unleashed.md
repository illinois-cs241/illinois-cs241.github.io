---
layout: doc
title: "Utilities Unleashed"
permalink: utilities_unleashed
dueDates: "9/14/2016, 11:59 PM"
---

## Demo

Your section leaders will demo a working implementation of all the C utilities.

## Learning Objectives

*   C Utilities
*   Fork, Exec, Wait
*   Environmental Variables

## Overview

In this lab, you will be implementing the following C utilities:

*   [time](#time)
*   [env](#env)

Notes

*   Do not worry about flags or features that we do not mention.
*   Do not print any of your debug information out for your final submission.
*   All printing (except evn vars) should be handled with format.h.
*   A common issue is double print outs.  If this happens to you, try flushing stdout before you fork/exec.  If this solves your issue, ask "why?"

## format.c and .h

Since this lab requires your programs to print error messages to stdout and stderr, we have provided you with format.c and format.h. You should not be printing out to stdout and stderr at all (expect for the print feature of env); instead, you should be using the functions provided in format.c and .h. In format.h you can find documentation of what each function does and you should use them whenever approriate. This is our way of ensuring that you do not lose points for formatting issues, but it also means that you are responsible for handling any and all errors mentioned in format.c and format.h.

There is no privided format function for printing the envrionment variables.  To properly print the environemnt variables, print each variable on its own line (e.g. printf("%s\n")).

## Reference Executables

For this lab, we have provided the following reference executables:

*   time_reference
*   env_reference

These are correct implementations of the programs you are being asked to make. How your programs should behave in edge cases are answerable by using the reference executables. For example, if you are wondering "What should time do if not given the correct number of arguments?" then just try it out:

{% highlight text %}
./time_reference
{% endhighlight %}

and you should see the following output:

{% highlight text %}
./time <command> [args]
{% endhighlight %}

## Setup

{% highlight bash %}
cd ~/cs241
svn up
cd utilities_unleashed
{% endhighlight %}

## time

In this lab, you will be implementing 'time'.

{% highlight text %}
time – run a program and reports how long it took.
{% endhighlight %}

So if a user enters

{% highlight bash %}
./time sleep 2
{% endhighlight %}

then time will run 'sleep' with the argument '2' and record how long it took in seconds.

{% highlight bash %}
2.002345 seconds
{% endhighlight %}

Note that we only care about wall clock time and we recommend [clock_gettime](http://linux.die.net/man/3/clock_gettime) and CLOCK_MONOTONIC.  
Pro Tip: 1 second == 1,000,000,000 nanoseconds.  
Nota Bene:

*   You MAY NOT call on the existing time program.
*   You must use fork, exec, wait (no other solutions will be accepted).
*   You need to account for programs that do not terminate successfully (the program's exit code is non-zero).
*   We will only run your time with one program.
*   The commands we will run can take any number of arguments.
*   Do your time computations with double-precision floating pointer numbers (double) rather that single-precision (float).
*   We have provided functions in format.h that we expect you to use wherever appropriate.


### Useful Resources

*   [Program arguments argc argv](http://cs-education.github.io/sys/#chapter/2/section/0/activity/0)
*   [Fork/Exec/Wait](https://github.com/angrave/SystemProgramming/wiki/Forking%2C-Part-2%3A-Fork%2C-Exec%2C-Wait)
*   [Fork and Waitpid](http://cs-education.github.io/sys/#chapter/5/section/1/activity/0)

## env

In this lab, you will be implementing 'env'.

{% highlight text %}
env – run a program in a modified environment When run without arguments, it prints a list of all the current environment variables. When run with arguments, it will be given at least two arguments:
{% endhighlight %}

This means a user will call your program like so:

{% highlight bash %}
./env <var-list> <command-name>
{% endhighlight %}

*   `<var-list>` is a comma-separated list of changes that are to be made to environment variables, and `<command-name>` is the name of a command that is to be run after making those changes.
*   Any additional arguments are to passed as arguments to `<command-name>`.
*   Each of the environment variable changes in `<var-list>` are in the form `<destvar>=<value>`.
*   `<destvar>` is the name of the environment variable that is to be changed and `<value>` is the new value.
*   `<value>` may contain references to environment variables in the form `%<srcvar>`.
*   Each reference to `<srcvar>` should be replaced with the value of `<srcvar>`.
*   The names of the variables `<destvar>` and `<srcvar>` will contain only letters, numbers, or underscore characters.
*   For each environment variable change in `<var-list>`, your program will assign `<value>` to `<destvar>` in the current environment so when `<command-name>` is executed, it will inherit the new value of the `<destvar>` variable.

For example if the user enters

{% highlight bash %}
./env
{% endhighlight %}

then you should print out all the environment variables. Try

{% highlight bash %}
./env_reference
{% endhighlight %}

in your terminal to see it in action.

If the user enters

{% highlight bash %}
./env TZ=MST7MDT date
{% endhighlight %}

then it changes the TZ environment variable while running the date command.

And if the user enters

{% highlight bash %}
./env PATH=%HOME/bin:%PATH,IDIR=/%HOME/include,LIBDIR=/%HOME/lib make -j4
{% endhighlight %}

then it changes the PATH, IDIR, and LIBDIR variables while running make with the j4 option.

Nota Bene:

*   You MAY NOT use the existing env program.
*   You MAY NOT replace '%' with '$' or use wordexp(3)
*   All changes in enviroment variables and execution must happen only in the child process.
*   You MUST use fork/exec/wait.
*   If a variable doesn't exist, interpret its value as a zero-length string.
*   DO NOT FORK BOMB THE AUTOGRADER - You will fail if you fork bomb the AG.

### Useful Resources

*   [Envionrment Variables](http://cs-education.github.io/sys/#chapter/2/section/1/activity/0)
*   [Enviornment Variable Functions](http://www.gnu.org/software/libc/manual/html_node/Environment-Variables.html)
*   [String.h](http://man7.org/linux/man-pages/man3/string.3.html)
*   [Split A String By A Delimiter](https://www.quora.com/How-do-you-write-a-C-program-to-split-a-string-by-a-delimiter)
