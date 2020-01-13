---
layout: doc
title: "Example1"
permalink: scheduler_example1
---

Example 1
=========

Consider the following simple schedule:

| job number | arrival time | running time | priority |
|------------|--------------|--------------|----------|
| 0          | 0            | 8            | 1        |
| 1          | 1            | 8            | 1        |
| 2          | 3            | 4            | 2        |

The flow of execution of functions calls is as follows:

```
 scheduler_start_up(s = FCFS)
     --> scheduler initialized

 scheduler_new_job(job_number = 0, time = 0, running_time = 8, priority = 1)
     --> returns true, indicating that job(id=0) should be scheduled at this time.

 scheduler_new_job(job_number = 1, time = 1, running_time = 8, priority = 1)
     --> returns false, indicating that job(id=1) will not be scheduled at this time.

 scheduler_new_job(job_number = 2, time = 3, running_time = 4, priority = 2)
     --> returns false, indicating that job(id=2) will not be scheduled at this time.

 scheduler_job_finished(job_number = 0, time = 8)
     --> returns 1, indicating that job(id=1) should be run next on the processor.

 scheduler_job_finished(job_number = 1, time = 16)
     --> returns 2, indicating that job(id=2) should be run next on the processor.

 scheduler_job_finished(job_number = 2, time = 20)
     --> returns -1, indicating that the processor should remain idle.

 scheduler_average_waiting_time()
     --> returns (20/3) == 6.67.

 scheduler_average_turnaround_time()
     --> returns (40/3) == 13.33.

 scheduler_average_response_time()
     --> returns (20/3) == 6.67.

 scheduler_clean_up()
     --> cleans up and frees all memory used by the scheduler

```
When the simulator is executed and the flow of execution is implemented correctly, you will see the following output:

```
Loaded 3 job(s) using First Come First Served (FCFS) scheduling...

=== [TIME 0] ===
A new job, job 0 (running time=8, priority=1), arrived. Job 0 is now running on processor.
  Queue: 

At the end of time unit 0...
  History: 0

  Queue: 

=== [TIME 1] ===
A new job, job 1 (running time=8, priority=1), arrived. Job 1 is set to idle (-1).
  Queue: 

At the end of time unit 1...
  History: 00

  Queue: 

=== [TIME 2] ===
At the end of time unit 2...
  History: 000

  Queue: 

=== [TIME 3] ===
A new job, job 2 (running time=4, priority=2), arrived. Job 2 is set to idle (-1).
  Queue: 

At the end of time unit 3...
  History: 0000

  Queue: 

=== [TIME 4] ===
At the end of time unit 4...
  History: 00000

  Queue: 

=== [TIME 5] ===
At the end of time unit 5...
  History: 000000

  Queue: 

=== [TIME 6] ===
At the end of time unit 6...
  History: 0000000

  Queue: 

=== [TIME 7] ===
At the end of time unit 7...
  History: 00000000

  Queue: 

=== [TIME 8] ===
Job 0 finished. Processor is now running job 1.
  Queue: 

At the end of time unit 8...
  History: 000000001

  Queue: 

=== [TIME 9] ===
At the end of time unit 9...
  History: 0000000011

  Queue: 

=== [TIME 10] ===
At the end of time unit 10...
  History: 00000000111

  Queue: 

=== [TIME 11] ===
At the end of time unit 11...
  History: 000000001111

  Queue: 

=== [TIME 12] ===
At the end of time unit 12...
  History: 0000000011111

  Queue: 

=== [TIME 13] ===
At the end of time unit 13...
  History: 00000000111111

  Queue: 

=== [TIME 14] ===
At the end of time unit 14...
  History: 000000001111111

  Queue: 

=== [TIME 15] ===
At the end of time unit 15...
  History: 0000000011111111

  Queue: 

=== [TIME 16] ===
Job 1 finished. Processor is now running job 2.
  Queue: 

At the end of time unit 16...
  History: 00000000111111112

  Queue: 

=== [TIME 17] ===
At the end of time unit 17...
  History: 000000001111111122

  Queue: 

=== [TIME 18] ===
At the end of time unit 18...
  History: 0000000011111111222

  Queue: 

=== [TIME 19] ===
At the end of time unit 19...
  History: 00000000111111112222

  Queue: 

=== [TIME 20] ===
Job 2 finished. Processor is now running job -1.
  Queue: 

FINAL TIMING DIAGRAM:
  History: 00000000111111112222

Average Waiting Time: 6.67
Average Turnaround Time: 13.33
Average Response Time: 6.67
```
