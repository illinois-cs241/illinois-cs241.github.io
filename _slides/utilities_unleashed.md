---
layout: slide
title: Processes
---

## Processes!

## Address Space

![Proc Address Space](/images/assignment-docs/lab/slides/fork/address_space.png)

## What is Copied Over?

<vertical />

## Forkbomb

<vertical />

## Process Flowchart

<vertical />

<horizontal />

## Utilities Unleashed

## What are you going to learn?

* What the fork-exec-wait pattern is.
* Why we use it.
* String Manipulation.

## All Fork-Exec-Wait Code

```C
pid_t pid = fork();
if(pid == -1){
	//fork failed
}else if(pid == 0){
	//I am the child
	exec(...)
}else{
	//I Am the parent
	waitpid(pid, ...);
}
```

## Exec Family

* There are three modifiers/mnemonic
	* Either past a **l**ist or arg**v** (null terminated array) of arguments
	* Search for the executable either in the current directory or in the **p**ath
	* Use the parent's environment variables or use an **e**nvironment setting

<vertical />

* Here are the list `exec`
	* `execl( path, arg, … )`,execute the file in current directory
	* `execlp( file, arg, … )`, executes a file only searching in the path
	* `execle( path, arg, …, envp[])`, execute the file in path + environment settings

<vertical />

* Pass an array of string as arguments
	* `execv( path, argv[])`, execute the file in current directory
	* `execvp( file, argv[])`, execute the file in the path only
	* `execvpe( file, argv[]), envp[])` // environment setting

<horizontal />

## time
* `./time <command> <args> ...`
* Try measuring the time of running `sleep 2`
* Should use fork-exec scheme.
* Should take care of programs do not terminate successfully.
* Command line arguments are not limited two one.
* Use the format.h functions to print out time/etc.

## time Workflow

![Workflow for time](/images/assignment-docs/lab/slides/fork/time_workflow.png)

## Helper Functions
* `struct timespec`
	* `time_t tv_sec`;
	* `long tv_nsec`;
	* `tv_sec = 10`, `tv_nsec = 992300000` -> `10.9923 sec`
* `int clock_gettime(clockid_t, timespec *)`;
	* `clockid_t`: should use CLOCK_MONOTONIC in this lab
* return 0 when success, -1 otherwise

<horizontal />

## env

* `./env [key=val1] [key2=val1] ... -- cmd [args] ..`
* `./env TZ=EST5EDT -- date` - execute date under enviornment TZ=EST5EDT
* `./env TEMP=EST5EDT TZ=%TEMP -- date` - why is this the same as above?

## env Workflow

![Environment Workflow](/images/assignment-docs/lab/slides/fork/env_workflow.png)

## Helper Functions

* `int setenv(const char* name, const char* value,` \
	`int overwrite)`
* `char *getenv(const char *name)`
* Write a function that can find all `%notation` in a string
* Extend that function so that you can replace variables \
	with environment variables
* Use getenv to get environment variables
* Be familiar with: return array of strings, clear an array \
	 of strings-> camelCasers

