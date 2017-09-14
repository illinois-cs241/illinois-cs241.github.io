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

## WARNING!

If you fork bomb on *any* autograder run, you will receive a zero on this assignment.

To prevent you from fork bombing your own VM, we recommend looking into [`ulimit`](https://ss64.com/bash/ulimit.html). This will allow you to set a limit for how many times you can fork.

## format.c and .h

Since this lab requires your programs to print messages to `stdout` and `stderr`, we have provided you with `format.c` and `format.h`. You should not be printing out to stdout and stderr at all. Instead, you should be using the provided functions. You can find documentation for each function in `format.h`. Please *read* the documentation in `format.h` _multiple_ times to determine when each function should be used. This is our way of ensuring that you do not lose points for formatting issues, but it also means that you are responsible for handling any errors mentioned in `format.c` and `format.h`.

It is common for students to fail certain test cases on this assignent with seemingly functional code, it is almost always because of improper usage of `format.h`.

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

*   You __may not__ use the existing `time` program.
*   You must use `fork`, `exec`, and `wait` (no other solutions will be accepted).
*   If the child process does not terminate successfully (where its exit status is non-zero), you should exit with status 1 _without_ printing the time.
*   We will only run `time` with one program.
*   The commands we will run can take any number of arguments.
*   Do your time computations with double-precision floating pointer numbers (`double`) rather that single-precision (`float`).
*   We have provided functions in `format.h` that we expect you to use wherever appropriate.


### Useful Resources

*   [Program arguments: argc & argv](http://cs-education.github.io/sys/#chapter/2/section/0/activity/0)
*   [fork, exec, wait](https://github.com/angrave/SystemProgramming/wiki/Forking%2C-Part-2%3A-Fork%2C-Exec%2C-Wait)
*   [fork and waitpid](http://cs-education.github.io/sys/#chapter/5/section/1/activity/0)

## env

In this lab, you will be implementing `env`.

```
env – run a program in modified environments
```

Usage:

```
./env [-n #] [key=val1,val2,...] [key2=val1,val2,...] ... -- cmd [args] ..
```

* `-n N` is an _optional_ flag that indicates how many values there are for each variable. `N` must be a number more than zero, and is only required if more than 1.
* Each variable is in the form of `NAME=v1,v2,v3...vN`, separated by spaces.
* For each variable, there can either be *one* or `N` values. (There can only be `N` _if and only if_ the `-n` flag is used.)
* Values may contain references to environment variables in the form `%NAME`.
* Each reference should be replaced with its value.
* The names of variables (both in `key` and in `value`) only contain letters, numbers, or underscore characters.
* For each environment variable `key`/`value` pair, `env` will assign `value` to `key` in the current environment. If `N` is more than 1, you must iterate through all pairs of values.
* Each execution must be done with `fork`, `exec,` and `wait`.
* The executions must be done sequentially, *not* in parallel.
* The last variable/value(s) pairing is followed by a `--`.
* *Everything* following the `--` is the command and any arguments that will be executed by env.
* So, if `A=1,2,3` and `B=4,5,6` and we want to exec `cmd`, `cmd` will be executed *three* times. Once with `A = 1, B = 4`, then `A = 2, B = 5`, and finally `A = 3, B = 6`.
* If any `key` has *one* value instead of `N`, you should set that `key` to that `value` `N` times.
* Invalid input should result in the usage being printed. It is your job to enforce correct usage! You shouldn't ignore bad usage.

This is the canonical example and a practical use case:

```
$ ./env -n 4 TZ=EST5EDT,CST6CDT,MST7MDT,PST8PDT -- date
Sat Sep  9 19:19:42 EDT 2017
Sat Sep  9 18:19:42 CDT 2017
Sat Sep  9 17:19:42 MDT 2017
Sat Sep  9 16:19:42 PDT 2017
$
```

It runs `date` *four* times, once for each time zone, and shows us the result. 

(Note: the output is in order of the variables, and is done sequentially.)

Example of using references to other variables:

```
$ ./env -n 4 TEMP=EST5EDT,CST6CDT,MST7MDT,PST8PDT TZ=%TEMP -- date
Sat Sep  9 19:19:42 EDT 2017
Sat Sep  9 18:19:42 CDT 2017
Sat Sep  9 17:19:42 MDT 2017
Sat Sep  9 16:19:42 PDT 2017
$
```

This has the exact same behavior as before, because `TEMP` is first set to `EST5EDT`, and then when `TZ` is set to `%TEMP`, the value of `EST5EDT` is retrieved and then `TZ` is set to that.

Notice that the variables are set sequentially, or else it wouldn't work.

Again like `time`, you can play with Linux's builtin `env` command by typing `env <var-list> <command-name>` (`env MYVAR=CS241 printenv`, for example) in your terminal. Again, remember to add `./` to the beginning (or the full path to your `env` executable file if you are in another directory), otherwise the builtin `env` will be called. Keep in mind that the builtin `env` *does not match* our specifications.

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

*   You __may not__ use the existing `env` program. (Our specification is different than the existing `env` program.)
*   You __may not__ replace `%` with `$` or use `wordexp(3)`.
*   You __may not__ use `execvpe`, `execve`, or `execle`.
*   All changes in environment variables and execution must happen only in the child process.
*   You must use `fork`/`exec`/`wait`.
*   If a variable doesn't exist, interpret its value as a zero-length string.
*   __Do not fork bomb the autograder!__ You will fail if you forkbomb the AG. (See the [warning](#warning).)

### Useful Resources

*   [Environment variables](http://cs-education.github.io/sys/#chapter/2/section/1/activity/0)
*   [Environment variable functions](http://www.gnu.org/software/libc/manual/html_node/Environment-Variables.html)
*   [string.h](http://man7.org/linux/man-pages/man3/string.3.html)
*   [Split a string by a delimiter](https://www.quora.com/How-do-you-write-a-C-program-to-split-a-string-by-a-delimiter)
