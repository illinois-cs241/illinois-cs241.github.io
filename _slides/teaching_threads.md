---
layout: slide
title: "Threads, Concurrency, and Synchronization"
author: "Bhuvan"
---

## Fixing Non-Reentrant Code

<vertical />

## Splitting the Work up

<horizontal />

## Teaching Threads

## Learning Objectives

* Using pthreads to speed up code
* Common patterns in multithreaded programs

<horizontal />

## So what is reduce?

<vertical />

<img src="/images/slides/intro_threads/map_funny.png" height="500px" alt="Funny Mapreduce Explanation" >

<horizontal />

## What does it look like in code?

## Example

```C
// This is fold right
int sequential_reduce(int (*function)(char, char), int* arr, 
                      size_t size){
	char initial = arr[0];
	int offset;
	for(offset = 1; offset < size; ++offset){
		initial = function(initial, arr[offset]);
	}
	return initial;
}
int main(){
	char arr[] = {1, 2, 3, 4, 5, 6};
	int sum = sequential_reduce(add, arr,
                                    sizeof(arr)/sizeof(arr[0]));
	// Whatever you want
	return 0;
}
```

<horizontal />

## Pthreads? What are thooooose?

Pthreads are short for POSIX-threads. They are a standardized way of doing multithreading on POSIX-compliant systems. A thread is short for thread of execution, meaning that the thread and execute instructions independently of other threads. You covered a lot in lecture here is a bit more in depth

## Signature

```console
int pthread_create(pthread_t *thread,
					const pthread_attr_t *attr,
                    void *(*start_routine) (void *),
                    void *arg);
```

<vertical />

* `thread` somwhere to write the id of the thread
* `attr` options that you set during pthread, for the most part you don't need to worry about it
* `start_routine` where to start your pthread
* `arg` the arguments to give to each pthread

## Join Me!

```console
int pthread_join(pthread_t thread, void **retval);
```

<vertical />

* `thread` the **value** of the thread **not a pointer to it*
* `retval` where should I put the resulting value

Just like waitpid, you want to join all your terminated threads. There is no analog of waitpid(-1, ...) because if you need that 'you probably need to rethink your application design.' - man page.

## All parallel code

```C
#include <pthread.h>

void* do_massive_work(void* payload){
	/* Doing massive work */
	return NULL;
}

int main(){
	pthread_t threads[10];
	for(int i = 0; i < 10; ++i){
		pthread_create(threads+i, NULL, do_massive_work, NULL);
	}

	for(int i = 0; i < 10; ++i){
		pthread_join(threads[i], NULL);
	}
	return 0;
}
```

<horizontal />

## Some advanced stuff

<vertical />

![](/images/slides/intro_threads/thread2.png)

<vertical />

You can guess what happens in pthread_kill
This may be a bit advanced, but the general gist is that they let you leverage parallelism

## Putting it all together

We want you to start a thread for each of the elements, do the computation and alter the array. Dividing up the work it should look something like the following

![](/images/slides/intro_threads/array.gif)

## Wait a minute don't we need mutexes and stuff?

You have been going through mutexes and other synchronization primitives in lecture, but the most efficient data structure uses no synchronization. This means that so long as no other thread touches the exact samepiece of memory that another thread is touching -- there is no race condition. We are then using threads to their full potential of parallelism.

<horizontal />

## Questions?
