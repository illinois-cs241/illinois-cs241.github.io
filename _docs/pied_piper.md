---
layout: doc
title: "Pied Piper"
submissions:
- title: Entire Assignment
  due_date: 11/13/17 at 11:59pm
  graded_files:
  - pied_piper.c
learning_objectives:
  - Using Pipes
  - System Call Resilience
wikibook:
  - "Pipes, Part 1: Introduction to pipes"
  - "Pipes, Part 2: Pipe programming secrets"
---

## WARNING

:fork_and_knife: :bomb: :bangbang:

If your code fork-bombs on _any_ autograde, then you will automatically fail this MP. Please make sure that your `fork` code is correct before committing your code for the nightly autograder.

To prevent you from fork bombing your own VM, we recommend looking into [`ulimit`](https://ss64.com/bash/ulimit.html). This will allow you to set a limit for how many times you can fork.

Since a learning objective of this assignment is to learn how to use pipes, if you use `popen`, you will automatically fail this MP.

## UNIX Pipes

The [UNIX philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) embraces minimalist, modular software development. One common saying is, "write programs that do one thing and do it well". Another one is, "write programs to handle text streams, because that is a universal interface".

In Unix-like operating systems, pipes are a standard way of gluing together small "tools" in accordance with this philosophy. In other word, pipes chain together multiple smaller programs by their standard streams (`stdin` & `stout`) to form a larger, more complex processing pipeline. For instance, if you want to kill a process matching a specific name (let's pretend `pkill` doesn't exist), you can do this:

```console
ps aux | grep <process name> | grep -v grep | awk '{print $2}' | xargs kill
```

where the following programs are piped together:

* `ps aux`: Print a list of running processes along with some informations to `stdout`. The output might look something like this:

```console
$ ps aux
 username     1925  0.0  0.1 129328  6112 ?        S    11:55   0:06 tint2
 username     1931  0.0  0.3 154992 12108 ?        S    11:55   0:00 volumeicon
 username     1933  0.1  0.2 134716  9460 ?        S    11:55   0:24 parcellite
 username     1940  0.0  0.0  30416  3008 ?        S    11:55   0:10 xcompmgr -cC -t-5 -l-5 -r4.2 -o.55 -D6
 username     1941  0.0  0.2 160336  8928 ?        Ss   11:55   0:00 xfce4-power-manager
 username     1943  0.0  0.0  32792  1964 ?        S    11:55   0:00 /usr/lib/xfconf/xfconfd
 username     1945  0.0  0.0  17584  1292 ?        S    11:55   0:00 /usr/lib/gamin/gam_server
 username     1946  0.0  0.5 203016 19552 ?        S    11:55   0:00 python /usr/bin/system-config-printer-applet
 username     1947  0.0  0.3 171840 12872 ?        S    11:55   0:00 nm-applet --sm-disable
 username     1948  0.2  0.0 276000  3564 ?        Sl   11:55   0:38 conky -q
```

* `grep <process name>`: Read from `stdin`, find the lines containing the phrase `<process name>`, and print to `stdout`.

* `grep -v grep`: Read from `stdin`, remove the lines containing the word "grep" (since "grep \<process name\>" is also a running process), and print to `stdout`.

* `awk '{print $2}'`: `awk` is a text processing scripting language, and here we're using `awk` to fetch the second column of the input (the pid number in this case), and print to `stdout`.

* `xargs kill`: Read from `stdin`, form a command consisting of `kill <PID>`, and executes it.

Voilà, the desired process is killed by the pipeline!

## How Pipes Work

Pipes work simply by feeding the standard output of the first process into the standard input of the second, then feeding the standard output of the second into the standard input of the third, and so on. For instance, in the above example:

```console
ps aux | grep <process name> | grep -v grep | awk '{print $2}' | xargs kill
```
The standard output of `ps aux` is fed into the standard input of `grep <process name>`, whose standard output is fed into the standard input of `grep -v grep`, and so on.

## The Problem

Problem occurs when some of the commands spuriously fail for some reason. This causes all other commands that rely on the output of the failed command to also fail. Once again, let's take our pipe example:

```console
ps aux | grep <process name> | grep -v grep | awk '{print $2}' | xargs kill
```

Imagine some prankster replaced the usual `awk` implementation with a misbehaving one that only works normally 50% of the time (the rest of the time, it just exits with a nonzero exit code). This might lead to two things:

1. If the upstream process (`grep`) is still writing to its pipe, it will receive a SIGPIPE signal and most likely crash, since it is attempting to write to a pipe with no readers available.
2. The downstream process (`xargs`) will not read anything from its stdin, and might throw an error like:

```console
kill: not enough arguments
```
With larger and more complex pipelines, you can see how such errors might get aggravating. Your goal is, therefore, to build a "resilient pipe" that works like a bash pipe, but allows retries if any process in the pipeline exits with a nonzero exit code.

## Your Solution

Say we have a typical pipe command:

```console
grep piano < inventory.txt | cut -f2 -d'\t' | mail -s "sing me a song" piano_man@gmail.com
```

*As a reminder, `<` indicates that the file `inventory.txt` will be treated as the `stdin` for `grep piano`, and `|` (the pipe operator) pipes the stdout of the program on its left to the stdin of the program on its right. Go ahead and try it out yourself! See how the operator works.*

We're going to create an executable that does almost the same thing:

```console
./pied_piper -i inventory.txt "grep piano" "cut -f2 -d'\t'" "mail -s \"sing me a song\" piano_man@gmail.com"
```

the only difference being that if one command fails, it will try again. 

So, in the above example, `pied_piper` will first check if the input file, `inventory.txt`, exists, then exec all three commands in double quotes with their standard streams chained together. And if one command fails, say the `mail` program terminates early due to a network error, `pied_piper` will try to execute all the commands again.

Note that double quotes are used to create a single argument which may contain many spaces. So, in the above case, `argv[3]` in the main function would be the string `grep piano`. Note also that the arguments may contain escaped double quotes, which do not affect the scope of the arguments.

In this MP, the argument parsing is done for you, so don't worry about implementing this, but keep it in mind when you are testing commands with double quotes in them.

If you're interested in how the parser works, it uses the `getopt` function to get the arguments specified by the flags `-i` and `-o`, then it uses `optind` to find the next argument, which is our first command.


The full usage is:

```console
./pied_piper [-i input_file] [-o output_file] "command1 [args ...]" "command2 [args ...]" ...
```

## Implementation

In this MP, the boilerplate functionalities like file handling, argument parsing, and the main routine are handled for you. Your job is to implement the `pied_piper()` function in `pied_piper.c`, which does the real work—setting up redirection, and attempting resilience.

Here are some pointers on how to proceed:

1. The `pied_piper()` function has three arguments: 
	- `input_fd`: the file descriptor for input file.
	- `output_fd`: the file descriptor for output file.
	- `executables`: a null terminated `char **` (similar to how `argv` ends with a NULL), containing all the commands to run.

	**If either the input or output file descriptor is negative, you should use stdin or stdout respectively (like normal).**
2. Try executing all the commands and set up all the pipes.
	- The stdin of the first program should be redirected from the input file (if exits), and the stdout of the last program should be redirected to the output file (if exists).
	- Pipe the stdin and stdout of each program so they communicate with each other correctly.
	- You can use the `exec_command()` function in `util.h`, which is a wrapper for `exec`.
	- If you get a failure with `exec`, `pipe`, or `dup2` for any reason, you can simply exit with a nonzero code, though you won't be explicitly tested on it; these calls failing usually means the entire system is coming down (or maybe you passed a bad executable to `exec()`, in which case there isn't much a resilient pipe can do for you).
3. Wait on all of the processes and check their return codes.
4. If *any* process has a non-zero return code, then restart the script (go back to step 2). Try restarting all the processes up a total of **two additional times** (three runs in total).
5. If everything goes well once, you are done! Exit with status 0 for success in the pied piper process.
6. If at least one process fails on the final run, print out a summary of commands, including their return codes and anything printed out to standard error *for the last run* (hint: look in the `utils.h` file). You should print out the info for every command, even the ones that succeeded. You should then exit with status `EXIT_OUT_OF_RETRIES` (see `pied_piper.h`).

* Note: You don't have to worry about the pipe filling up; the commands we run will have an output of less than the size of the pipe.

## Testing

How does one test with failures, you ask? You could try using a small C program that reads an environment variable that you set (hint: look up the `export` keyword), together with another that might sleep for a while before trying to write to a pipe, to ensure it receives SIGPIPE. Or, you could play with random number generators (are you feeling (un)lucky?), if you prefer a Russian roulette-like approach.

You have also been provided with a `fail_nth` program that fails most of the time, and passes on the `n`th attempt. The code itself is pretty simple, so take a look to see what's going on there.

## Hints

* You may want to section out your code into the part that tries exec'ing all of the programs.
* Our programs **will not** mangle the input file between runs; you can assume that it will not change. But keep in mind that if a run is halfway complete, and the output file has been partially written to before failure, that the output file should be cleared before you try again.
* You do not have to worry about side effects, meaning that if a process completes halfway and changes some system state you will not be expected to change it back. Though this may cause the process to fail in the future, all you have to do is execute the pipeline again.

## QuizIz Form

Please submit the form [here!](https://docs.google.com/forms/d/1TXFUVxKGW2p_TsmYDAMmKqym0R5LX1YoeU/edit)
