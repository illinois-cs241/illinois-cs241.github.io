---
layout: slide
title: Deadlock Demolition
---

## Deadlock

<vertical />

![Traffic Jam](/images/assignment-docs/lab/slides/dining/traffic.gif)

## What is deadlock?

From wikipedia:
> In an operating system, a deadlock occurs when a process or thread enters a waiting state because a requested system resource is held by another waiting process, which in turn is waiting for another resource held by another waiting process. 

<horizontal />

## Dining philosophers

A good example of deadlock is the dining philosophers problem. In this problem, there are _n_ philosophers trying to have dinner with _n_ chopsticks. Each requires two chopsticks to eat. How can we allocate the chopsticks such that every philosopher gets to eat?

![Deadlock Dining](/images/assignment-docs/lab/slides/dining/dining.gif)

## Who's a good dining philosopher?

![Dog Philosopher](/images/assignment-docs/lab/slides/dining/dogdining.gif)

<horizontal />

## Solutions to the dining philsophers problem

<horizontal />

## Arbitrator

<vertical />

Have one authority (e.g. a mutex). Have each philosopher grab that authority and only when they have the authority can they pick up their forks and eat. They eat, put the arbitrator and the forks down and move on to the next philosopher (can be random or sequential).

## Downsides

* Very slow
* Only one thread running at a time
* Python's global interpreter lock is implemented this way

<horizontal />

## Leave the table (Stallings)

<vertical />

Consider the case of the dining philosophers with _n_-chopsticks and _n_-philosophers. Reduce the number of philosophers currently allowed at the table to _n-1_ using a semaphore. Have them eat. Cycle out the philosophers.

## Downsides

* Very heavy on context switches for a process
* Needs way of "pausing" a philosopher (SIGSTOP for linux kernel)
* Need a "fair" cycling algorithm

<horizontal />

## Partial Ordering (Dijkstra)

<vertical />

Order the chopsticks _1..n_. For each philosopher have them pick up the lower number chopstick. Then, only if they can pick up the lower chopstick, pick up the higher chopstick. Why does this work?

## Downsides

* Needs to be able to order the resources
* Doesn't livelock but often leads one thread working at a time for large applications (databases)
* But good for dining philosophers!

<horizontal />

## Clean/Dirty (Chandy/Misra)

<vertical />

If you want reeealllllllly fast (given a lot of philosophers numbered _1..n_).

Chopsticks can be dirty or clean. Initially all chopsticks start out as dirty. For each pair of philosophers, assign the chopstick between them to the philosopher with the lower id. When a philosopher wants to eat, they ask the person next to them for a chopstick. If the neighbor's chopstick is clean (they haven't eaten yet), they keep the chopstick. Otherwise, they clean it, and give it to the requesting philosopher. This prevents starvation of philosophers and ensures priority is given to the philosopher that has least recently eaten.

<horizontal />

## A good overview of solutions

[Read the Ron Swanson version here](http://adit.io/posts/2013-05-11-The-Dining-Philosophers-Problem-With-Ron-Swanson.html)

<horizontal />

## Resource allocation graph

We can model resource allocation by having resources and processes represented as vertices
and use edges to show ownership of a resource. A cycle in the
resource allocation graph implies that we have deadlock (assuming other Coffman Conditions hold).

## Example RAG

![Deadlock RAG](/images/assignment-docs/lab/slides/dining/rag.png)

<horizontal />

## Questions?

