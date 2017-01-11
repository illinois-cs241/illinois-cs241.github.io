---
layout: doc
title: "Example2"
---

Example 2
=========

Consider the following simple schedule:

| job number | arrival time | running time | priority |
|------------|--------------|--------------|----------|
| 0          | 0            | 8            | 1        |
| 1          | 1            | 8            | 1        |
| 2          | 3            | 4            | 2        |

The flow of execution of functions calls is as follows:
```
 scheduler start up(cores = 2, scheme = FCFS)
     --> scheduler initialized

 new job(job number = 0, time = 0, running time = 8, priority = 1)
     --> returns 0, indicating job(id=0) should run on core(id=0)

 new job(job number = 1, time = 1, running time = 8, priority = 1)
     --> returns 1, indicating that job(id=1) should run on core(id=1).

 new job(job number = 2, time = 3, running time = 4, priority = 2)
     --> returns -1, indicating that job(id=2) will not be scheduled at this time.

 job finished(core id = 0, job number = 0, time = 8)
     --> returns 2, indicating job(id=2) should run next on core(id=0).

 job finished(core id = 1, job number = 1, time = 9)
     --> returns -1, indicating that core(id=1) should remain idle.

 job finished(core id = 0, job number = 2, time = 12)
     --> returns -1, indicating that core(id=0) should remain idle.

 scheduler average waiting time()
     --> returns (5/3) == 1.67.

 scheduler average turnaround time()
     --> returns (25/3) == 8.33.

 scheduler average response time()
     --> returns (5/3) == 1.67.

 scheduler clean up()
     --> cleans up and frees all memory used by the scheduler
```
When the simulator is executed and the flow of execution is implemented correctly, you will see the following output:

```
  Loaded 2 core(s) and 3 job(s) using First Come First Served (FCFS) scheduling...

  === [TIME 0] ===
  A new job, job 0 (running time=8, priority=1), arrived. Job 0 is now running on core 0.
  Queue: 0(0)

  At the end of time unit 0...
  Core 0: 0
  Core 1: -

  Queue: 0(0)

  === [TIME 1] ===
  A new job, job 1 (running time=8, priority=1), arrived. Job 1 is now running on core 1.
  Queue: 0(0) 1(1)

  At the end of time unit 1...
  Core 0: 00
  Core 1: -1

  Queue: 0(0) 1(1)

  === [TIME 2] ===
  At the end of time unit 2...
  Core 0: 000
  Core 1: -11

  Queue: 0(0) 1(1)

  === [TIME 3] ===
  A new job, job 2 (running time=4, priority=2), arrived. Job 2 is set to idle (-1).
  Queue: 0(0) 1(1) 2(-1)

  At the end of time unit 3...
  Core 0: 0000
  Core 1: -111

  Queue: 0(0) 1(1) 2(-1)

  === [TIME 4] ===
  At the end of time unit 4...
  Core 0: 00000
  Core 1: -1111

  Queue: 0(0) 1(1) 2(-1)

  === [TIME 5] ===
  At the end of time unit 5...
  Core 0: 000000
  Core 1: -11111

  Queue: 0(0) 1(1) 2(-1)

  === [TIME 6] ===
  At the end of time unit 6...
  Core 0: 0000000
  Core 1: -111111

  Queue: 0(0) 1(1) 2(-1)

  === [TIME 7] ===
  At the end of time unit 7...
  Core 0: 00000000
  Core 1: -1111111

  Queue: 0(0) 1(1) 2(-1)

  === [TIME 8] ===
  Job 0, running on core 0, finished. Core 0 is now running job 2.
  Queue: 1(1) 2(0)

  At the end of time unit 8...
  Core 0: 000000002
  Core 1: -11111111

  Queue: 1(1) 2(0)

  === [TIME 9] ===
  Job 1, running on core 1, finished. Core 1 is now running job -1.
  Queue: 2(0)

  At the end of time unit 9...
  Core 0: 0000000022
  Core 1: -11111111-

  Queue: 2(0)

  === [TIME 10] ===
  At the end of time unit 10...
  Core 0: 00000000222
  Core 1: -11111111--

  Queue: 2(0)

  === [TIME 11] ===
  At the end of time unit 11...
  Core 0: 000000002222
  Core 1: -11111111---

  Queue: 2(0)

  === [TIME 12] ===
  Job 2, running on core 0, finished. Core 0 is now running job -1.
  Queue:

  FINAL TIMING DIAGRAM:
  Core 0: 000000002222
  Core 1: -11111111---

  Average Waiting Time: 1.67
  Average Turnaround Time: 8.33
  Average Response Time: 1.67
  ==19777==
  ==19777== HEAP SUMMARY:
  ==19777== in use at exit: 0 bytes in 0 blocks
  ==19777== total heap usage: 16 allocs, 16 frees, 3,102 bytes allocated
  ==19777==
  ==19777== All heap blocks were freed -- no leaks are possible
  ==19777==
  ==19777== For counts of detected and suppressed errors, rerun with: -v
  ==19777== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 4 from 4)
```
