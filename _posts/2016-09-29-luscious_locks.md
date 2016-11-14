---
layout: doc
title: "Luscious Locks"
dueDates: "10/05 11:59pm"
permalink: luscious_locks
learning_objectives:
  - Synchronization Primitives
  - Common Patterns in Multi-Threaded Programs
  - Thread-Safe Datastructures and Their Design
wikibook:
  - "Synchronization, Part 1: Mutex Locks"
  - "Synchronization, Part 2: Counting Semaphores"
  - "Synchronization, Part 3: Working with Mutexes And Semaphores"
  - "Synchronization, Part 4: The Critical Section Problem"
  - "Synchronization, Part 5: Condition Variables"
  - "Synchronization, Part 6: Implementing a barrier"
---

## Overview

There are four main components to this lab, three of which are graded. These are Rendezvous (not graded), Semamore, Barrier, and Thread-safe Queue. Each of these represent very common synchronization problem (or slight twists on them) that will do you well to become familiar with.

Good luck!

## Rendezvous (UNGRADED)

This is a problem for you to think about. We have provided a worked solution to this problem but PLEASE try to solve this problem before looking at the solution!

Problem description:

Given two threads, `a` and `b`, and the fact that both have to run two tasks (`a1`, `a2`, `b1`, `b2`), how do you get both `a1` and b1 to run before either `a2` and `b2`? In `rendezvous.c`, you need to modify the two functions (`modifyB_printA` & `modifyA_printB`) using semaphores so that both quotes `A` and `B` are modified before being printed.


## semamore.c
NOTE: A semamore is **NOT** a real thing! It is simply a made up clever name!

A normal semaphore blocks when the value within the semaphore reaches 0. A semamore blocks when it reaches 0, but also blocks when it reaches some maximum value. You can think of a semamore as a top-bounded semaphore. In semamore.c, you are given four functions to work on, `semm_init`, `semm_wait`, `semm_post`, `semm_destroy`. `semm_post` is the important difference. When `semm_post` reaches `max_val` (as defined in the semamore struct in semamore.h), it blocks.

There are four functions in total you will be writing.

### semm_init

Before attempting to write semm_init, please do read the `semamore.h` file which defines the Semamore struct. In semm_init, you are given a Semamore struct which has already been allocated (no need to directly use malloc here), a value, and a max value.

The value represents the exact same concept as a normal semaphore. The `max_val` represents the top bound as described earlier. Ensure here that all the values in the struct are properly set and initialized.

### semm_wait

Here you are passed a pointer to a Semamore struct. This function should behave like a normal semaphore. If the value is at 0 in the Semamore struct, you should block. If the value is currently not at 0, then we decrement it.

### semm_post

This function will specifically have different behavior than a normal semaphore. If the value is at max_val in the Semamore struct, then you need to block. If the value is currently not at max_val, then we increment it.


### semm_destroy

Here you are passed a Semamore struct in which you want to clean up the data. You only have to cleanup members of the struct here, rather than the struct itself. Wherever semm_destroy is called by is responsible for freeing the Semamore struct itself. Any memory allocated in `semm_init` should be dealt with here. To reiterate, you should not free the Semamore struct itself.

## barrier.c

In rendezvous you saw an example of an one-time-use barrier.  Now, you get to build code to support a reusable barrier.  At the cost of being redundant, a reusable barrier is one that can get used more than once.  Say you have threads executing code in a for loop and you want them to stay in sync.  That is, each thread should be on the i'th iteration of the loop when every other thread is on the i'th iteration.  With a reusable barrier, you can stop threads from going to the i+1'th iteration until all of them have finished the i'th.

You can find more info in the [WIKI](https://github.com/angrave/SystemProgramming/wiki/Synchronization%2C-Part-6%3A-Implementing-a-barrier)

Your goal is to implement the functions

* int barrier_destroy(barrier_t *barrier);
* int barrier_init(barrier_t *barrier, unsigned num_threads);
* int barrier_wait(barrier_t *barrier);

so that a `barrier_t` using these functions is a working reusable barrier.

## queue.c

**NOTE: Do not use semaphores or your semamore here.**

Your task is to build a thread safe queue, that also may or may not be bounded, by implementing the functions in queue.c. The maxSize of the queue can be set to either a positive number or a non-positive number. If positive, your queue will block if the user tries to push when the queue is full. If not positive, your queue should never block upon a push (the queue does not have a max size). Obviously, if your queue is empty then you should block on a pull. You should make use of the node struct to store and retrieve information. In the end, your queue implementation should be able to handle concurrent calls from multiple threads. queue_create and queue_destroy will not be called by multiple threads.

The queue is completely independent of the data that the user feeds it. The queue should not attempt to free this data, instead leaving that to the user of the queue.

### queue_create

NOTE: This will only ever be called by a single thread!

Before attempting to write `queue_create`, please do read the provided `queue.h` file which defines the `queue_t` struct. In `queue_create`, you are given a `maxSize` for your queue.

The value of maxSize will change the behavior of your queue when it is positive vs non-positive as described above. Ensure that this is set correctly as well as initializing values within this `queue_t` struct.

You should allocate space for a `queue_t`, initialize it, and return it to the user.


### queue_push

NOTE: This can be called by multiple threads!

In `queue_push`, you are given a pointer to a `queue_t` struct as well as a data item. This function should take the given data, create a new node for it (a `queue_node_t`), and place it on the queue while following the rules we defined above. Specifically, if the queue is bounded (meaning you have a positive number as the `maxSize`) and the queue is full (at that `maxSize` value), then you should block.

You should be pushing the new node on in constant time. Be careful with the various cases you might run into when inserting the new node (think back to 125/225)! Ensure that you have updated the variables in `queue_t` properly!

### queue_pull

NOTE: This can be called by multiple threads!

In `queue_pull`, you are given a pointer to a `queue_t` struct. This function should take the queue and get the data located in the current head of the list, free the current head of the list, and then update the head, and finally return the data while following the rules we defined above. Specifically, if the queue is empty, then you should block.

You should be getting data to be returned from your queue. Ensure that you have updated the variables in queue_t properly!

### queue_destroy

NOTE: This will only ever be called by a single thread!

Here you recieve a pointer to a `queue_t` struct. You must cleanup the items for which an allocation was made within the struct here. Be sure you have freed all memory you allocated.

## Testing

**Testing is ungraded, but highly recommended**

Since the implementation of your semamore is quite close to an actual semaphore, please test this on your own in a variety of ways. Be careful of race conditions! They can be hard to find!  We've given you a `semamore_tests.c` file to write tests in.


For `barrier_test.c` we have provided you with a simple test case.  Feel free to expand on it, as it is not exhaustive/perfect.  Learning how to use the barrier is just as important as writing it, since you will be using barriers on the Password Cracker MP :)

For `queue_test.c` we would like you to write tests yourself.  Learning to write tests for multi-threaded code is very important.  You will also be using this queue in the Password Cracker MP :)  (we will give you a working version; you will not be penalized on the MP for not successfully completing the lab)

## Helpful Hints and Notes

*   Make sure you thoroughly test your code! Race conditions can be hard to spot!
*   Attempting to visualize your code or diagram it in certain cases can sometimes be a huge aid and is highly recommended!

## Requirments

*   `semamore.c`
*   `barrier.c`
*   `queue.c`

**ANYTHING not specified in these docs is considered undefined behavior and we will not test it**
For example, calling queue_push(NULL, NULL) can do whatever you want it to. We will not test it.
