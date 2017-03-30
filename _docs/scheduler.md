---
layout: doc
title: "Scheduler"
submissions:
- title: Entire Assignment
  due_date: 04/5 11:59pm
  graded_files:
  - libscheduler.c
learning_objectives:
  - scheduling algorithms
  - preemptive vs non-premptive
  - Relating the different algorithms with a priority queue
wikibook:
  - "Scheduling, Part 1: Scheduling Processes"
  - "Scheduling, Part 2: Scheduling Processes: Algorithms"
---

## Introduction

This week, you won't be working at a start up. There won't be any made up CEO, any manager, any mentor.

You'll just be a kid doing a mandatory (probably difficult) assignment for CS241.

You'll be writing a scheduler. Rather than interacting directly with the operating system, the benevolent CS241 course staff has provided you a simulator; we will simulate quantized and discrete time, jobs arriving, and jobs running. Your library will inform the scheduler which job should run next.

You will find several files:

-   Programming files:
    -   `simulator.c`: **You should not edit this file.** This file is the discrete event simulator that, when run, will interact with your library. You can find more information on how to run this at the end of this web page. This file will be replaced by the autograder, so any changes you make will be ignored.
    -   `libpriqueue.h`: **You should not edit this file.** Files related to the priority queue.
    -   `libscheduler.h`: **You should not edit this file.** Header file for libscheduler.
    -   `libscheduler.c`: Files related to the scheduler. This is the only file you should edit. Feel free to add any helper functions, but you must implement all the functions where we provide outlines.
    -   `examples.sh`: A bash script of `diff` runs that tests your program against the 24 test output files. This file will output differences between your program and the examples.

-   Files you need to edit and commit:
    -   `libscheduler.c`

-   Example input files:
    -   `examples/proc1.in`
    -   `examples/proc2.in`
    -   `examples/proc3.in`

    Note the following column header definitions to read the files:
    - Arrival time: It is the unit of time when the job is expected to arrive and needs to be "handled" by the scheduler.
    - Run time: Provides the total units of time for which the job is supposed to run.
    - Priority: Provides the priority of the job running, which is useful in case of pre-emptive scheduling.

-   Example output files:
    -   `examples/proc1-fcfs.out`: Sample output of the simulator, using proc1.in and FCFS scheduling.
    -   `examples/proc2-fcfs.out`: Sample output of the simulator, using proc2.in and FCFS scheduling.
    -   `examples/proc3-pri.out`: Sample output of the simulator, using proc3.in and PRI scheduling.
    -   `...` *(View the example directory for the full set.)*

    Note that for each unit of time, the output files tell you state of priority queue and the job that is currently running. It will also provide information about any jobs that arrive, are scheduled or finished.
### In short, all you need to write is libscheduler.c.

## Before you start

__Think about how to implement a scheduler!__

Try to answer these questions...

1. What do you do for incoming jobs?
2. How do you sort your job so that you can find the next job according to different scheme?
3. What kind of data structures do you need?

What a scheduler does is to put all the jobs it gets in a queue and then sort them in some order (related to scheme). Scheduler gives them to CPU one by one. The key in scheduler is the scheme it use, and the choice of scheduling algorithm depends on many factors. For example, First Come First Serve (FCFS) is really easy to implement but might keep a short job waiting really long for a long process at the front.

So now we know that a scheduler puts jobs in a queue, sort them, and give them to CPU in some order. Then what will be the best data structure to store these jobs? Priority queue can do this job really well! A priority queue is a queue with a really nice feature. It puts every incoming node in correct position so that the queue is always ordered. Therefore, you don't need to call `sort()` every time you get a new node (job). And you can simply give them out by pulling out the first element of the queue.

An important question now is: "What do you mean by __ordered__?" Let's take FCFS scheduling for example. Ideally, scheduler should be able to:
* Receive a job.
* Put it in a queue.
    * Queue sort the job.
* Give it out to CPU.

And since we are doing FCFS, we want the element that comes first to be at the front of the queue. So you should give jobs arriving earlier higher priority and jobs arriving afterwards lower priority.

Take Shortest Job First (SJF) for another example. You can give those jobs that can be finished faster higher priority. As you can see here, the key to implement a scheduler is to decide __PRIORITY__. And the way to decide priority in a priority queue is by giving a comparator function. By defining a job A is better than a job B in a priority queue, we mean that A has higher priority than B.

So basically, half of your job in this lab is simply writing a comparator function that helps you decide which job has higher priority.

## Mission


### ~~\[Part 1\]: Priority Queue~~

To build a scheduler, a fundamental data structure is a priority queue. The first part of this lab requires you to ~~implement~~ read and understand `libpriqueue`, our priority queue library. You will be using this library in your scheduler.

### \[Part 2\]: Scheduler

You will need to implement a single-core scheduler in a simulated computer. You will be provided with a uni-core processor to schedule a set of tasks on, much like a real Linux scheduler.

The scheduling algorithms you are going to implement are:
* First Come First Served (FCFS)
* Preemptive Priority (PPRI)
* Priority (PRI)
* Preemptive Least Remaining Time First (PLRTF)
* Round Robin (RR)
* Shortest Job First (SJF)

You can read up on scheduling in the wikibook: [Scheduling Part 1](https://github.com/angrave/SystemProgramming/wiki/Scheduling%2C-Part-1%3A-Scheduling-Processes) and [Scheduling Part 2](https://github.com/angrave/SystemProgramming/wiki/Scheduling%2C-Part-2%3A-Scheduling-Processes%3A-Algorithms)

**You should use the priority queue that ~~you~~ we wrote to help you complete this part of the lab.**

To complete this lab, you must implement the six comparator functions and eight scheduler functions (and one optional one) defined in `libscheduler.c`. These functions are self-descriptive, but a full function outline for each function is provided for you in the SVN files. These functions will be utilized by `simulator.c`.

You might want to understand how scheduler works. So we put a detailed explanation in the bottom of this webpage.

## Directions

To help you finish this lab efficiently, we recommend you to follow these steps:

1. Understand when your function will be called.
2. Try to write pseudocode for each comparator first and see what kind of information you will need. For example, you probably need the arrival time of each job so you can implement FCFS by setting priority according to time.
3. Create data members in `struct _job_t` you need for step 2.
4. Go back and complete your comparator functions.

The second part of the lab is to set up scheduler itself and manage incoming jobs and completed jobs. Now you should implement those functions related to the CPU (like `scheduler_start_up()`, `scheduler_new_job()`, `scheduler_job_finished()`, `scheduler_quantum_expired()`).

1. Take a look at all these functions, write some pseudocode to realize your thoughts.
2. You must have some questions now, so take a look at the `simulator.c` and the explanation section to have a better idea about how to implement it.
3. You might need to implement some helper functions to help you write these functions.
4. Finish these functions.

The last part of your job is computing stats and clean-up, which is fairly trivial. You may need some extra variables to help you keep track of these stats.



## Compile and Run

To compile this lab, run:
```
make clean
make
```
To run the simulator, run:

> ./simulator -s &lt;scheme&gt; &lt;input file&gt;

For example:

> ./simulator -s FCFS examples/proc1.in

The acceptable (case-insensitive) values for `scheme` (outlined above) are:

-   `FCFS`
-   `PPRI`
-   `PRI`
-   `PLRTF`
-   `RR#`, where \# indicates any numeric value (e.g. RR1, RR2, RR18)
-   `SJF`

We provide three sample schedules: `examples/proc1.in`, `examples/proc2.in` and `examples/proc3.in`. We also provide the expected output of those schedules in the `examples` directory. **It's only important that lines starting with `FINAL TIMING DIAGRAM` match.** We will not grade any output except the last few lines, as `show_queue()` is not required to be implemented in the same way as we did.
To test your program aganist all the test cases in an automated way, we provide a simple bash script. To run all 24 tests, simply run:

> ./examples.sh

Only failures will be printed. Having no output means all the testcases passed. Your output may look like the following:
```
Failed examples/proc1-plrtf.out
Failed examples/proc1-rr1.out
Failed examples/proc1-rr2.out
Failed examples/proc1-rr4.out
Failed examples/proc1-sjf.out
```

------------------------------------------------------------------------

Examples
========

-   [Example 1](scheduler_example1.html)
-   [Example 2](scheduler_example2.html)
-   [Example 3](scheduler_example3.html)

------------------------------------------------------------------------



## How simulator.c works:

In libscheduler.c, you'll implement a bunch of methods that we'll call as follows:

1.  To start things off, we'll call `scheduler_start_up(...)` exactly once.
2.  Then, we'll run through all the time units from the beginning to the end.
    -   If there's a job that just ended during this time unit, we'll make a call to `scheduler_job_finished(...)`.
    -   If we're using `RR` and a time quantum expires during this time unit, we'll call `scheduler_quantum_expired(...)`.
    -   If there's a job that begins at this time unit, we'll add this job using one call to `scheduler_new_job(...)`. This is specified in the files in `examples/proc1.in`, `examples/proc2.in`, and `examples/proc3.in`.
    -   Then we'll run the next time unit and repeat.


### Scheduler Details

The simulator will always follow a few, very specific rules. It's not important to understand the specifics of the simulator, but we provide these to help you with debugging:

-   All execution of tasks will happen **at the very end of a time unit**.
-   The events in a time unit will occur in this order:
    1.  If a job's last unit of execution occurred in the previous time unit, a `scheduler_job_finished()` call will be made as the first call in the new time unit.
    2.  *If a job has finished, the quantum timer will also be reset. (Therefore, `scheduler_quantum_expired()` will never be called at the same unit that a job has finished, no matter what scheme)*
    3.  In `RR`, if the quantum timer has expired, a `scheduler_quantum_expired()` will be called. Please notice that if the job finished at the same time unit its quantum expired, this function will NOT be called. This is because its quantum is reset when the job finishes, and `scheduler_job_finished()` is always called in the first place.
    4.  If any job arrives at the time unit, the `scheduler_new_job()` function will be called.
    5.  Finally, the processor will execute the active job.

There are a few specific cases where a scheduler needs to define behavior based on the scheduling policy provided. In this lab, you should apply the following rules:

-   In `PLRTF`, if the job has been partially executed, schedule the job based on its **remaining time** (not the full running time).
-   In `RR`, when a new job arrives, it must be placed at the end of the cycle of jobs. Every existing job must run some amount of time before the new job should run.
-   In all schemes except `RR`, if two or more jobs are tied (e.g., if in `PRI` multiple jobs have the priority of `1`), use the job with the **earliest arrival time**. In `scheduler_new_job()`, we provided the assumption that all jobs will have a unique arrival time. In `RR`, when a job is unscheduled as a result of the quantum timer expiring, it must always be placed at the end of the queue.
-   In all non-preemptive schemes, a new job can never swap out any job that has already been put onto the processor. Consider a schedule running `PRI`. After some amount of time:
    -   A job finished in the last time unit, resulting in a `scheduler_job_finished()` call to be made to your scheduler. The scheduler returns that job(id=4) should run. job(id=4) has priority 3.
    -   In this time unit, a new job(id=5, priority 1) also arrived. This results in a `scheduler_new_job()` call to be made to your scheduler. Even though the new job(id=5) has greater priority(priority 1), it will NOT swap out job(id=4), which was already scheduled by `scheduler_job_finished()`. Now, job(id=4) is scheduled to run.
-   **When calculating response time, you should not consider a job as responded until it runs a CPU cycle.**
