---
layout: slide
title: Synchronization
author: Bhuvan
---

## Sema-More

<vertical />

This is the idea of a mutex: keep the other person out while you do your thing.

![](/images/slides/synch/rest.gif)

<vertical />

This is a semaphore:

![](/images/slides/synch/semaphore.gif)

<vertical />

Just kidding, this is a real semaphore:

![](/images/slides/synch/sema.gif)

<vertical />

```C
pthread_mutex_t m = PTHREAD_MUTEX_INITIALIZER;
Semamore sem;
Stack s; //Thread Safe Stack
void* transaction_listener(void*arg) {
    while(1) {
        semm_wait(&sem);
        stack_push(&s, get_transaction());
    }
}

void* transaction_verifier(void*useless) {
    while(1) {
        semm_post(&sem);
        transaction = stack_pop(&s);
        verify(transaction);
    }
}

int main() {
    pthread_t tid1, tid2;
    pthread_create(&tid1, NULL, transaction_listener, NULL);
    pthread_create(&tid2, NULL, transaction_verifier, NULL);

    pthread_join(tid1,NULL);
    pthread_join(tid2,NULL);
    exit(0);
}
```

<horizontal />

## Semamore Outline

<vertical />

## Struct

```C
typedef struct {
	int value, max_value;
	pthread_mutext_t m;
	pthread_cond_t cv;
} Semamore;
```

<vertical />

* When `max_value` is reached
	* All thread trying to post should be blocked
	* Where/how do you notify these blocked threads when a thread decreases the semamore’s value below `max_value`?
* When 0 is reached
	* All thread trying to wait should be blocked
	* Where/how do you notify these blocked thread when a thread increases the semamore's value above 0?

<horizontal />

## Remember to not burn CPU

## Spurious Wakeups?

```C
if(!condition)
	pthread_cond_wait(&cv, &mutex);
```

What is wrong with the code above?


<horizontal />

## Not-So-Broken Barriers

<vertical />

What does a barrier look like? Glad you asked.

![](/images/slides/synch/barrier.gif)

<vertical />

```C
void * entry_point(void *arg)
{
    int rank = (int)arg;
    for(int row in thread_range)
        for(int col = 0; col < COLS; ++col)
            DotProduct(row, col, initial_matrix, final_matrix);

    // Make sure the threads stop before moving on
    int rc = pthread_barrier_wait(&barr);

    //Check for error
    if(rc != 0 && rc != PTHREAD_BARRIER_SERIAL_THREAD)
    {
        printf("Could not wait on barrier\n");
        exit(-1);
    }

    for(int row in thread_range)
        for(int col = 0; col < COLS; ++col)
            DotProduct(row, col, final_matrix, initial_matrix);
}
```

<vertical />

Please read the wikibook about this!

<horizontal />

## Thread-Safe Queues

<vertical />

![](/images/slides/synch/buffer_anim.gif)

<vertical />

Remember CS 125/225! Appending to the head of a linked list, other edge cases, etc...

<horizontal />

## Reminders

<vertical />

* Use a while loop to check the condition when using `cond_wait`.
* A thread might be awoken even the condition for waking up is not reached.
* Google spurious wakeups: https://goo.gl/TEJVOl
* Write a correctly working queue first before making it thread-safe

<vertical />

* `PTHREAD_MUTEX_INITIALIZER` only works for static initialization
* Use `pthread_mutex_init(&mtex, NULL)` in other cases
* Think of all critical/edge cases to test your queue/semamore
* Consider one thread that starts working really late
* Semamore is not a real term!

<horizontal />

## Questions?

<horizontal />

## Credit Where Credit is Due

<vertical />

Credit to https://habrahabr.ru/post/277669/ for most of these animations!

