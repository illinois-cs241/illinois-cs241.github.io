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

*   [`time`](#time)
*   [`env`](#env)

Notes:

*   Do not worry about flags or features that we do not mention.
*   Do not print any of your debug information out for your final submission.
*   All printing (except env vars) should be handled with `format.h`.
*   A common issue is double printouts. If this happens to you, try flushing stdout before you fork/exec. If this solves your issue, ask yourself why.

## format.c and .h

Since this lab requires your programs to print messages to stdout and stderr, we have provided you with `format.c` and `format.h`. You should not be printing out to stdout and stderr at all, expect for the print feature of `env`; instead, you should be using the provided functions. You can find documentation for each function in `format.h`. This is our way of ensuring that you do not lose points for formatting issues, but it also means that you are responsible for handling any errors mentioned in `format.c` and `format.h`.

There is no provided format function for printing the envrionment variables. To do so, you should print each one on its own line (e.g. with `printf("%s\n")`).

## Reference Executables

For this lab, we have provided the following reference executables:

*   `time_reference`
*   `env_reference`

These are correct implementations of the programs you are being asked to write. You can use these to determine how your programs should behave in edge cases. For example, if you are wondering what `time` should do if not given the correct number of arguments, then just try it out:

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

In this lab, you will be implementing `time`.

{% highlight text %}
time – run a program and report how long it took
{% endhighlight %}

So if a user enters:

{% highlight bash %}
./time sleep 2
{% endhighlight %}

then time will run `sleep` with the argument `2` and record how long it took in seconds:

{% highlight bash %}
2.002345 seconds
{% endhighlight %}

Note that we only care about [wall-clock time](https://en.wikipedia.org/wiki/Wall-clock_time), and we recommend using [`clock_gettime`](http://linux.die.net/man/3/clock_gettime) with `CLOCK_MONOTONIC`.

Pro tip: 1 second == 1,000,000,000 nanoseconds.

Nota bene:

*   You __may not__ use on the existing `time` program.
*   You must use `fork`, `exec`, and `wait` (no other solutions will be accepted).
*   If the program does not terminate successfully (where its exit status is non-zero), you should exit with status 1 and not print the time.
*   We will only run `time` with one program.
*   The commands we will run can take any number of arguments.
*   Do your time computations with double-precision floating pointer numbers (`double`) rather that single-precision (`float`).
*   We have provided functions in `format.h` that we expect you to use wherever appropriate.


### Useful Resources

*   [Program arguments argc argv](http://cs-education.github.io/sys/#chapter/2/section/0/activity/0)
*   [fork, exec, wait](https://github.com/angrave/SystemProgramming/wiki/Forking%2C-Part-2%3A-Fork%2C-Exec%2C-Wait)
*   [fork and waitpid](http://cs-education.github.io/sys/#chapter/5/section/1/activity/0)

## env

In this lab, you will be implementing `env`.

{% highlight text %}
env – run a program in a modified environment
{% endhighlight %}

When run without arguments, it prints a list of all the current environment variables.

When run with arguments, it will be given at least two, and will be called like so:

{% highlight bash %}
./env <var-list> <command-name>
{% endhighlight %}

*   `<var-list>` is a comma-separated list of changes that are to be made to environment variables, and `<command-name>` is the name of a command that is to be run after making those changes.
*   Any additional arguments are to be passed as arguments to `<command-name>`.
*   Each of the environment variable changes in `<var-list>` is of the form `<destvar>=<value>`.
*   `<destvar>` is the name of the environment variable that is to be changed and `<value>` is the new value.
*   `<value>` may contain references to environment variables in the form `%<srcvar>`.
*   Each reference to `<srcvar>` should be replaced with the value of `<srcvar>`.
*   The names of the variables `<destvar>` and `<srcvar>` will contain only letters, numbers, or underscore characters.
*   For each environment variable change in `<var-list>`, your program will assign `<value>` to `<destvar>` in the current environment so when `<command-name>` is executed, it will inherit the new value of the `<destvar>` variable.

For example, if the user enters:

{% highlight bash %}
./env
{% endhighlight %}

then you should print out all the environment variables. Try `./env_reference` in your terminal to see it in action.

If the user enters:

{% highlight bash %}
./env TZ=MST7MDT date
{% endhighlight %}

then it changes the `TZ` environment variable while running the `date` command.

And, if the user enters:

{% highlight bash %}
./env PATH=%HOME/bin:%PATH,IDIR=/%HOME/include,LIBDIR=/%HOME/lib make -j4
{% endhighlight %}

then it changes the `PATH`, `IDIR`, and `LIBDIR` variables while running `make` with the `j4` option.

Nota bene:

*   You __may not__ use the existing env program.
*   You __may not__ replace `%` with `$` or use `wordexp(3)`.
*   All changes in enviroment variables and execution must happen only in the child process.
*   You must use `fork`/`exec`/`wait`.
*   If a variable doesn't exist, interpret its value as a zero-length string.
*   __Do not fork bomb the autograder!__ You will fail if you forkbomb the AG.

### Useful Resources

*   [Envionrment variables](http://cs-education.github.io/sys/#chapter/2/section/1/activity/0)
*   [Enviornment variable functions](http://www.gnu.org/software/libc/manual/html_node/Environment-Variables.html)
*   [string.h](http://man7.org/linux/man-pages/man3/string.3.html)
*   [Split a string by a delimiter](https://www.quora.com/How-do-you-write-a-C-program-to-split-a-string-by-a-delimiter)
