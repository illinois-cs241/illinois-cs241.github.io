---
layout: slide
title: "Savvy Scheduler"
authors: "Pradyumna Shome"
---

## Scheduling

* Must efficiently select which process must be run
* For the sake of simplicity: Only considering single process/single thread single core systems

i.e. one thing running at a time

<horizontal />

## Key Terms - timestamps

* Arrival Time
* Start Time
* End Time

## Key Terms - durations

* Response time = start time - arrival time
* Turnaround time = end time - arrival time
* Wait time = turnaround time - run time

## Measures of efficiency

* Lowest average turnaround time

* Lowest wait time

* Latency

## Process State

* R - Running or Runnable
* S - Interruptible Sleeping (waiting on an event)
* D - Uninterruptable Sleep (IO typically, still on the CPU)
* T - Stopped
* Z - Zombie process (terminated, but not reaped)

<horizontal />

## Ready Queue
A queue of runnable processes, not waiting for resources, ready to be executed

## Why might a process (or thread) be placed on the ready queue?

A process is placed on the ready queue when it is able to use a CPU. Some examples include:

* A process was blocked waiting for a [`**read**`](https://linux.die.net/man/3/read) from storage or socket to complete and data is now available.
* A new process has been created and is ready to start.

## Other situations

* A process thread was blocked on a synchronization primitive (condition variable, semaphore, `mutex` lock) but is now able to continue.
* A process is blocked waiting for a system call to complete but a signal has been delivered and the signal handler needs to run.

<horizontal />

## Common Scheduling Algorithms

* Shortest Job First
* Priority queue
* First Come First Served
* Round Robin
  * Quantum = 500ms (for example)

## Which schedulers suffer from starvation?

* Example: Shortest Job First with continuous stream of short processes

## Convoy Effect

Convoy of processes following a CPU-intensive processes, with potentially smaller resource requirements.

Affects IO-intensive operations. FCFS suffers from this.

## What is pre-emption?

When a more preferable (multiple criteria) process is ready, the CPU can suspend the current process (think `SIGSTOP`), and can switch in the new process. Later, the process that was pre-empted can be scheduled (`SIGCONT`)

Without pre-emption processes will run until they are unable to utilize the CPU any further!

<horizontal />

## Questions


<!-- use vertical tag to get a vertical slide without a header -->