---
layout: slide
title: "Savvy Scheduler"
authors: "Pradyumna Shome"
---

# Savvy Scheduler

Operating systems must choose what processes to run.

* Must efficiently select which process must be run on a system’s CPU cores

## Key Terms

* Arrival Time
* Start Time
* End Time
* Response time
* Turnaround time
* Wait time

## Convoy Effect

Convoy of processes following a CPU-intensive processes, with potentially smaller resource requirements.

Affects IO-intensive operations.

## What is pre-emption?

When a more preferable (multiple criteria) process is ready, the CPU can suspend the current process (think `SIGSTOP`), and can switch in the new process. Later, the process that was pre-empted can be scheduled (`SIGCONT`)

Without pre-emption processes will run until they are unable to utilize the CPU any further!

## Why might a process (or thread) be placed on the ready queue?

A process is placed on the ready queue when it is able to use a CPU. Some examples include:

* A process was blocked waiting for a [`**read**`](https://linux.die.net/man/3/read) from storage or socket to complete and data is now available.
* A new process has been created and is ready to start.
* A process thread was blocked on a synchronization primitive (condition variable, semaphore, `mutex `lock) but is now able to continue.
* A process is blocked waiting for a system call to complete but a signal has been delivered and the signal handler needs to run.

## Which schedulers suffer from starvation?

* Example: Shortest Job First with continuous stream of short processes

## Common Scheduling Algorithms

* Shortest Job First
* Priority queue
* First Come First Served
* Round Robin
  * Quanta = 500ms (for example)

## Measures of efficiency

* Lowest average turnaround time

* Lowest wait time

* Latency
