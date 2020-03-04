---
layout: doc
title: "Deadlock Demolition"
learning_objectives:
  - Synchronization Primitives
  - Deadlock Detection 
  - Resource Allocation Graph
---

## Backstory

> Do you suffer from writing multithreaded code that deadlocks? Wish that the mutexes would provide feedback instead of deadlocking? Well have no fear, the drms are here! drm, short for deadlock-resistant mutex, are mutexes that will notify you when an attempt to lock them would cause a deadlock! Fancy, right? With this, you won't ever need to worry about deadlock ever again!

Your friend, and work partner Foo showed you the presentation slides which will introduce your project in the upcoming Cool C Libraries Fair. The both of you have decided to implement a mutex library that prevents deadlock, and Foo was so excited that they made the presentation slides _before_ even implenting the library itself. Facepalming at Foo's lack of proper workflow priorities, you decide to just work on it, and have Foo create the tests and videos that will show off the drm's capabilities.

## Overview

A drm behaves exactly like a `pthread_mutex_t`, but will prevent deadlocks from ever occurring. This is done by not allowing a thread to lock the drm if the attempt to lock it would result in deadlock. For example, suppose you had two threads, and two drms: `drm_1` and `drm_2`. Then,
* thread 1 locks `drm_1`.
* thread 2 locks `drm_2`.
* thread 1 tries to lock `drm_2`, and waits.
* thread 2 tries to lock `drm_1`. Notice that this call will cause a deadlock. Your drm library will detect this, and reject thread 2's request to lock `drm_1`.

## Functionality

We will use binary semaphore notation for your drm's functions: i.e. post is equivalent to unlocking and wait is equivalent to locking.

You will be writing four functions:

* `drm_t *drm_init();`
* `int drm_post(drm_t *drm, pthread_t *thread_id);`
* `int drm_wait(drm_t *drm, pthread_t *thread_id);`
* `void drm_destroy(drm_t *drm);`

The details of what these functions do can be found in the header file `libdrm.h`.

## Resource Allocation Graph

To detect deadlock, you will need to maintain a [Resource Allocation Graph](http://cs241.cs.illinois.edu/coursebook/Deadlock#resource-allocation-graphs) and be able to perform cycle detection on it. To assist you with this, we have provided you an implementation of a graph data structure. See `graph.h` for details on how to use the graph.

Since your Resource Allocation Graph will need to represent both drm locks and threads as vertices, use a shallow graph. You will need to lazy initialize a global graph in `drm_init()`. Here is an example of lazy initialization with an integer variable:

```c
static int *g

void init(){
    if(g == NULL)
        g = malloc(sizeof(int))
}
```

:warning: **The provided graph data structure is not thread-safe.**

## Algorithm

`drm_init()` and `drm_destroy()` are straighforward, you only need to allocate and destroy resources. The fun happens in `drm_wait()` and `drm_post()`. 

### `drm_post()`

When a thread calls `drm_post()`:
* Check to see if the vertex is in the graph. If it is not, return without unlocking the `drm_t`.
* Otherwise, if an edge from the drm to the thread exists, remove the edge and unlock the `drm_t`.

### drm_wait()

When a thread calls `drm_wait()`:
* Add the thread to the Resource Allocation Graph if not already present. Hint: what unique identifier can you use for each thread?
* Add the appropriate edge to the Resource Allocation Graph.
* Check if the attempt to lock the drm by the thread would cause deadlock.
* If the attempt to lock the drm would cause a deadlock, then reject the locking attempt by returning without locking the drm.
    * One case that would deadlock is a thread trying to lock a mutex it already owns. Think about how to factor this in.
    * Another case is if the newly added edge creates a cycle in the Resource Allocation Graph.
* If not, then lock the drm. Note that you may need to modify the edges of the Resource Allocation Graph in this step.

## Testing

**Testing is ungraded, but highly recommended**

You should test your drm library thoroughly. We've given you a `libdrm_tester.c` file to write tests in. The tester file comes with an example on how to use the drm. You will need to create more involved tests to ensure that your drm behaves correctly.

### Testing Tips

* `pthread_self` may be useful for this lab.
* You will want to write test cases where there is no deadlock, to ensure your drm behaves like a normal `pthread_mutex_t`.
* You will also want to write test cases where there is deadlock. Perhaps a different synchronization primitive you've learned in class can assist you to artificially create deterministic deadlocks...
* Consider logging important events inside of your functions.
* Note that you will have still reachable memory in your Resource Allocation Graph upon program termination. That is expected behavior, and still reachable memory is not considered a memory leak.

### Edge Cases and Undefined Behavior

Anything not specified in these docs or the header files is considered undefined behavior. We will not test undefined behavior. Some examples:
* initializing a drm that is already initialized.
* calling `drm_destroy()` on a locked drm.

### Thread Sanitizer

We have another target executed by typing `make tsan`. This compiles your code with Thread Sanitizer.

ThreadSantizer is a race condition detection tool. See [this page](http://cs241.cs.illinois.edu/coursebook/Background#tsan) for more information.

**We will be using ThreadSanitizer to grade your code, but we will ONLY test for data race warnings, NOT any other warning type.**

Good luck!
