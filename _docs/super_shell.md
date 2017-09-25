---
layout: doc
title: "Super Shell"
submissions:
- title: Entire Assignment
  due_date: 10/2/2017 11:59pm
  graded_files:
  - super_shell.c
learning_objectives:
  - Processes
  - Fork, Exec, Wait
  - More Signals
  - Zombie Processes
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

We showed your boss the shell you wrote. She didn't rule out bringing you back on board, but we can't say she was as impressed as we had hoped. Not to worry! We came up with some more features that will show off your systems knowledge. If you can get them implemented, we think your new shell will make her want to see you developing at *insert hot tech company here* again.

## format.h

The rules from before about `format.h` and `format.c` still apply. You should not be printing out to stdout and stderr at all; instead, all output and errors should be printed using the functions provided in `format.c` and `format.h`.

**Note**: this means that your debugging prints to stdout/stderr _will_ cause you to lose points.

## Overview

You will be expanding on the basic shell you wrote last week to include a few extra features: executing programs in the background, sending signals to processes, environment variables, and more!

Your Super Shell will be contained in `super_shell.c`. You will probably want to copy your Part 1 solution from `shell.c` as a starting point.

## Backgrounding

An _external_ command suffixed with `&` should be run in the background. In other words, the shell should be ready to take the next command before the given command has finished running. There is no limit on the number of background processes you can have running at one time (aside from any limits set by the system).

There may or may not be a single space between the rest of the command and `&`. For example, `pwd&` and `pwd &` are both valid.

Since spawning a background process introduces a race condition, it is okay if the prompt gets misaligned as in the following example:

```
(pid=1873)/home/user$ pwd &
Command executed by pid=1874
(pid=1873)/home/user$
/home/user
When I type, it shows up on this line
```

While the shell should be usable after calling the command, after the process finishes, the parent is still responsible for waiting on the child (hint: catch a signal). Avoid creating zombies! Think about what happens when multiple children finish around the same time.

## New Built-ins

Beyond the built-ins you implemented last week, you should implement the following functionality.

### `ps`

Like our good old `ps`, your shell should print out information about all currently running processes. You should include the shell and its immediate children, but don't worry about grandchildren or other processes. Make sure you use `print_process_info()`!

_Note:_ while `ps` is normally a separate binary, it is a built-in command for your shell. (This is not "execing `ps`", this is you implementing it in the code. Thus you have to keep track of process statuses and such.)

### `kill <pid>`

The ever-useful panic button. Send `SIGTERM` to the specified process.

Use the appropriate prints from `format.h` for:
- Successfully sending `SIGTERM` to process
- No process with `pid` exists
- `kill` was ran without a `pid`

### `stop <pid>`

This command will allow your shell to stop a currently executing process by sending it the `SIGTSTP` signal. It may be resumed by using the command `cont`.

Use the appropriate prints from `format.h` for:
- Process was successfully sent `SIGTSTP`
- No such process exists
- `stop` was ran without a `pid`

### `cont <pid>`

This command resumes the specified process by sending it `SIGCONT`.

Use the appropriate prints from `format.h` for:
- No such process exists
- `cont` was ran without a `pid`

**Any `<pid>` used in `kill`, `stop`, or, `cont` will either be a process that is a direct child of your shell or a non-existent process. You do not have to worry about killing other processes.**

### `export <var=value>`

This command adds variables with their corresponding values to the environment. The values must be expanded prior to calling `setenv` (they may contain references to other variables). Similarly, for *any* command that references environment variables, the environment variable must be expanded **first**. All variable names must be at least one character long, and composed of numbers, letters, or underscores. All other cases are undefined behavior and not in the scope of this assignment.

For example:

`export FOO=123`

`export BAR=$FOO:456 BAZ=$BAR:7890 // BAZ will be 123:456:7890`

`echo $BAR:hello // should print 123:456:hello`

Note: the behavior of `export BAR=$FOO:456 BAZ=$BAR:7890` is different from `export` in bash.

**Any** input to your shell might reference an environment variable, so be sure to get the value first!

### `exit`

Last week, you implemented `exit` without having to worry about any processes except for the one running in the foreground. This week, you'll need to think about cleaning up any running/stopped background processes as well.

If there are currently stopped or running background processes when your shell receives `exit` or `Control-D` (EOF), you should kill and cleanup each of those children before your shell exits. You do not need to worry about SIGTERM. (Think, what function lets you cleanup information about child processes?)

**You should not let your shell's children be zombies**, but your children's children might turn into zombies. You don't have to handle those.

**`exit`** should _not_ be stored in history.

### Invalid Built-ins

You should be printing the appropriate errors in cases where built-in commands fail, for instance, if the user tries to kill/stop/cont a nonexistent process.

## Process Groups

Signals sent to the foreground process should not be sent to backgrounded processes. You will want to use [`setpgid`](http://man7.org/linux/man-pages/man2/setpgid.2.html) to assign each background process to its own process group:

```
pid_t pid = fork();
if (pid > 0) {
  // ...

  // assign the child's process group id to be its pid
  if (setpgid(pid, pid) == -1) {
    print_setpgid_failed();
    exit(1);
  }

  // ...
} else if ( ... ) {
  // ...
}
```

## Escape Sequences

Your shell already supports `&&`, `||`, and `;`. However, what if we want to print `||` directly? If any of these special sequences are escaped in the input, you should treat them as literals. For example:

```
(pid=1337)/home/user$ echo \||
||
(pid=1337)/home/user$ echo \$
$
(pid=1337)/home/user$ echo \;
;
```

**Note**: this applies to `$`, `&`, `&&`, `||`, and `;`. We will only test `&`, `&&`, `||`, and `;` in external commands for this MP, but `$` can be escaped anywhere.

## Memory

As usual, you may not have any memory leaks or errors.

## Grading

Your boss still wants the old functionality, so make sure you don't break any of the features of the old shell! As a result, **all** tests from Shell carry over to Super Shell.
