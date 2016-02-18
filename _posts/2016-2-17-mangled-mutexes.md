---
layout: doc
title: "Mangled Mutexes"
permalink: Mangled Mutexes
---

## Learning objectives

*	Applying threads to a common problem
*	Become more familiar with synchronization primitives, namely mutexes.

## Overview and Problem Description

Before beginning this lab, make sure you have at least read up to [Synchronization Part 1: Mutex Locks](https://github.com/angrave/SystemProgramming/wiki/Synchronization%2C-Part-1%3A-Mutex-Locks) in the wikibook. 

Given two integers, a and b, you must compute the number of primes between these two integers inclusively (in the range [a, b]). 

One approach to this problem is lnown the **trial division**. You can read more about it in this [useful tutorial](https://www.khanacademy.org/computing/computer-science/cryptography/comp-number-theory/a/trial-division).

## count_primes.c

We highly recommend starting the lab by attempting to write a version that works with just a single thread.

Now that you have written a single threaded version, now we can start thinking about how to offload the work to multiple threads.

count_primes should be used as follows:
```
$ ./count_primes <start> <end> <number of threads>
```
So for example, if you wanted to compute the number of primes in the range [1,541] using 4 threads, this would be the expected output.
```
$ ./count_primes 1 541 4
There are 100 primes between 1 and 541
```

There are a couple considerations you may want to make when writing your multithreaded code.
*   How might you divide up the work for your threads?
*   How might you ensure all the threads get a relatively even amount of work?
*   How will you prevent data races (a race condition caused by concurrent reads and writes of a shared memory location)

As usual, your code should have no memory leaks.

## Testing your code
There is great resource known as tsan that you can read more about [here](http://illinois-cs.github.io/tsan). It is a tool from Google built into clang which can help you detect race conditions in your code.
