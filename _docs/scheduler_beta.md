---
layout: doc
title: "Scheduler Beta"
submissions:
- title: Entire Assignment
  due_date: 11/09 11:59pm
  graded_files:
  - libscheduler.c
  - libscheduler.h
learning_objectives:
  - scheduling algorithms
  - preemptive vs non-preemptive
  - Relating the different algorithms with a priority queue
wikibook:
  - "Scheduling, Part 1: Scheduling Processes"
  - "Scheduling, Part 2: Scheduling Processes: Algorithms"
---

## Scheduler Beta 

This lab is an experimental version of scheduler that uses green threads (see below for details). There are a few differences in the scheduler interface, but most of the logic remains the same. Note that your final grade for this lab will be the max of your grade from scheduler and scheduler beta (you don't need to attempt both, if you get a 0 in one of them, you will automatically recieve the grade for the other). 

Since everything is almost the same, these docs will detail the differences and the model of threading explored in this lab. 

## job struct

We have provided a job struct defined in libscheduler.h. You do not need to modify the __state__, __ctx__, or __stack_start__ fields. The only field you will be using or modifying is __metadata__, where you can insert your __job_info__ struct that you will define in __libscheduler.c__.

## changes in scheduler_quantum_expired

This function might recieve a __NULL__ pointer if there is no running job, or the last running job has finished.

## changes in various types

Various types have been changed, for example, time is no longer an __unsigned int__, but a __double__. Some functions that returned a job in the original lab no longer return anything, etc. For the most part, the actual code between the labs should be fairly similar. 

## Testing

We have provided three interfaces to testing this lab. The first is in __main.c__ which you will not be able to edit. The outputs for the various scheduling algorithms are stored in __examples/__ and you will be able to diff your output to see if you have it right. There is an example below. 

```bash
./main fcfs > temp
diff temp examples/output_fcfs.txt
```

Note that for a few schedulers the outputs may not match exactly but will be similar (i.e. if you're only off by a few lines, don't worry about it, the only exception is round robin which suffers from a strange amount of non-determinism even when implemented correctly). 

To allow to write your own tests similar to the ones in __main.c__ you can use __gtest.c__.

The final testing interface is __scheduler_test.c__. This file allows you to directly test the functions you've implemented in libscheduler.c. 

## Spooky bugs

In the spirit of Halloween we have some spooky bugs in this lab! 

Just kidding! This lab is still in beta which means we might have some bugs and value your feedback to help us fix them if you find any! (Hopefully you won't be able to!). If you do find any bugs, please make a piazza post ASAP and we'll investigate. 

Since this lab is new and in beta, all of our course staff may not be completely prepared to answer questions about the internals of scheduler_beta. However, they will be more than capable of answering any questions about scheduling in general and conceptual doubts.

## The threading model - gthreads

Initial idea and code from [here](https://c9x.me/articles/gthreads/code0.html).

Gthreads is an implementation of green threads in c! It uses libscheduler to schedule the threads.

NOTE: The green thread scheduler uses alarms and a SIGALRM handler, it is an error to use some other handler for SIGALRM with gthreads.


## Constants

There are two constants defined as enums in gthread.h, MaxGThreads (not used, remove) and StackSize. Stack size determines the size of the stack for each green thread spawned.

## Functions

### gtinit

*This function should be called before anything else*

This function sets up the scheduler and a signal handler for SIGALRM. It is undefined behavior to call any other function in gthread before this one. 

Takes in a scheme_t detailing what scheduling algorithm to be used. 

### gtgo

This is like pthread_create. It spawns a new green thread (won't start until it's actually scheduled). 

It takes in the function to execute and a scheduler_info\* to get it's scheduler attributes.


### gtstart

This function starts off the scheduling process with a call to ualarm.

### gtret

This function should be called from a thread to clean up and exit. If called from main it will wait for all other threads to finish before exiting with the status as the argument to gtret. If any other thread calls this function, it is equivalent to calling return.

### gtsleep

This function will sleep for at least the number of seconds specified by the argument. Unlike sleep(2), this function will also call yield and allow another thread to run (if there is one on the queue).

### gtdoyield

This function is a wrapper around the internal function gtyield and might perform a context switch to another thread. The return value will be true if a context switch occured and false otherwise. The argument is not important, so long as it is not -1 or SIGALRM.

### gtcurrjob

Returns a job\* indicating the current running job



## Okay, so how does this work?

The idea of green threads is essentially to have a user-space thread that is lighter than a pthread, but at the cost of not executing in parallel. Instead a green thread will switch between many "threads of execution" giving the illusion of parallel processing. As you might have guessed, this switch involves what we call a "context switch" that allows us to save the current state of the thread before moving to a different one.

To learn more about the concept, read [this](https://c9x.me/articles/gthreads/code0.html) article that we used as a starting point.

Now, let's talk about what we've added on top of that very simple implmentation. We need a way to preempt threads. For our purposes, a signal is an accpetable solution to this problem. We have used the function ualarm(3) to schedule alarms on regular intervals. The handler then calls gtyield which will call scheduler_quantum_expired to select the next job to run.

Note that almost all the scheduling magic is implemented in libscheduler! The only exception is that the main thread will never be sent to any of the functions in libscheduler. Instead, every 10 quanta, gtyield will store the current job do a context switch to main, and the next time gtyield is called from main, the process will switch back to the stored job.
