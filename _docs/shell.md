---
layout: doc
title: "Shell"
learning_objectives:
  - Learning How a Shell Works
  - Fork, Exec, Wait
  - Signals
  - Processes
  - Zombie Processes
wikibook:
  - "Forking, Part 1: Introduction"
  - "Forking, Part 2: Fork, Exec, Wait"
  - "Process Control, Part 1: Wait macros, using signals"
---

## Backstory

Well, we'll keep it short – you got fired from Macrohard. Your boss brought you in for a code review and was more than disappointed. Apparently, she wanted a C++ style vector: we didn't get the memo. Now, you've decided to work for *insert hot tech company here*, and you got the job! However, there's a catch - all newhires in *insert hot tech company here* apparently have to go through a newcomers test if they want to keep their jobs. The task? Write a shell. So, you're going to drop a :fire: :fire: shell that is so fancy that your boss will not just keep you in the company, they'll immediately give you a pay raise as well.

The basic function of a shell is to accept commands as inputs and execute the corresponding programs in response. You will be provided the `vector`, `sstring` and `format.c` libraries for your use. Hopefully, this will make things right and you can secure your foothold at *insert hot tech company here*. Feel free to refer to the Unix shell as a rough reference.

## Notices

#### Fork Bombs

:fork_and_knife: :bomb: :bangbang:

To prevent you from fork bombing your own VM, we recommend looking into [`ulimit`](https://ss64.com/bash/ulimit.html). This will allow you to set a limit for how many times you can fork. It is a good idea to add this to your `~/.bashrc` file (feel free to look up online how to do so), so that it is run every time you log in to your VM.

Since a learning objective of this assignment is to use the fork-exec-wait pattern, if you use `system`, you will automatically fail this MP.

#### Formatting

- Since this MP **requires** your programs to print a variety of things like error messages, we have provided you with our own highly customized formatting library. You should not be printing out to stdout and stderr at all; instead, all output and errors should be printed using the functions provided in `format.c` and `format.h`. In `format.h` you can find documentation about what each function does, and you should use them whenever appropriate.

**Note**: don't worry if you don't use all of the functions in `format.c`, but you should use them whenever their documented purpose matches the situation.

- Do not worry about irregular spacing in command inputs (i.e. extra whitespace before and after each token). This is considered undefined behavior and will not be tested.

## Overview

The shell is responsible for providing a command line for users to execute programs or scripts. You should be very familiar with `bash` by now, which will be the basis for your own shell.

#### Starting Your Shell

The shell should run in a loop like this executing multiple commands:

* Print a command prompt
* Read the command from standard input
* Print the PID of the process executing the command (with the exception of built-in commands), and run the command

The shell must support the following two optional arguments, however, *the order of the arguments does not matter, and should not affect the functionality of your shell*.

#### History

`-h` takes the filename of the history file. The shell should load in the history file as its history. If the file does not exist, you should treat it as an empty file and write all the commands that were executed in the terminal to the output file on exit. Upon exit, the exact same history file should be updated, even if the shell is in a different working directory than where it started.

```
./shell -h <filename>
```

The format of the history file stored should be exactly the same as a script file. See below for details.

If the the `-h` flag is not specified, the shell will still keep a history of commands run, but will not read/write from/to a history file. Just think of it like private browsing mode for your terminal.

#### File

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

You have been given a sample script file `test_file.txt`. Your history files and script files should be formatted in the same manner.

If the user supplies an incorrect number of arguments, or the script file cannot be found, your shell should print the appropriate error from `format.h` and exit.

The [getopt](http://linux.die.net/man/3/getopt) function may come in handy. :smile:

## Interaction

#### Prompting

When prompting for a command, the shell will print a prompt in the following format (from `format.h`):

```
(pid=<pid>)<path>$
```

`<pid>` is the current process ID, and `<path>` is a path to the current working directory. Note the lack of a newline at the end of this prompt.

#### Reading in the Command

The shell will read in a command from `stdin` (or a file if `-f` was specified).

#### Running the Command

The shell should run the command that was read in previously.

If the command is run by a new process, the PID of the process should be printed like this:

```
Command executed by pid=<pid>
```

This should be printed by the process that will run the command, before any of the output of the command is printed (prints to be used are in `format.c/h`).

#### `exit`

The shell will exit once it receives the `exit` command or once it receives an `EOF` **at the beginning of the line**. An `EOF` is sent by typing `Ctrl-D` from your terminal. It is also sent automatically from a script file (as used with the `-f` flag) once the end of the file is reached. This should cause your shell to exit with exit status 0.

If there are currently stopped or running background processes when your shell receives `exit` or `Control-D` (EOF), you should kill and cleanup each of those children before your shell exits. You do not need to worry about SIGTERM.

:warning: If you don't handle `EOF` to exit, you will fail many of our test cases!

#### Keeping History

Your shell should store the command that the user entered, so the user can repeat it later if they wish. Every command should be stored unless otherwise noted. A vector may be useful here.

:warning: Do **not** store `exit` in history!

#### Catching Ctrl+C

Usually when we do `Ctrl+C`, the current running program will exit. However, we want the shell itself to ignore the `Ctrl+C` signal (`SIGINT`). Instead, it should check if there is a currently running foreground process, and if so, it should kill that foreground process using SIGINT (the `kill()` function might come in handy, here and elsewhere).

When a signal is sent to process, it is sent to all processes in its process group. In this assignment, the shell process is the leader of a process group consisting of all processes that are `fork`'d from it.

Since we want this signal sent to the foreground process, but not to any backgrounded processes, you will want to use [`setpgid`](http://man7.org/linux/man-pages/man2/setpgid.2.html) to assign each background process to its own process group after forking:

## Commands

Shell supports two types of commands: built-in and external (i.e. non-built-in). While built-in commands are executed without creating a new process, an external command *must* create a new process to execute the program for that particular command.

Command arguments will be space-separated without trailing whitespace. Your shell does not need to support quotes (for example, `echo "hello there"`).

## Built-in Commands

There are several built-in commands your shell is expected to support.

#### `cd <path>`

Changes the current working directory of the shell to `<path>`. Paths not starting with `/` should be followed relative to the current directory. If the directory does not exist, then print the appropriate error. Unlike your regular shell, the `<path>` argument is mandatory here. A missing path should be treated as a nonexistent directory.

```
(pid=1234)/home/user$ cd code
(pid=1234)/home/user/code$ cd imaginary_directory
imaginary_directory: No such file or directory
(pid=1234)/home/user/code$
```

There is a system call that may be helpful here.

#### `!history`

Prints out each command in the history, in order.

```
(pid=1234)/home/user$ !history
0    ls -l
1    pwd
2    ps
(pid=1234)/home/user$
```

:warning: This command is not stored in history.

#### `#<n>`

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

#### `!<prefix>`

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

You are responsible of cleaning up all the child processes upon termination of your program. It is important to note that, upon a successful execution of the command, `exec` never returns to the child process. `exec` only returns to the child process when the command fails to execute successfully. If any of `fork`, `exec`, or `wait` fail, the appropriate error messages should be printed. The child should `exit` with exit status 1 if it fails to execute a command.

Some external commands you may test to see whether your shell works are:

```
/bin/ls
echo hello
```

It is good practice to flush the standard output stream before the fork to be able to correctly display the output.

:bangbang: Please read the disclaimer at the top of the page! We don't want to have to give any failing grades. :bangbang:

## Logical Operators

Like `bash`, your shell should support `&&`, `||`, and `;` in between two commands. This will require only a minimal amount of string parsing that you have to do yourself.

**Important**: each input can have at most *one* of `&&`, `||`, or `;`. You do *not* have to support chaining (e.g. `x && y || z; w`).

**Important**: you should *not* try to handle the combination of the `!history`, `#<n>`, `!<prefix>`, or `exit` commands with any logical operators. Rather, you can assume these commands will always be run on a line by themselves.

#### AND

`&&` is the AND operator.

Input: `x && y`
* The shell first runs `x`, then checks the exit status.
* If `x` exited successfully (status = 0), run `y`.
* If `x` did not exit successfully (status ≠ 0), do *not* run `y`. This is also known as [short-circuiting](https://en.wikipedia.org/wiki/Short-circuit_evaluation).

```
(pid=27853)/home/user/semester/shell$ echo hi && echo bye
Command executed by pid=27854
hi
Command executed by pid=27855
bye
```

```
(pid=27879)/home/mkrzys2/fa19/shell$ cd /asdf && echo short-circuit
/asdf: No such file or directory!
```

This mimics short-circuiting AND in boolean algebra: if `x` is false, we know the result will be false *without* having to run `y`.

:question: This is often used to run multiple commands in a sequence and stop early if one fails. For example, `make && ./shell` will run your shell only if `make` succeeds.

#### OR

`||` is the OR operator.

Input: `x || y`
* The shell first runs `x`, then checks the exit status.
* If `x` exited successfully, the shell does *not* run `y`. This is short-circuiting.
* If `x` did not exit successfully, run `y`.

```
(pid=27853)/home/user/semester/shell$ echo hi || echo bye
Command executed by pid=27854
hi
```

```
 (pid=1234)/home/user$ cd /asdf || echo runMe
 /asdf: No such file or directory
 runMe
```

Boolean algebra: if `x` is true, we can return true right away *without* having to run `y`.

:question: This is often used to recover after errors. For example, `make || echo 'Make failed!'` will run `echo` only if `make` does not succeed.

#### Separator

`;` is the command separator.

Input: `x; y`
* The shell first runs `x`.
* The shell then runs `y`.

```
(pid=27879)/home/user/semester/shell$ echo hi; echo bye
Command executed by pid=27883
hi
Command executed by pid=27884
bye
```

```
(pid=27879)/home/user/semester/shell$ cd /asdf; echo runMe
 /asdf: No such file or directory
 Command executed by pid=27884
 runMe
```

:question: The two commands are run regardless of whether the first one succeeds.

## Memory

As usual, you may not have any memory leaks or errors.

## Week 2 Only - Additional Built-In Commands

#### Background Processes

An _external_ command suffixed with `&` should be run in the background. In other words, the shell should be ready to take the next command before the given command has finished running. There is no limit on the number of background processes you can have running at one time (aside from any limits set by the system).  

There will be a single space between the rest of the command and `&`. For example, `pwd &` is valid while you need not worry about `pwd&`.  

Since spawning a background process introduces a race condition, it is okay if the prompt gets misaligned as in the following example:

``` 
(pid=1873)/home/user$ pwd & 
Command executed by pid=1874  
(pid=1873)/home/user$ 
/home/user  
When I type, it shows up on this line 
``` 
Note this is not the only way your shell may misalign.

While the shell should be usable after calling the command, after the process finishes, the parent is still responsible for waiting on the child. Avoid creating zombies! Do not catch SIGCHLD, instead regularly check to see if your children need reaping. Think about what happens when multiple children finish around the same time.  

Backgrounding will **not** be chained with the logical operators nor with redirection operators.


*Hint:* You may find the `/proc` filesystem to be useful, as well as the man pages for it, for `ps` and `pfd`.

#### `ps`

Like our good old `ps`, your shell should print out information about all currently executing processes. You should include the shell and its immediate children, but don't worry about grandchildren or other processes. Make sure you use `print_process_info_header()` and `print_process_info()` (and maybe some other helper functions)!

_Note:_ while `ps` is normally a separate binary, it is a built-in command for your shell. (This is not "execing `ps`", this is you implementing it in the code. Thus you may have to keep track of some information for each process.)

Your version of the `ps` should print the following information for each process:
- PID: The pid of the process
- NLWP: The number of threads currently being used in the process
- VSZ: The program size (virtual memory size) of the process, in kilobytes
- STAT: The state of the process
- START: The start time of the process. You will want to add the boot time of the computer, and start time of the process to calculate this. Make sure you are careful while converting from various formats - the man pages for procfs have helpful tips.
- TIME: The amount of cpu time that the process has been executed for. This includes time the process has been scheduled in user mode (utime) and kernel mode (stime).
- COMMAND: The command that executed the process

Some things to keep in mind:

- The order in which you print the processes does not matter.
- The 'command' for `print_process_info` should be the full command you executed. The `&` for background processes is optional. For the main shell process _only_, you do not need to include the command-line flags.
- You may not exec the `ps` binary to complete this part of the assignment.

Example output of this command:
```
(pid=25497)/home/user$ ps
PID     NLWP    VSZ     STAT    START   TIME    COMMAND
25498   1       7328    R       14:03   1:35    dd if=/dev/zero of=/dev/null &
25501   1       7288    S       14:04   0:00    sleep 1000 &
25497   1       7484    R       14:03   0:00    ./shell
```

## Redirection Operators

Your boss wants some way for your shell commands to be able to link together. You decide to implement `>>`, `>`, and `<`. This will require only a minimal amount of string parsing that you have to do yourself.

**Important**: each input can have at most *one* of `>>`, `>` or `<`. You do *not* have to support chaining (e.g. `x >> y < z > w`).

**Important**: you should *not* try to handle the combination of the `!history`, `#<n>`, `!<prefix>`, or `exit` commands with any redirection operators. Rather, you can assume these commands will always be run on a line by themselves.

| Name | Symbol | Rules|
| ---- | ----- | -------|
| APPEND   | >> | The shell runs process `x` and appends the output onto file `y`. Create `y` if it does not exist.|
| TRUNCATE   | > | The shell runs process `x` and appends the output onto file `y` after truncating the contents of `y`.|
| PIPE | < | Pass the contents of file `y` into process `x`. Run `x` using the content of `y` as standard input. |

#### `kill <pid>`

The ever-useful panic button. Send `SIGTERM` to the specified process.

Use the appropriate prints from `format.h` for:
- Successfully sending `SIGTERM` to process
- No process with `pid` exists
- `kill` was ran without a `pid`

#### `stop <pid>`

This command will allow your shell to stop a currently executing process by sending it the `SIGTSTP` signal. It may be resumed by using the command `cont`.

Use the appropriate prints from `format.h` for:
- Process was successfully sent `SIGTSTP`
- No such process exists
- `stop` was ran without a `pid`

#### `cont <pid>`

This command resumes the specified process by sending it `SIGCONT`.

Use the appropriate prints from `format.h` for:
- No such process exists
- `cont` was ran without a `pid`

**Any `<pid>` used in `kill`, `stop`, or, `cont` will either be a process that is a direct child of your shell or a non-existent process. You do not have to worry about killing other processes.**

## Grading

As you may notice, this MP is split up into two weeks:

- Week 1 (50%): Week 1 tests cover everything up until the week 2 section.
- Week 2 (50%): Week 2 tests cover everything covered in week 1 as well as the week 2 section.
