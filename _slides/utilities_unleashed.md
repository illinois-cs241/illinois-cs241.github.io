---
layout: slide
title: Processes
---

## Processes!

<vertical />

* A process is an instance of a computer program that may be running.

* At the start of each program, a program gets one process, but each program can make more processes. 

* Powerful, but isolated! Can only communicate with each other by explicit means.

## Contents of a Process Memory Space

* Stack: Where declared variables live, grows down, writable only
* Heap: Where malloc'd memory lives, grows up, writable only
* Data segment: globals, static vars, some parts writable, some parts readable
* Text segment: program instructions, the only executable part of a program

## Address Space of a Process

![Proc Address Space](/images/assignment-docs/lab/slides/fork/address_space.png)

## Forking

`fork` clones the current process to create a new process, called a child process.

it copies the state of the existing process with a few minor differences

## What is Copied Over?

* the address space
* parent's open file descriptors
* parent's open directory streams
* parent's pid (see `getppid()`)
* Environment variables
* Signal Handlers
* Synchronization Primitives

## What is NOT Copied over?

* process id (every child has their own)
* pending signals
* threads
* termination signal (`SIGCHLD`)

## Forkbomb

occurs when there is an attempt to create an infinite number of processes. 

This will often bring a system to a near-standstill

You do NOT want to do this (or else your VM will be difficult to recover)

<vertical />

```
#define PROC 100
int main() {
	pid_t processes[PROC];
	for (int i = 0; i < PROC; ++i) {
		processes[i] = fork();
		if (!processes[i]) {
			execlp("ruby", "ruby", "file.rb", (char*)
				NULL);
		}
	}
	for (int i = 0; i < PROC; ++i) {
		waitpid(processes[i], NULL, 0);
  }
}
```

## Process Flowchart

```
int main() { 
    pid_t child1 = fork(); 
    if (!child1) { 
        pid_t child2 = fork(); 
        if (!child2) { 
            while (1) {} 
        } 
        pid_t child3 = fork(); 
        if (!child3) { 
            printf("Hello!"); 
            exit(2); 
        } 
        waitpid(child3, NULL, 0); 
        waitpid(child2, NULL, 0); 
        exit(1); } 
        waitpid(child1, NULL, 0); }
```

<vertical />

![program flowchart](/images/assignment-docs/lab/slides/fork/program_flowchart.png)

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

## [`fork()`](https://www.man7.org/linux/man-pages/man2/fork.2.html)

creates a child process

On success, the PID of the child process is returned in the
parent, and 0 is returned in the child.

On failure, -1 is
returned in the parent, no child process is created

## [`waitpid(pid, ...)`](https://www.man7.org/linux/man-pages/man2/waitpid.2.html)

wait for state changes in a child of the calling process

A state change is considered to be:

* child terminated
* child stopped by signal
* child resumed by signal

wait allows the system to release the resources associated with the child

otherwise the terminated child remains in a "zombie" state

## [`Exec`](https://www.man7.org/linux/man-pages/man3/exec.3.html) Family

replaces the current process image with a new process image

* There are three modifiers/mnemonic
	* Either past a **l**ist or arg**v** (null terminated array) of arguments
	* Search for the executable either in the current directory or in the **p**ath
	* Use the parent's environment variables or use an **e**nvironment setting


<horizontal />

## time
* `./time <command> <args> ...`
* Try measuring the time of running `sleep 2`
* Should use fork-exec scheme.
* Should take care of programs do not terminate successfully.
* Command line arguments are not limited to one.
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

<vertical />

* Write a function that can find all `%notation` in a string
* Extend that function to replace variables with environment variables
* Use getenv to get environment variables
* Be familiar with: return array of strings, clear an array of strings-> camelCasers

