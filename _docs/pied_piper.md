---
layout: doc
title: "Pied Piper"
submissions:
- title: Entire Assignment
  due_date: 3/29/17 at 11:59pm
  graded_files:
  - pied_piper.c
learning_objectives:
  - Using Pipes
  - System Call Resillence
wikibook:
  - "Pipes, Part 1: Introduction to pipes"
  - "Pipes, Part 2: Pipe programming secrets"
---

## UNIX Pipes

The UNIX philosophy embraces minimalist, modular software development. One common saying is, "write programs that do one thing and do it well". Another one is, "write programs to handle text streams, because that is a universal interface".

Pipes are one common way of implementing this system, where you can chain together a series of simple "tools" in order to form larger, more complex processing pipelines. For instance, if you want to kill a process matching a certain name (let's pretend `pkill` doesn't exist):

```console
ps aux | grep <process name> | grep -v grep | awk '{print $2}' | xargs kill
```

* `ps aux`: List the running processes and some information about them. The output might look something like:

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

* `grep <process name>`: Find lines containing the phrase `<process name>`.
* `grep -v grep`: Remove lines containing the word "grep" (filter out the `grep` command that we ran, since it might also be part of the results).
* `awk '{print $2}'`: awk is a text processing language, and in this case, we're asking it to fetch the second column of the results (corresponding to the PID of the process).
* `xargs kill`: Reads from stdin, forms a command consisting of `kill <PID>`, and executes it.

Voilà, the desired process is killed!

## How Pipes Work

Pipes involve chaining together multiple processes by their standard input/output streams. Thus, the standard output of the first process is fed into the standard input of the second, the standard output of the second is fed into the standard input of the third, and so on. For instance, in the above example:

```console
ps aux | grep <process name> | grep -v grep | awk '{print $2}' | xargs kill
```
The standard output of `ps aux` is fed into the standard input of `grep <process name>`, the standard output of the first `grep` is fed into the standard input of the second `grep`, and so on.

## The Problem

The problem occurs when some of the commands spuriously fail for some reason. This leads to all of the commands that rely on the output from that one to fail. Once again, let's take our pipe example:

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

As a reminder, `<` causes the contents of the file `inventory.txt` to be used as stdin for `grep piano`, and `|` (the pipe operator) causes the stdout of the program on the left to be piped to the stdin of the program on the right—but it'll probably be clearer if you try this out yourself!

We're going to create an executable that does the same thing:

```console
./pied_piper -i inventory.txt "grep piano" "cut -f2 -d'\t'" "mail -s \"sing me a song\" piano_man@gmail.com"
```

If there is one thing that you know can solve problems in system programming, it is the "try again" method. `pied_piper` will check for the inventory file, outputting a helpful message to the user if it doesn't exist. If the mail application terminates early due to network errors, we can now detect that, retry, and potentially get it through.

Note that the double quotes are used to create a single argument that may contain spaces. That is different from the escaped double quotes, where the command we want to execute contains a double quote. In this lab, the argument parsing is done for you, so don't worry about implementing this, but keep it in mind if you're trying to test commands containing double quotes in the arguments.

The full usage is:

```console
./pied_piper [-i input_file] [-o output_file] "command1 [args ...]" "command2 [args ...]" ...
```

## Implementation

In this lab, the boilerplate work like file handling, argument parsing, and the main routine is handled for you. 

You must implement the `pied_piper()` function in `pied_piper.c`, which does the real work—setting up redirection, and attempting resilience. Here are some pointers on how to proceed:

1. The `pied_piper()` routine is passed two file descriptors, one for input, one for output, along with a `char **` representing the NULL-terminated list of executables to run (similar to how `argv` ends with a NULL). If either the input or output file descriptor is negative, you should use stdin or stdout respectively (like normal).
2. Try `exec`ing all of the processes and setting up all the pipes. This means that the first process should have its stdin redirected from the input file (if exists). If you get a failure with `exec`, `pipe`, or `dup2` for any reason, you can simply exit with a nonzero code, though you won't be explicitly tested on it; these calls failing usually means the entire system is coming down (or maybe you passed a bad executable to `exec()`, in which case there isn't much a resilient pipe can do for you).
3. Wait on each of the processes and check their return code.
4. If *any* process has a non-zero return code, then restart the script (go back to step 2). Try restarting all the processes up a total of two additional times (three runs in total).
5. If you everything goes well one of the times, you are done! Exit with status 0 for success in the pied piper process.
6. If not, print out a summary of commands, their return codes, and anything printed out to standard error *for the last run* (hint: look in the `utils.h` file). You should then exit with status `EXIT_OUT_OF_RETRIES` (see `pied_piper.h`).
* Note: You don't have to worry about the pipe filling up; the commands we run will have an output of less than the size of the pipe.

## Testing

How does one test with failures, you ask? You could try using a small C program that reads an environment variable that you set (hint: look up the `export` keyword), together with another that might sleep for a while before trying to write to a pipe, to ensure it receives SIGPIPE. Or, you could play with random number generators (are you feeling (un)lucky?) if you prefer a Russian roulette-like approach.

You have also been provided with a `fail_nth` program that fails most of the time, and passes on the `n`th attempt. The code itself is pretty simple, so take a look to see what's going on there.

## Hints

* You may want to section out your code into the part that tries exec'ing all of the programs.
* Our programs **will not** mangle the input file between runs; you can assume that it will not change. But keep in mind that if a run is halfway complete, and the output file has been partially written to before failure, that the output file should be cleared before you try again.
* You do not have to worry about side effects, meaning that if a process completes halfway and changes some system state you will not be expected to change it back. Though this may cause the process to fail in the future, all you have to do is execute the pipeline again.
