Due: 2016 Nov 2, 2359
======================

# Introduction

This week, you won't be working at a start up. There won't be any made up CEO, any manager, any mentor.

You'll just be a kid doing a mandatory (probably difficult) assignment for CS241.

You'll be writing a scheduler. Rather than interacting directly with the operating system, the benevolent CS241 course staff has provided you a simulator; we will simulate quantized and discrete time, jobs arriving, and jobs running. Your library will inform the scheduler which job should run next.

You will find several files:

-   Programming files:
    -   `simulator.c`: **You should not edit this file.** This file is the discrete event simulator that, when run, will interact with your library. You can find more information on how to run this at the end of this web page. This file will be replaced by the autograder, so any changes you make will be ignored.
    -   `libpriqueue.h`: **You should not edit this file.** Files related to the priority queue.
    -   `libscheduler.h`: **You should not edit this file.** Header file for libscheduler.
    -   `libscheduler.c`: Files related to the scheduler. This is the only file you should edit. Feel free to add any helper functions, but you must implement all the functions where we provide outlines.
    -   `examples.pl`: A perl script of `diff` runs that tests your program against the 54 test output files. This file will output differences between your program and the examples.

-   Files you need to edit and commit:
    -   `libscheduler.c`

-   Example input files:
    -   `examples/proc1.csv`
    -   `examples/proc2.csv`
    -   `examples/proc3.csv`

    Note the following column header definitions to read the files:
    - Arrival time: It is the unit of time when the job is expected to arrive and needs to be "handled" by the scheduler.
    - Run time: Provides the total units of time for which the job is supposed to run or scheduled on a core.
    - Priority: Provides the priority of the job running, which is useful in case of pre-emptive scheduling.

-   Example output files:
    -   `examples/proc1-c1-fcfs.out`: Sample output of the simulator, using proc1.csv, 1 core, and FCFS scheduling.
    -   `examples/proc1-c2-fcfs.out`: Sample output of the simulator, using proc1.csv, 2 cores, and FCFS scheduling.
    -   `examples/proc1-c1-pri.out`: Sample output of the simulator, using proc1.csv, 1 core, and PRI scheduling.
    -   `...` *(View the example directory for the full set.)*

    Note that for each unit of time, the output files tell you state of priority queue along with all the cores and jobs running on them. It will also provide information about any jobs that arrive, are scheduled or finished.

### In short, all you need to write is libscheduler.c.

## Before you start

__Think about how to implement a scheduler!__

Try to answer these questions...

1. What do you do for incoming jobs?
2. How do you sort your job so that you can find the next job according to different scheme?
3. What kind of data structures do you need?

What a scheduler does is to put all the jobs it gets in a queue and then sort them in some order(related to scheme). Scheduler gives them to CPU one by one. The key in scheduler is the scheme it use, and the choice of scheduling algorithm depends on many factors. For example, First Come First Serve(FCFS) is really easy to implement but might keep a short job waiting really long for a long process at the front.

So now we know that a scheduler puts jobs in a queue, sort them, and give them to CPU in some order. Then what will be the best data structure to store these jobs? Priority queue can do this job really well! A priority queue is a queue with a really nice feature. It puts every incoming node in correct position so that the queue is always ordered. Therefore, you don't need to call sort() every time you get a new node(job). And you can simply give them out by pulling out the first element of the queue.

An important question now is: "What do you mean by __ordered__?" Lets take FCFS scheduling for example. Ideally, scheduler should be able to:
* Receive a job.
* Put it in a queue.
    * Queue sort the job.
* Give it out to CPU.

And since we are doing FCFS, we want the element that comes first to be at the front of the queue. So you should give jobs arriving earlier higher priority and jobs arriving afterwards lower priority.

Take Shortest Job First(SJF) for another example. You can give those jobs that can be finished faster higher priority. As you can see here, the key to implement a scheduler is to decide __PRIORITY__. And the way to decide priority in a priority queue is by giving a comparator function. By defining a job A is better than a job B in a priority queue, we mean that A has higher priority than B.

So basically, half of your job in this lab is simply writing a comparator function that helps you decide which job has higher priority.

## Mission


### \[Part 1\]: Priority Queue

To build a scheduler, a fundamental data structure is a priority queue. The first part of this lab requires you to ~~implement~~ read and understand `libpriqueue`, our priority queue library. You will be using this library in your scheduler.

### \[Part 2\]: Scheduler

You will need to implement a multi-core scheduler in a simulated computer. You will be provided with a set of cores to schedule a set of tasks on, much like a real Linux scheduler.

The scheduling algorithms you are going to implement are:
* First Come First Served (FCFS)
* Preemptive Priority (PPRI)
* Priority (PRI)
* Preemptive Shortest Job First (PSJF)
* Round Robin (RR)
* Shortest Job First (SJF)

You can read up on scheduling in the wikibook: [Scheduling Part 1](https://github.com/angrave/SystemProgramming/wiki/Scheduling%2C-Part-1%3A-Scheduling-Processes) [Scheduling Part 2](https://github.com/angrave/SystemProgramming/wiki/Scheduling%2C-Part-2%3A-Scheduling-Processes%3A-Algorithms)

**You should use the priority queue ~~you just wrote~~ to help you complete this part of the lab.**

To complete this lab, you must implement the six comparator functions and eight scheduler functions defined in `libscheduler.c`. These functions are self-descriptive, but a full function outline for each function is provided for you in the SVN files. These functions will be utilized by `simulator.c`.

You might want to understand how scheduler works. So we put a detailed explanation in the bottom of this webpage.

## Directions

To help you finish this lab efficiently, we recommend you to follow these steps:

1. Understand when your function will be called.
2. Try to write pseudocode for each comparator first and see what kind of information you will need. For example, you probably need the arrival time of each job so you can implement FCFS by setting priority according to time.
3. Create data members in struct \_job\_t you need for step 2.
4. Go back and complete your comparator functions.

The second part of the lab is to set up scheduler itself and manage incoming jobs and completed jobs. If you look at simulator, there is no virtual CPU there. It only sets up the number of cores a scheduler should have. So the core should be set up(init) in the scheduler library. Now you should implement those functions related to the CPU( like start_up, new_job, job_finished, quantum_expired).

1. Take a look at all these functions, write some pseudocode to realize your thoughts.
2. You must have some questions now, so take a look at the simulator.c and the explanation section to have a better idea about how to implement it.
3. You might need to implement some helper functions to help you write these functions.
    * You might need to know how to find a free core or find a core running a job that can be preempted and assigned a new job with higher priority.
4. Finish these functions.

The last part of your job is computing stats and clean-up, which is fairly trivial. You may need some extra variables to help you keep track of these stats.



## Compile and Run

To compile this lab, run:
```
make clean
make
```
To run the simulator, run:

> ./simulator -c &lt;cores&gt; -s &lt;scheme&gt; &lt;input file&gt;

For example:

> ./simulator -c 2 -s fcfs examples/proc1.csv

The acceptable values for `scheme` (outlined above) are:

-   `FCFS`
-   `PPRI`
-   `PRI`
-   `PSJF`
-   `RR#`, where \# indicates any numeric value
-   `SJF`

We provide three sample schedules: `examples/proc1.csv`, `examples/proc2.csv` and `examples/proc3.csv`. We also provide the expected output of those schedules in the `examples` directory. **It's only important that lines starting with `FINAL TIMING DIAGRAM` match.** We will not grade any output except the last few lines, as `show_queue()` is not required to be implemented in the same way as we did.
To test your program aganist all the test cases in an automated way, we provide a simple perl script. To run all 54 tests, simply run:

> ./examples.pl

All differences will be printed. Therefore, if no data is printed, your program has passed the test cases in the `examples` directory.

Logistics
=========

#### DON'T EDIT THE MAKEFILE

In CS 241, every program will be compiled using `make`. When autograding your lab, we add additional files for test cases and use a different Makefile. Therefore, we do not use your Makefile to compile the code. **If you edit your Makefile, your code probably won't compile for the autograder.**

#### TESTING YOUR PROGRAM

Since all testing and grading by course staff will be done on the VMs, it is **STRONGLY ADVISED** that you test your program on your CS241 VM before submission. The fact that your program "runs perfectly" on your own machine will get you zero points if your program does not run at all on the provided CS241 VMs.

------------------------------------------------------------------------

Examples
========

-   [Example 1](scheduler_example1.md)
-   [Example 2](scheduler_example2.md)
-   [Example 3](scheduler_example3.md)

------------------------------------------------------------------------



## How simulator.c works:

In libscheduler.c, you'll implement a bunch of methods that we'll call as follows:

1.  To start things off, we'll call `scheduler_start_up(...)` exactly once.
2.  Then, we'll run through all the time units from the beginning to the end.
    -   If there's a job that just ended during this time unit, we'll make a call to `scheduler_job_finished(...)`.
    -   If we're using `RR` and a time quantum expires during this time unit, we'll call `scheduler_quantum_expired(...)`.
    -   If there's a job that begins at this time unit, we'll add this job using one call to `scheduler_new_job(...)`. This is specified in the files in examples/proc1.csv, examples/proc2.csv, and examples/proc3.csv.
    -   Then we'll run the next time unit and repeat.


### Scheduler Details

The simulator will always follow a few, very specific rules. It's not important to understand the specifics of the simulator, but we provide these to help you with debugging:

-   All execution of tasks will happen **at the very end of a time unit**.
-   The events in a time unit will occur in this order:
    1.  If a job's last unit of execution occurred in the previous time unit, a `scheduler_job_finished()` call will be made as the first call in the new time unit.
    2.  *If a job has finished, the quantum timer for the core will be reset. (Therefore, `scheduler_quantum_expired()` will never be called on a specific core at the same unit that a job has finished, no matter what scheme)*
    3.  In `RR`, if the quantum timer has expired, a `scheduler_quantum_expired()` will be called. Please notice that if the job finished at the same time unit its quantum expired, this function will NOT be called. This is because its quantum is reset when the job finishes, and scheduler\_job\_finished() is always called in the first place.
    4.  If any job arrives at the time unit, the `scheduler_new_job()` function will be called.
    5.  Finally, the CPU will execute the active jobs on each core.

There are a few specific cases where a scheduler needs to define behavior based on the scheduling policy provided. In this lab, you should apply the following rules:

-   When multiple cores are available(have no job running) to take on a job, the core with the lowest id should take the job.
-   A job cannot be run on multiple cores in the same time unit. However, a job may start on one core, get preempted, and continue on a different core.
-   In `PSJF`, if the job has been partially executed, schedule the job based on its **remaining time** (not the full running time).
-   In `RR`, when a new job arrives, it must be placed at the end of the cycle of jobs. Every existing job must run some amount of time before the new job should run.
-   In all schemes except `RR`, if two or more jobs are tied (e.g., if in `PRI` multiple jobs have the priority of `1`), use the job with the **earliest arrival time**. In `scheduler_new_job()`, we provided the assumption that all jobs will have a unique arrival time. In `RR`, when a job is unscheduled as a result of the quantum timer expiring, it must always be placed at the end of the queue.
-   In all non-preemptive schemes, a new job can never swap out any job that has already been put into the core. Consider a schedule running `PRI` on a single core. After some amount of time:
    -   A job finished in the last time unit, resulting in a `scheduler_job_finished()` call to be made to your scheduler. The scheduler returns that job(id=4) should run. job(id=4) has priority 3.
    -   In this time unit, a new job(id=5, priority 1) also arrived. This results in a `scheduler_new_job()` call to be made to your scheduler. Even though the new job(id=5) has greater priority(priority 1), it will NOT swap out job(id=4), which was already scheduled by `scheduler_job_finished()`. Now, job(id=4) is scheduled to run.
-   In all preemptive schemes, a new job needs to preempt the job that is 'worst'. Consider a schedule running `PSJF` on 2 cores. After some amount of time:
    -   Core 1: job finished in the last time unit. Core 2: Job(id=3, 5 seconds remaining)
    -   The job in core 1 finished in the last time unit, resulting in a `scheduler_job_finished()` call to be made to your scheduler. The scheduler returns that job(id=4, 10 seconds remaining) should run on core 1.
    -   In this time unit, a new job(id=5, 7 seconds remaining) also arrived. This results in a `scheduler_new_job()` call to be made to your scheduler. Since the new job has less time remaining than the worst job in 2 cores, it will preempt that worst job(id=4), which was scheduled by `scheduler_job_finished()`. Now job(id=5) and job(id=3) are scheduled to run.
    -   Only after all jobs finished and any new job arrives will the CPU execute the task. In this example, job(id=4) was never run on the CPU when it was scheduled by `scheduler_job_finished()`. **When calculating response time, you should not consider a job as responded until it runs a CPU cycle.**
