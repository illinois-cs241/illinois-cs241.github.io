---
layout: doc
title: "Utilities Unleashed"
submissions:
- title: Entire Assignment
  due_date: 02/08/16, 11:59 PM
  graded_files:
  - env.c
  - time.c
learning_objectives:
  - Fork, Exec, Wait
  - Environment Variables
  - Writing a C Program
  - Using argv, argc
  - Introduction to core utils
wikibook:
  - "Forking, Part 1: Introduction"
  - "Forking, Part 2: Fork, Exec, Wait"
---

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

Since this lab requires your programs to print messages to stdout and stderr, we have provided you with `format.c` and `format.h`. You should not be printing out to stdout and stderr at all, except for the print feature of `env`; instead, you should be using the provided functions. You can find documentation for each function in `format.h`. This is our way of ensuring that you do not lose points for formatting issues, but it also means that you are responsible for handling any errors mentioned in `format.c` and `format.h`.

There is no provided format function for printing the environment variables. To do so, you should print each one on its own line (e.g. with `printf("%s\n")`).

## time

In this lab, you will be implementing `time`.

```
time – run a program and report how long it took
```

So if a user enters:

```
./time sleep 2
```

then time will run `sleep` with the argument `2` and print how long it took in seconds:

```
2.002345 seconds
```

For more examples, you can play with Linux's builtin `time` command by typing `time YOURCOMMAND` (`time ls -l`, for example) in your terminal. Be sure to add `./` to the beginning (or use the full path to your `time` executable file if you are in another directory), otherwise the builtin `time` will be called.

Note that we only care about [wall-clock time](https://en.wikipedia.org/wiki/Wall-clock_time), and we recommend using [`clock_gettime`](http://linux.die.net/man/3/clock_gettime) with `CLOCK_MONOTONIC`.

Pro tip: 1 second == 1,000,000,000 nanoseconds.

Nota bene:

*   You __may not__ use on the existing `time` program.
*   You must use `fork`, `exec`, and `wait` (no other solutions will be accepted).
*   If the child process does not terminate successfully (where its exit status is non-zero), you should exit with status 1 _without_ printing the time.
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

```
env – run a program in a modified environment
```

When run without arguments, it prints a list of all the current environment variables.

When run with arguments, it will be given at least two, and will be called like so:

```
./env <var-list> <command-name>
```

*   `<var-list>` is a comma-separated list of changes that are to be made to environment variables, and `<command-name>` is the name of a command that is to be run after making those changes.
*   Any additional arguments are to be passed as arguments to `<command-name>`.
*   Each of the environment variable changes in `<var-list>` is of the form `<destvar>=<value>`.
*   `<destvar>` is the name of the environment variable that is to be changed and `<value>` is the new value.
*   `<value>` may contain references to environment variables in the form `%<srcvar>`.
*   Each reference to `<srcvar>` should be replaced with the value of `<srcvar>`.
*   The names of the variables `<destvar>` and `<srcvar>` will contain only letters, numbers, or underscore characters.
*   For each environment variable change in `<var-list>`, your program will assign `<value>` to `<destvar>` in the current environment so when `<command-name>` is executed, it will inherit the new value of the `<destvar>` variable.
*   Any invalid input passed to `env` should result in the above usage being printed.

For example, if the user enters:

```
./env
```

then you should print out all the environment variables and their values, like the builtin Linux `env` command.

If the user enters:

```
./env TZ=MST7MDT date
```

then it changes the `TZ` environment variable while running the `date` command.

And, if the user enters:

```
./env PATH=%HOME/bin:%PATH,IDIR=/%HOME/include,LIBDIR=/%HOME/lib make -j4
```

then it changes the `PATH`, `IDIR`, and `LIBDIR` variables while running `make` with the `j4` option.

`env` updates the environment variables sequentially. For example, `./env PATH=%HOME,IDIR=%PATH` will update `$PATH` before we start processing `$IDIR`, so `$IDIR` would be equal to `$HOME`.

Again like `time`, you can play with Linux's builtin `env` command by typing `env <var-list> <command-name>` (`env MYVAR=CS241 printenv`, for example) in your terminal. Again, remember to add `./` to the beginning (or the full path to your `env` executable file if you are in another directory), otherwise the builtin `env` will be called.

In addition, keep in mind that the builtin `env` uses `$` instead of `%` to denote environment variables, and they are separated by spaces in the var list instead of commas.

In practice, it can be very useful to change some environment variables when running certain command.

For example, you may notice people write `#!/usr/bin/env python` on the first line of their Python script. This line ensures the Python interpreter used is the first one on user's environment `$PATH`. However, users may want to use another version of Python, and it may not be the first one on `$PATH`. Say, your desired location is `/usr/local/bin` for instance.

One way to solve this is by exporting `$PATH` to the correct position in your terminal, however, this may mess up other commands or executable under the same session.

An alternative and better way is to use our `env`, and enter:

```
./env PATH=/usr/local/bin ./XXX.py
```

then it runs the script with the desired Python interpreter.

Nota bene:

*   You __may not__ use the existing `env` program.
*   You __may not__ replace `%` with `$` or use `wordexp(3)`.
*   You __may not__ use `execvpe`, `execve`, or `execle`.
*   All changes in enviroment variables and execution must happen only in the child process.
*   You must use `fork`/`exec`/`wait`.
*   If a variable doesn't exist, interpret its value as a zero-length string.
*   __Do not fork bomb the autograder!__ You will fail if you forkbomb the AG.

### Useful Resources

*   [Environment variables](http://cs-education.github.io/sys/#chapter/2/section/1/activity/0)
*   [Environment variable functions](http://www.gnu.org/software/libc/manual/html_node/Environment-Variables.html)
*   [string.h](http://man7.org/linux/man-pages/man3/string.3.html)
*   [Split a string by a delimiter](https://www.quora.com/How-do-you-write-a-C-program-to-split-a-string-by-a-delimiter)
