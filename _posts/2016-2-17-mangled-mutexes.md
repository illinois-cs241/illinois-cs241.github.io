---
layout: doc
title: "Mangled Mutexes"
dueDates: "3/02 11:59pm"
permalink: Mangled Mutexes
---

## Learning objectives

*	Applying threads to an embarrasingly parallel problem.
*	Become more familiar with synchronization primitives, namely mutexes.

## Overview

### Recommended Readings:

Before beginning this lab, make sure to read the following in the wikibook:

* [Pthreads, Part 1: Introduction](https://github.com/angrave/SystemProgramming/wiki/Pthreads%2C-Part-1%3A-Introduction)
* [Pthreads, Part 2: Usage in Practice](https://github.com/angrave/SystemProgramming/wiki/Pthreads%2C-Part-2%3A-Usage-in-Practice)
* [Synchronization Part 1: Mutex Locks](https://github.com/angrave/SystemProgramming/wiki/Synchronization%2C-Part-1%3A-Mutex-Locks)

### Problem Description:

Given two integers, `a` and `b`, you must compute the number of primes between these two integers inclusively (in the range `[a, b]`).

One approach to this problem is known the **trial division**. You can read more about it in this [useful tutorial](https://www.khanacademy.org/computing/computer-science/cryptography/comp-number-theory/a/trial-division).


## count_primes.c

We highly recommend starting the lab by attempting to write a version that works with just a single thread.

**When you have written a single threaded version**, we can start thinking about how to offload the work to multiple threads.

count_primes should be used as follows:

{% highlight bash %}
$ ./count_primes <start> <end> <number of threads>
{% endhighlight %}

Here the start is the first number in the interval you would like to check over, end is the last number. The number of threads is how many threads you should be creating via pthread_create.

So for example, if you wanted to compute the number of primes in the range [1,541] using 4 threads, this would be the expected output.

{% highlight bash %}
$ ./count_primes 1 541 4
There are 100 primes between 1 and 541
{% endhighlight %}

**NOTE: Using 4 threads here means that you are to create 4 threads, so there will be 5 threads in your program when you include the main thread.**

There are a couple considerations you may want to make when writing your multithreaded code.

* How might you divide up the work for your threads?
* How might you ensure all the threads get a relatively even amount of work?
  * Does it take the same amount of time to determine if a number is prime for all numbers?
* How will you prevent data races (a race condition caused by concurrent reads and writes of a shared memory location)

As usual, your code should have no memory leaks.

## Testing your code
There is great resource known as tsan that you can read more about [here](./tsan).
It is a tool from Google built into clang which can help you detect race conditions in your code.
