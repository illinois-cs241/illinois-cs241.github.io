---
layout: doc
title: "Super Linux Kernel Super Lab"
submissions:
- title: Entire Assignment
  due_date: 12/13/2017 11:59pm
  graded_files:
  - mutex.c
  - mutex.h
  - epoll.c
  - epoll.h
  - Makefile
learning_objectives:
  - Implement a mutex using C11 atomics and signal handlers
  - Use epoll and your new mutex to download a file
---

## Overview

This seems daunting, but you will finally use all of your systems programming knowledge from day one to today to fully implement something found in the kernel! (For ease of development, we will be doing it in the userspace.)

In the spirit of kernel programming, we haven't provided any starter code this time. You are going to have to create the `linux_kernel` SVN directory and the files to be graded from scratch!

## Mutex

The mutex we are going to implement will have the following interface:

```

int atomic_compare_exchange_weak_explicit(int* addr, int* expected, int value, memory_order succ, memory_order fail)

```

This function atomically takes the the value at `addr` and compares with to the value at `expected`. If the two are equal, then it stores `value` into `addr`. Otherwise, the contents of `addr` are written into `value`. For the [memory order](http://en.cppreference.com/w/c/atomic/memory_order), we suggest you use `memory_order_relaxed`.

You will want to create a lock using a struct that contains fields of your choice, such as an integer for the lock, and you'll use atomic operations to lock and unlock it.

In order to meet the POSIX specification, your mutex must support the following:

- Locking the mutex should only let one thread continue
- All other threads should be blocked
- Unlocking a mutex should only be allowed by the owner of the mutex (how you can use the atomic instruction above to do this?)

We want you to implement a normal mutex. You don't need to worry about recursive mutexes or any more advanced structures.

**Before you start implementing your mutex, watch the video explanation below.**

## Epoll Downloader

The second part of the lab will be implementing a file downloader using epoll and your mutex from above.

We are going to pass your program a list of URLs, and you should download those using a worker pool of four threads. You can use whatever programming model you want, so long as the threads are grabbing a URL using networking calls to get a connected file descriptor and triggering a read with epoll.

As a refresher, the calls to epoll are:

```
int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);

int epoll_wait(int epfd, struct epoll_event *events,
                      int maxevents, int timeout);

```

The function parameters:

* `int epfd`: A file descriptor to the epoll object you created
* `int op`: One of the operations described in the man page
* `int fd`: The file descriptor to keep track of
* `struct epoll_event *event`: A struct full of options (see the man page)

This function call is pretty heavy on the learning curve, but once you have gotten all the parameters out of the way, writing the downloader is as simple as a few reads and writes among all the threads. Think about what you need to keep thread-safe among all the threads. How can you use your mutex here?

## Makefile

You have been using `make` for a while, but we've always provided the makefiles. For the third part of this lab, you will need to write the makefile yourself!

When we type `make`, it should produce your `epoll_downloader` executable from `epoll.c`. We should be able to run your downloader as `./epoll_downloader <url1> [url, ...]`.

We will be testing a speedup of _many_ different, small files (that is where the concurrent part of the downloader shines).

## Testing

**Testing is ungraded, but highly recommended.**

You are going to have to write your own tests for `mutex.h`.

For the epoll downloader, if you run `./epoll_downloader <url>` it should grab any valid URL. For concurrent uses, try `./epoll_downloader <big_url1> <big_url2>`.

**Anything not specified in these docs is considered undefined behavior, and we will not test it.**

## Important: Video resources

<big>__[Mutex Implementation in Four Minutes](https://www.youtube.com/watch?v=dQw4w9WgXcQ)__</big>

...

...

...

## Alternative assignment

Just kidding! There isn't really a lab. Lab section will be spent as office hours, where you can engage with your fellow students and TAs about material in the course.

You should have received a __final review packet__ as today's handout. It can also be found _[here](http://cs241.cs.illinois.edu/resources/handouts/linux_kernel.pdf)_.

__Your grade for this lab will come from the final review packet submission in [this Google Form](https://goo.gl/forms/Fw6igCt7uxaIMAmI2).__

The submission deadline for this packet is the same time as the second chance submissions (__December 13, 2017 at 11:59 PM__).

Note that you must sign in using your @illinois email. If you are having trouble logging in, try an incognito window/private browser. You _can_ edit your answers after submitting them, so feel free to submit early and work on it later. (We will only grade your last submission before the deadline.)

Your answers will be graded based on a good faith attempt. This means that your answers do not need to be correct, but you should at least put thought into them and try. To repeat, the grade for this review packet will be your final lab grade.

Thanks for a great semester. We hope you enjoyed the class and maybe learned a thing or two, and we wish you luck on the final!

You can **ignore** the submission instructions below.
