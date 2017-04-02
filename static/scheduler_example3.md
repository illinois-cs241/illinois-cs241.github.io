---
layout: doc
title: "Example3"
permalink: scheduler_example3
---

Example 3
=========

Consider the following simple schedule:

| job number | arrival time | running time | priority |
|------------|--------------|--------------|----------|
| 0          | 0            | 8            | 1        |
| 1          | 1            | 8            | 1        |
| 2          | 3            | 4            | 2        |

The flow of execution of functions calls is as follows:
```
 scheduler_start_up(s = 4)
     --> scheduler initialized

 scheduler_new_job(job_number = 0, time = 0, running_time = 8, priority = 1)
     --> returns true, indicating that job(id=0) should be scheduled at this time.

 scheduler_new_job(job_number = 1, time = 1, running_time = 8, priority = 1)
     --> returns false, indicating that job(id=1) will not be scheduled at this time.

 scheduler_quantum_expired(time = 2)
     --> returns 1, indicating that job(id=1) should be run next on the processor.

 scheduler_new_job(job_number = 2, time = 3, running_time = 4, priority = 2)
     --> returns false, indicating that job(id=2) will not be scheduled at this time.

 scheduler_quantum_expired(time = 4)
     --> returns 0, indicating that job(id=0) should be run next on the processor.

 scheduler_quantum_expired(time = 6)
     --> returns 2, indicating that job(id=2) should be run next on the processor.

 scheduler_quantum_expired(time = 8)
     --> returns 1, indicating that job(id=1) should be run next on the processor.

 scheduler_quantum_expired(time = 10)
     --> returns 0, indicating that job(id=0) should be run next on the processor.

 scheduler_quantum_expired(time = 12)
     --> returns 2, indicating that job(id=2) should be run next on the processor.

 scheduler_job_finished(job_number = 2, time = 14)
     --> returns 1, indicating that job(id=1) should be run next on the processor.

 scheduler_quantum_expired(time = 16)
     --> returns 0, indicating that job(id=0) should be run next on the processor.

 scheduler_job_finished(job_number = 0, time = 18)
     --> returns 1, indicating that job(id=1) should be run next on the processor.

 scheduler_job_finished(job_number = 1, time = 20)
     --> returns -1, indicating that the processor should remain idle.

 scheduler average waiting time()
     --> returns (28/3) == 9.33

 scheduler average turnaround time()
     --> returns (48/3) == 16.00

 scheduler average response time()
     --> returns (4/3) == 1.33

 scheduler_clean_up()
     --> cleans up and frees all memory used by the scheduler
```

...it's important to note that even though the jobs arrive in the order `0 1 2`, the order of the jobs in your priority queue will following the rotation: `0 2 1` -> `2 1 0` -> `1 0 2` -> `0 2 1`.

When the simulator is executed and the flow of execution is implemented correctly, you will see the following output:

```
Loaded 3 job(s) using Round Robin (RR) with a quantum of 2 scheduling...

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
Job 0 had its quantum expire. Processor is now running job 1.
  Queue: 

At the end of time unit 2...
  History: 001

  Queue: 

=== [TIME 3] ===
A new job, job 2 (running time=4, priority=2), arrived. Job 2 is set to idle (-1).
  Queue: 

At the end of time unit 3...
  History: 0011

  Queue: 

=== [TIME 4] ===
Job 1 had its quantum expire. Processor is now running job 0.
  Queue: 

At the end of time unit 4...
  History: 00110

  Queue: 

=== [TIME 5] ===
At the end of time unit 5...
  History: 001100

  Queue: 

=== [TIME 6] ===
Job 0 had its quantum expire. Processor is now running job 2.
  Queue: 

At the end of time unit 6...
  History: 0011002

  Queue: 

=== [TIME 7] ===
At the end of time unit 7...
  History: 00110022

  Queue: 

=== [TIME 8] ===
Job 2 had its quantum expire. Processor is now running job 1.
  Queue: 

At the end of time unit 8...
  History: 001100221

  Queue: 

=== [TIME 9] ===
At the end of time unit 9...
  History: 0011002211

  Queue: 

=== [TIME 10] ===
Job 1 had its quantum expire. Processor is now running job 0.
  Queue: 

At the end of time unit 10...
  History: 00110022110

  Queue: 

=== [TIME 11] ===
At the end of time unit 11...
  History: 001100221100

  Queue: 

=== [TIME 12] ===
Job 0 had its quantum expire. Processor is now running job 2.
  Queue: 

At the end of time unit 12...
  History: 0011002211002

  Queue: 

=== [TIME 13] ===
At the end of time unit 13...
  History: 00110022110022

  Queue: 

=== [TIME 14] ===
Job 2 finished. Processor is now running job 1.
  Queue: 

At the end of time unit 14...
  History: 001100221100221

  Queue: 

=== [TIME 15] ===
At the end of time unit 15...
  History: 0011002211002211

  Queue: 

=== [TIME 16] ===
Job 1 had its quantum expire. Processor is now running job 0.
  Queue: 

At the end of time unit 16...
  History: 00110022110022110

  Queue: 

=== [TIME 17] ===
At the end of time unit 17...
  History: 001100221100221100

  Queue: 

=== [TIME 18] ===
Job 0 finished. Processor is now running job 1.
  Queue: 

At the end of time unit 18...
  History: 0011002211002211001

  Queue: 

=== [TIME 19] ===
At the end of time unit 19...
  History: 00110022110022110011

  Queue: 

=== [TIME 20] ===
Job 1 finished. Processor is now running job -1.
  Queue: 

FINAL TIMING DIAGRAM:
  History: 00110022110022110011

Average Waiting Time: 9.33
Average Turnaround Time: 16.00
Average Response Time: 1.33
```
