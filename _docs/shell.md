---
layout: doc
title: "Shell"
submissions:
- title: Entire Assignment
  due_date: 02/20/2017 11:59pm
  graded_files:
  - shell.c
learning_objectives:
  - Processes
  - Fork, Exec, Wait
  - Signals
  - Zombie Processes
  - Learning How a Shell Works
wikibook:
  - "Forking, Part 1: Introduction"
  - "Forking, Part 2: Fork, Exec, Wait"
  - "Process Control, Part 1: Wait macros, using signals"
---

## DISCLAIMER

:fork_and_knife: :bomb: :bangbang:

If your code fork bombs on any autograde, then you will automatically fail this MP. Please make sure that your `fork()` code is correct before committing your code for the nightly autograder.

Since a learning objective of this assignment is to use the fork-exec-wait pattern, if you use `system()`, you will automatically fail this MP.

## Backstory

Well, we'll keep it short, you got fired. Your boss brought you in for a code review and was more than disappointed. Apparently, he wanted a text editor like this [one](https://www.sublimetext.com): we didn't get the memo. Now it's time to prove your worth. Your boss wanted something fully functional and we've got a great suggestion (NOTE: this is not a suggestion but a required assignment). You're going to drop a :fire: :fire: shell on him to get rehired. The basic function of a shell is to accept commands as inputs and execute the corresponding programs in response. You will be provided the `Vector` and `format` libraries for your use. Hopefully, this will make things right and you can resume your work at *insert hot tech company here*. Feel free to refer to the unix shell as a rough reference. If you want to build a kernel that actually uses your shell we cannot offer you some extra credit, but we really can't stop you from doing that.


## `format.h`

Since this MP **requires** your programs to print a variety of things like error messages, we have provided you with our own highly customized formatting library. You should not be printing out to stdout and stderr at all; instead, all output and errors should be printed using the functions provided in `format.c` and `format.h`. In `format.h` you can find documentation of what each function does and you should use them whenever approriate. This is our way of ensuring that you do not lose points for formatting issues, but it also means that you are responsible for handling any and all errors mentioned in `format.c` and `format.h`.

## Overview

The shell is responsible for providing a command line for users to execute programs or scripts. You should be very familiar with bash by now, which will be the basis for your own shell. Beyond the basics, your shell will be providing a few extra features, including executing programs in the background, displaying information about active processes, sending signals to processes, and running scripts.

## Starting your shell

The shell should run in a loop like this executing multiple commands:

* Print a command prompt
* Read the command from standard input
* Print the PID of the process executing the command (with the exception of built-in commands), and run the command

The shell must support the following optional argument:

### File

`-f` takes the name of the file to be executed by the shell. The shell will both print and run the commands in the file in sequential order until the end of the file. See the following example file and execution:

commands.txt
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

When prompting for a command, the shell will print a prompt in the following format:

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

### Catch Ctrl+C

Usually when we do `Ctrl+C`, the current running program will exit. However, we want the shell to ignore the `Ctrl+C` signal (`SIGINT`). The shell should not exit upon receiving `SIGINT`. Instead, it should check if there is a currently running foreground process, and if so, it should kill it using SIGINT (the `kill()` function might come in handy, here and elsewhere).

### Exiting

The shell will exit once it receives the `exit` command or an EOF. The latter is sent by typing `Ctrl+D` on an empty line, and from a script file (as used with the `-f` flag) this is sent once the end of the file is reached. 

### Tracking process state

Your shell should keep track of the name, PID and status of every child, it creates. You suggested keeping a fixed sized array, but your manager will not tolerate such blasphemy anymore.

Being a lazy programmer a while back turned out to be helpful! Your manager decides to allow you to use a QA-certified version of the generic vector you tried to implement a few weeks back. It has been provided to you as a precompiled archive.

You might want to create a struct to track process information. Consider checking the `print_process_info()` function in `format.h` to see what kind of information you might want to keep. For process status, you are provided with appropriate constants in `format.h`.

## Commands

Shell supports two types of commands: built-in and external (i.e. non-built-in.) While built-in commands are executed without creating a new process, an external command *must* create a new process to execute the program for that particular command.

Command arguments will be space separated without trailing whitespace. Your shell does not need to support quotes (for example, `echo "hello there"`). Keep it simple.


## Built-in Commands

There are several built-in commands your shell is expected to support.

### `cd <path>`

Changes the current working directory of the shell to `<path>`. Paths not starting with `/` should be followed relative to the current directory. If the directory does not exist, then print the appropriate error. Unlike your regular shell, the `<path>` argument is mandatory here. A missing path should be treated as a non existent directory.

```
(pid=1234)/home/user$ cd code
(pid=1234)/home/user/code$ cd imaginary_directory
imaginary_directory: No such file or directory
(pid=1234)/home/user/code$
```

### `ps`

Like our good old ps, your shell should print out information about all currently running processes (including the shell). Make sure you use `print_process_info()`! Note, while `ps` is normally a separate binary, it is a built-in command for your shell (this is not "execing ps", this is you implementing it in the code.  Thus you have to keep track of process statuses and such).

### `kill <pid>`

The ever useful panic button. Send SIGTERM to the specified process.

Use the appropriate prints from `format.h` for:
- Successfully sending SIGTERM to process
- No process with pid exists
- `kill` was ran without a pid

### `stop <pid>`

This command will allow your shell to stop a currently executing process by sending it the SIGSTOP signal. It may be resumed by using the command `cont`.

Use the appropriate prints from `format.h` for:
- Process was successfully sent SIGSTOP
- No such process exists
- `stop` was ran without a pid

### `cont <pid>`

This command resumes the  specified process by sending it SIGCONT.

Use the appropriate prints from `format.h` for:
- No such process exists
- `cont` was ran without a pid

**Any `<pid>` used in `kill`, `stop`, or, `cont` will either be a non-existant pid or one of a process that is a direct child of your shell**

### `exit`

Causes your shell to exit. You should also cleanup any running/stopped background processes. See the `Cleanup` section for more.

### Invalid built-in commands

You should be printing the appropriate errors in cases where built-in commands fail, for instance, if the user tries to cd into a nonexistent directory, or kill/stop/cont a nonexistent process.

```
(pid=1234)/home/user$ cd /imaginary_directory
/imaginary_directory: No such file or directory
(pid=1234)/home/user$
```

## External Commands

For commands that are not built-in, the shell should consider the command name to be the name of a file that contains executable binary code. Such a code must be executed in a process different from the one executing the shell. You must use `fork()`, `exec()`, and `wait()`.

The `fork()`, `exec()`, `wait()` paradigm is as follows: `fork()` a child process. The child process must execute the command with `exec()`, while the parent must `wait()` for the child to terminate before printing the next prompt. You are responsible of cleaning up all the child processes upon termination of your program. It is important to note that, upon a successful execution of the command, `exec()` never returns to the child process. `exec()` only returns to the child process when the command fails to execute successfully. If any of `fork()`, `exec()`, or `wait()` fail, the appropriate error should be printed and your program should exit(1). For example, if `fork()` fails:

```
(pid=1234)/home/user$ echo hello world
Fork Failed!
$
```

Some external commands that you may try to see whether your shell works as it should are:

```
/bin/ls
echo hello
```

It is good practice to flush the standard output stream before the fork to be able to correctly display the output.

:bangbang: Please read the disclaimer at the top of the page! We don't want to have to give any failing grades. :bangbang:

### `&`

A command suffixed with & should be run in the background. The shell should be ready to take the next command before the given command has finished running. There may or may not be a single space between the rest of the command and `&`. For example, `pwd&` and `pwd &` are both valid. Additionally, since spawning a background process introduces a race condition, it is okay if the prompt gets misaligned as in the following example:


```
(pid=1873)/home/user$ pwd &
Command executed by pid=1874
(pid=1873)/home/user$ 
/home/user
When I type, it shows up on this line
```

While the shell should be usable after calling the command, after the process finishes the parent is still responsible for waiting on the child (hint: catch a signal). Avoid creating zombies! Think about what happens when multiple children finish around the same time!

### `Cleanup`

If there are currently stopped or running background processes when your shell receives `exit` or `Ctrl+D`, you should kill and cleanup each of those children before your shell exits. You do not need to worry about SIGTERM.  (Think, what function lets you cleanup information about child processes?)
**Your shell can not have zombies** (but your children's children might turn into zombies.  You don't have to handle those.)

### `Memory`

No memory leaks or errors.
