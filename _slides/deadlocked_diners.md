---
layout: slide
title: Dining Philosophers
authors: "Steve and Bhuvan"
---

## Worksheet

<horizontal />

## The Dining Philosopher Problem

<vertical />

![](/images/slides/dining/traffic.gif)

## Bad Solutions are Everywhere

![](/images/slides/dining/dining.gif)

## Who's a good Dining Philosopher

![](/images/slides/dining/dogdining.gif)

## A Good Overview

[Read a Ron Swanson Version Here](http://adit.io/posts/2013-05-11-The-Dining-Philosophers-Problem-With-Ron-Swanson.html)

<horizontal />

## Failed Solutions

## Please Don't

```C
void * PhilPhunction(void *p) {
    Philosopher *phil = (Philosopher*)p;
    int failed;
    int tries_left;
    pthread_mutex_t *fork_lft = phil->fork_lft;
    pthread_mutex_t *fork_rgt = phil->fork_rgt;

    while (running) {
        pthread_mutex_lock(fork_lft);
        pthread_mutex_lock(fork_rgt);
        usleep( 1+ rand() % 8);

    }
    return NULL;
}
```

## Better but may livelock

```C
void * PhilPhunction(void *p) {
    Philosopher *phil = (Philosopher*)p;
    int failed;
    int tries_left;
    pthread_mutex_t *fork_lft = phil->fork_lft;
    pthread_mutex_t *fork_rgt = phil->fork_rgt;
    int tries_left;
    while (running) {
        tries_left = 3
        do {
            failed = pthread_mutex_lock( fork_lft);
            failed = (tries_left>0)? pthread_mutex_trylock( fork_rgt )
                                    : pthread_mutex_lock(fork_rgt);

            if (failed) {
                pthread_mutex_unlock( fork_lft);
                tries_left--;
            }
        } while(failed && running);

        if (!failed) {
            usleep( 1+ rand() % 8); //eat
            pthread_mutex_unlock(fork_rgt);
            pthread_mutex_unlock(fork_lft);
        }
    }
    return NULL;
}
```

<horizontal />

## Stuff that Works (In order of speed)

<horizontal />

## Arbitrator

<vertical />

Have one authority (mutex in the case of c). Have each philosopher grab that authority and only when they have the authority can they pick up their forks and eat. They eat, put the arbitrator and the forks down and move on to the next philosopher (can be random or sequential).

## Downsides

* Very slow
* Only one thread running at a time essentially
* This is python's GIL in a nutshell

<horizontal />

## Leave the table (Stallings)

<vertical />

Reduce the case of the dining philosophers to a case of n-chopsticks and p-philosophers. Reduce the number of philosophers currently allowed at the table to n-1. Have them eat. Cycle out the philosophers.

## Downsides

* Very heavy on context switchings for process
* Needs way of keeping the philosophers at bay (SIGSTOP for linux kernel)
* Needs some cycling algorithm

<horizontal />

## Partial Ordering (Dijkstra)

<vertical />

Order the chopsticks 1..n. For each philosopher have them pick up the lower number chopstick. Then, only if they can pick up the lower chopstick, pick up the higher chopstick. Why does this work?

## Downsides

* Needs to be able to order the resources
* Doesn't livelock but often leads one thread working at a time for large applications (databases)
* But good for dining philosophers!

<horizontal />

## Clean/Dirty (Chandra/Misra)

<vertical />

If you want reeealllllllly fast (Given a lot of philosophers).

<horizontal />

## Questions?

