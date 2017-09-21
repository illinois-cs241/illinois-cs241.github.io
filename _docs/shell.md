---
layout: doc
title: "Shell"
submissions:
- title: Entire Assignment
  due_date: 9/25/2017 11:59pm
  graded_files:
  - shell.c
learning_objectives:
  - Processes
  - Fork, Exec, Wait
  - Basic Signals
  - Learning How a Shell Works
wikibook:
  - "Forking, Part 1: Introduction"
  - "Forking, Part 2: Fork, Exec, Wait"
  - "Process Control, Part 1: Wait macros, using signals"
---

## WARNING

:fork_and_knife: :bomb: :bangbang:

If your code fork-bombs on _any_ autograde, then you will automatically fail this MP. Please make sure that your `fork` code is correct before committing your code for the nightly autograder.

To prevent you from fork bombing your own VM, we recommend looking into [`ulimit`](https://ss64.com/bash/ulimit.html). This will allow you to set a limit for how many times you can fork.

Since a learning objective of this assignment is to use the fork-exec-wait pattern, if you use `system`, you will automatically fail this MP.

## Backstory

Well, we'll keep it short – you got fired. Your boss brought you in for a code review and was more than disappointed. Apparently, she wanted a text editor like this [one](https://www.sublimetext.com): we didn't get the memo. Now it's time to prove your worth. Your boss wants something fully functional and we've got a great idea. You're going to drop a :fire: :fire: shell on her to get rehired.

The basic function of a shell is to accept commands as inputs and execute the corresponding programs in response. You will be provided the `vector` and `format.c` libraries for your use. Hopefully, this will make things right and you can resume your work at *insert hot tech company here*. Feel free to refer to the Unix shell as a rough reference.

## format.h

Since this MP **requires** your programs to print a variety of things like error messages, we have provided you with our own highly customized formatting library. You should not be printing out to stdout and stderr at all; instead, all output and errors should be printed using the functions provided in `format.c` and `format.h`. In `format.h` you can find documentation about what each function does, and you should use them whenever appropriate. This is our way of ensuring that you do not lose points for formatting issues, but it also means that you are responsible for handling any and all errors mentioned in `format.c` and `format.h`.

Note: don't worry if you don't use some of the functions that are found in `format.c/h`.

## Overview

The shell is responsible for providing a command line for users to execute programs or scripts. You should be very familiar with `bash` by now, which will be the basis for your own shell.

## Starting Your Shell

The shell should run in a loop like this executing multiple commands:

* Print a command prompt
* Read the command from standard input
* Print the PID of the process executing the command (with the exception of built-in commands), and run the command

The shell must support the following two optional arguments:

### History

`-h` takes the filename of the history file. The shell should load in the history file as its history. Upon exit, the exact same history file should be updated, even if the shell is in a different working directory than where it started.

```
./shell -h <filename>
```

If the the `-h` flag is not specified, the shell will still keep a history of commands run, but will not read/write from/to a history file. Just think of it like private browsing mode for your terminal.

### File

`-f` takes the name of the file to be executed by the shell. The shell will both print and run the commands in the file in sequential order until the end of the file. See the following example file and execution:

`commands.txt`:
```
cd cs241
echo Hey!
```

```
./shell -f commands.txt
(pid=1234)/home/user$ cd cs241
(pid=1234)/home/user/cs241$ echo Hey!
Command executed by pid=1235
Hey!
```

If the user supplies an incorrect number of arguments, or the script file cannot be found, your shell should print the appropriate error from `format.h` and exit.

The [getopt](http://linux.die.net/man/3/getopt) function may come in handy. :smile:

## Specifics

### Prompting

When prompting for a command, the shell will print a prompt in the following format (from `format.c/h`):

```
(pid=<pid>)<path>$
```

`<pid>` is the current process ID, and `<path>` is a path to the current working directory. Note the lack of a newline at the end of this prompt.

### Reading in the Command

The shell will read in a command from `stdin` (or a file if `-f` was specified).

### Running the Command

The shell should run the command that was read in previously.

If the command is run by a new process, the PID of the process should be printed like this:

```
Command executed by pid=<pid>
```

This should be printed before any of the output of the command is printed (prints to be used are in `format.c/h`).

### History

Your shell should store the command that was just executed, so the user can repeat it later if they wish. Every command should be stored unless otherwise noted. A vector may be useful here.

### Catching Ctrl+C

Usually when we do `Ctrl+C`, the current running program will exit. However, we want the shell to ignore the `Ctrl+C` signal (`SIGINT`). The shell should not exit upon receiving `SIGINT`. Instead, it should check if there is a currently running foreground process, and if so, it should kill it using SIGINT (the `kill()` function might come in handy, here and elsewhere).

## Commands

Shell supports two types of commands: built-in and external (i.e. non-built-in). While built-in commands are executed without creating a new process, an external command *must* create a new process to execute the program for that particular command.

Command arguments will be space-separated without trailing whitespace. Your shell does not need to support quotes (for example, `echo "hello there"`).

## Built-in Commands

There are several built-in commands your shell is expected to support.

### `cd <path>`

Changes the current working directory of the shell to `<path>`. Paths not starting with `/` should be followed relative to the current directory. If the directory does not exist, then print the appropriate error. Unlike your regular shell, the `<path>` argument is mandatory here. A missing path should be treated as a nonexistent directory.

```
(pid=1234)/home/user$ cd code
(pid=1234)/home/user/code$ cd imaginary_directory
imaginary_directory: No such file or directory
(pid=1234)/home/user/code$
```

### `!history`

Prints out each command in the history, in order.

```
(pid=1234)/home/user$ !history
0    ls -l
1    pwd
2    ps
(pid=1234)/home/user$
```

:warning: This command is not stored in history.

### `#<n>`

Prints and executes the <i>n</i>th command in history (in chronological order, from earliest to most recent), where _n_ is a non-negative integer. Other values of _n_ will not be tested. The command run should be stored in the history. If _n_ is not a valid index, then print the appropriate error and do not store anything in the history.

The following example assumes a fresh history:

```
(pid=1234)/home/user$ echo Echo This!
Command executed by pid=1235
Echo This!
(pid=1234)/home/user$ echo Another echo
Command executed by pid=1236
Another echo
(pid=1234)/home/user$ !history
0    echo Echo This!
1    echo Another echo
(pid=1234)/home/user$ #1
echo Another echo
Command executed by pid=1237
Another echo
(pid=1234)/home/user$ #9001
Invalid Index
(pid=1234)/home/user$ !history
0    echo Echo This!
1    echo Another echo
2    echo Another echo
(pid=1234)/home/user$
```

:warning: Print out the command before executing if there is a match.

:warning: The `#<n>` command itself is __not__ stored in history, but the command being executed (if any) __is__.

### `!<prefix>`

Prints and executes the last command that has the specified prefix. If no match is found, print the appropriate error and do not store anything in the history. The prefix may be empty. The following example assumes a fresh history:

```
(pid=1234)/home/user$ echo Echo This!
Command executed by pid=1235
Echo This!
(pid=1234)/home/user$ echo Another echo
Command executed by pid=1236
Another echo
(pid=1234)/home/user$ !e
echo Another echo
Command executed by pid=1237
Another echo
(pid=1234)/home/user$ !echo E
echo Echo This!
Command executed by pid=1238
Echo This!
(pid=1234)/home/user$ !d
No Match
(pid=1234)/home/user$ !
echo Echo This!
Command executed by pid=1239
Echo This!
(pid=1234)/home/user$ !history
0       echo Echo This!
1       echo Another echo
2       echo Another echo
3       echo Echo This!
4       echo Echo This!
(pid=1234)/home/user$
```

:warning: Print out the command before executing if there is a match.

:warning: The `!<prefix>` command itself is __not__ stored in history, but the command being executed (if any) __is__.

### `exit`

The shell will exit once it receives the `exit` command or an EOF. The latter is sent by typing `Ctrl+D` on an empty line, and from a script file (as used with the `-f` flag) this is sent once the end of the file is reached.  This should cause your shell to exit with exit status 0. You should make sure that all processes you've started have been cleaned up.

### Invalid Built-in Commands

You should be printing appropriate errors in cases where built-in commands fail; for example, if the user tries to `cd` into a nonexistent directory.

```
(pid=1234)/home/user$ cd /imaginary_directory
/imaginary_directory: No such file or directory
(pid=1234)/home/user$
```

## External Commands

For commands that are not built-in, the shell should consider the command name to be the name of a file that contains executable binary code. Such a code must be executed in a process different from the one executing the shell. You must use `fork`, `exec`, and `wait`/`waitpid`.

The `fork/exec/wait` paradigm is as follows: `fork` a child process. The child process must execute the command with `exec*`, while the parent must `wait` for the child to terminate before printing the next prompt.

You are responsible of cleaning up all the child processes upon termination of your program. It is important to note that, upon a successful execution of the command, `exec` never returns to the child process. `exec` only returns to the child process when the command fails to execute successfully. If any of `fork`, `exec`, or `wait` fail, the appropriate error should be printed and your program should `exit` with exit status 1. For example, if `fork` fails:

```
(pid=1234)/home/user$ echo hello world
Fork Failed!
$
```

Some external commands you may test to see whether your shell works are:

```
/bin/ls
echo hello
```

It is good practice to flush the standard output stream before the fork to be able to correctly display the output.

:bangbang: Please read the disclaimer at the top of the page! We don't want to have to give any failing grades. :bangbang:

## Logical Operators

Like `bash`, your shell should support `&&`, `||`, and `;` in between two commands.

**Important**: each input can have at most *one* of `&&`, `||`, or `;`. You do *not* have to support chaining (e.g. `x && y || z; w`).

**Important**: you should *not* try to handle the combination of the `!history`, `#<n>`, or `!<prefix>` commands with any logical operators. Rather, you can assume these commands will always be run on a line by themselves.

### AND

`&&` is the AND operator.

Input: `x && y`
* The shell first runs `x`, then checks the exit status.
* If `x` exited successfully (status = 0), run `y`.
* If `x` did not exit successfully (status ≠ 0), do *not* run `y`. This is also known as [short-circuiting](https://en.wikipedia.org/wiki/Short-circuit_evaluation).

This mimics short-circuiting AND in boolean algebra: if `x` is false, we know the result will be false *without* having to run `y`.

:question: This is often used to run multiple commands in a sequence and stop early if one fails. For example, `make && ./shell` will run your shell only if `make` succeeds.

### OR

`||` is the OR operator.

Input: `x || y`
* The shell first runs `x`, then checks the exit status.
* If `x` exited successfully, the shell does *not* run `y`. This is short-circuiting.
* If `x` did not exit successfully, run `y`.

Boolean algebra: if `x` is true, we can return true right away *without* having to run `y`.

:question: This is often used to recover after errors. For example, `make || echo 'Make failed!'` will run `echo` only if `make` does not succeed.

### Separator

`;` is the command separator.

Input: `x; y`
* The shell first runs `x`.
* The shell then runs `y`.

:question: The two commands are run regardless of whether the first one succeeds.

## Memory

As usual, you may not have any memory leaks or errors.
