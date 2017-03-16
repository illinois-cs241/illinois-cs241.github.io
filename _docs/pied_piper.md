---
layout: doc
title: "Pied Piper"
submissions:
- title: Entire Assignment
  due_date: 3/29 @ 11:59pm
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

The UNIX (Forerunner of Linux) philosophy embraces minimalist, modular software development. One common saying is 'Write programs that do one thing and do it well'. Another one is 'Write programs to handle text streams, because that is a universal interface'.

Pipes are one common way of implementing this system, where you can chain together a series of simple 'tools' in order to form larger, more complex processing pipelines. For instance, if you want to kill a process matching a certain name  (Let's pretend `pkill` doesn't exist)-

```console
ps aux | grep <process name> | grep -v grep | awk '{print $2}' | xargs kill
```

ps aux - List the running processes and some information about them. The output might look something like -

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

* grep \<process name\> - Find lines containing the phrase \<process name\>
* grep -v grep - Remove lines containing the word 'grep' (filter out the grep command that we ran, since it might also be part of the results)
* awk '{print $2}' - awk is a text processing language, and in this case, we're asking it to fetch the second column of the results (Corresponding to the PID of the process)
* xargs kill - Reads from STDIN, forms a command consisting of 'kill \<PID\>', and executes it

Voila, the desired process is killed!

## How pipes work

Pipes involve chaining together multiple processes by their standard input/output streams. Thus, the standard output of the first process is 'fed' into the standard input of the second, the standard output of the second is 'fed' into the standard input of the third, and so on. For instance, in the above example -

```console
ps aux | grep <process name> | grep -v grep | awk '{print $2}' | xargs kill
```
The standard output of `ps aux` is fed into the standard input of `grep \<process name\>`, the standard output of the first grep is fed into the standard input of the second grep, and so on.


## The Problem

The problem occurs when some of the commands spuriously fail for whatever reason. This leads to all of the commands that rely on the output from that one to fail. Once again, let's take our pipe example

```console
ps aux | grep <process name> | grep -v grep | awk '{print $2}' | xargs kill
```

Imagine some prankster replaced the usual awk implementation with a misbehaving one that only works normally 50% of the time (the rest of the time, it just exits with a non zero exit code). This might lead to two things -

1. If the upstream process (grep) is still writing to its pipe, it will receive a SIGPIPE signal and most likely crash (since it is attempting to write to a pipe with no readers available)
2. The downstream process (xargs) will not read anything from its STDIN, and might throw an error saying -

```console
kill: not enough arguments
```
With larger and more complex pipelines, you can see how such errors might get aggravating. Your goal is, therefore, to build a 'resilient pipe' that works like a bash pipe, but allows retries if any process in the pipeline exits with a nonzero exit code.

## Your solution

If there is one thing that you know can solve systems programming problems, it is the "try again" method. The new idea is instead of just running the command as so - 

```console
grep piano < inventory.txt | cut -f2 -d'\t' | mail -s "sing me a song" piano_man@gmail.com
```

(If you've forgotten, '<' causes the contents of the file 'inventory.txt' to be used as STDIN for 'grep piano', and '|' (the pipe operator) causes the STDOUT of the program on the left to be 'piped' as the STDIN of the program on the right - but it'll probably be clearer if you try this stuff out yourself!)

You would create an executable that does the same thing - 

```console
./pied_piper -i inventory.txt "grep piano" "cut -f2 -d'\t'" "mail -s \"sing me a song\" piano_man@gmail.com"
```

But the resilience here is that `pied_piper` will check for the inventory file, outputting a helpful message to the user. If the mail application terminates early due to network intolerance, we can now detect that, retry, and potentially get it through. Note that the double quotes are used to create a single command that may contain spaces. That is different from the escaped double quotes, where the command we want to execute contains a double quote. In this lab, the argument parsing is done for you, so don't worry about implementing this, but keep it in mind if you're trying to test commands containing double quotes in the arguments.

The full usage is below

```console
./pied_piper [-i input_file] [-o output_file] "command1 args*" "command2 args*" ...
```

## Implementation

In this lab, the boilerplate work like file handling, argument parsing, the main routine, and so on is handled for you. 

However, being the brains of the operation, you must implement the `pied_piper()` function in `pied_piper.c`, which does the real work - setting up redirection and attempting resilience. Here are some pointers on how to proceed-


1. The `pied_piper()` routine is passed two file descriptors, one for input, one for output (these descriptors could be negative if there are no such files specified, though), along with a `char **` representing the NULL terminated list of executables to run (similar to how argv ends with a NULL)
2. Try `exec`ing all of the processes and setting up all the pipes. This means that the first process should have its stdin redirected to the input file (if exists). If, for any reason, you get a failure with `exec`, `pipe`, or `dup2` you can simply `exit(failure)`, though you won't be explicitly tested on it -- making these calls fail usually mean the entire system is coming down (or, maybe you passed a bad executable to `exec()`, in which case there isn't much a resilient pipe can do for you).
3. Wait on each of the processes and check their return code
4. If **any** process has a non-zero return code then restart the script -- go back to step 2. Try restarting all the processes up a total of two additional times (three runs in total).
5. If you everything goes well one of the times, you are done! Print a success message and exit with success in the pied piper process (Look up the exit codes provided in `pied_piper.h`).
6. If not, print out a summary of commands, their return codes, and anything printed out to standard error **for the last run** (Hint, look in the utils.h file). You don't have to worry about the pipe filling up, the commands we run will have an output of less than the size of the pipe.

## Testing

How does one test with failures, you ask? You could try using a small C program that reads an environment variable that you set (hint : look up the `export` keyword), together with another that might sleep for a while before trying to write to a pipe, to ensure it receives SIGPIPE. Or, you could play with random number generators (Are you feeling (un)lucky?) if you prefer a Russian Roulette like approach.

You have also been provided a `fail_nth` program that fails most of the times, and passes on the nth attempt (the code itself is pretty simple, so take a look to see what's going on there)

## Hints

* You may want to section out your code into the part that tries exec'ing all of the program.
* Our programs **will not** mangle the input file between runs, you can assume that that will not change. But keep in mind, if a run is halfway complete and the output file is partially written before failure that the output file should be cleared before you try again.
* You do not have to worry about side effects, meaning that if a process completes half way and changes some system state you will not be expected to change it back. Though this may cause the process to fail in the future, all you have to do is execute the pipeline again.
