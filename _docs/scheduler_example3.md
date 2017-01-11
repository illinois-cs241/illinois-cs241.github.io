---
layout: doc
title: "Example3"
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
  scheduler start up(cores = 1, scheme = RR)
      --> scheduler initialized

  new job(job number = 0, time = 0, running time = 8, priority = 1)
      --> returns 0, indicating job(id=0) should run on core(id=0)

  new job(job number = 1, time = 1, running time = 8, priority = 1)
      --> returns -1, indicating that job(id=1) will not be scheduled at this time.

  quantum expired(core id = 0, time = 2)
      --> returns 1, indicating job(id=1) should run next on core(id=0).

  new job(job number = 2, time = 3, running time = 4, priority = 2)
      --> returns -1, indicating that job(id=2) will not be scheduled at this time.

  quantum expired(core id = 0, time = 4)
      --> returns 0, indicating job(id=0) should run next on core(id=0).

  quantum expired(core id = 0, time = 6)
      --> returns 2, indicating job(id=2) should run next on core(id=0).

  quantum expired(core id = 0, time = 8)
      --> returns 1, indicating job(id=1) should run next on core(id=0).

  ... /* jobs will continue rotating and running until all jobs finish, statistics, and then cleanup */
```

...it's important to note that even though the jobs arrive in the order `0 1 2`, the order of the jobs in your priority queue will following the rotation: `0 2 1` -> `2 1 0` -> `1 0 2` -> `0 2 1`.

When the simulator is executed and the flow of execution is implemented correctly, you will see the following output:

```
  Loaded 1 core(s) and 3 job(s) using Round Robin (RR) with a quantum of 2 scheduling...

  === [TIME 0] ===
  A new job, job 0 (running time=8, priority=1), arrived. Job 0 is now running on core 0.
  Queue: 0(0)
  At the end of time unit 0...
  Core 0: 0

  Queue: 0(0)

  === [TIME 1] ===
  A new job, job 1 (running time=8, priority=1), arrived. Job 1 is set to idle (-1).
  Queue: 0(0) 1(-1)

  At the end of time unit 1...
  Core 0: 00

  Queue: 0(0) 1(-1)

  === [TIME 2] ===
  Job 0, running on core 0, had its quantum expire. Core 0 is now running job 1.
  Queue: 1(0) 0(-1)

  At the end of time unit 2...
  Core 0: 001

  Queue: 1(0) 0(-1)

  === [TIME 3] ===
  A new job, job 2 (running time=4, priority=2), arrived. Job 2 is set to idle (-1).
  Queue: 1(0) 0(-1) 2(-1)

  At the end of time unit 3...
  Core 0: 0011

  Queue: 1(0) 0(-1) 2(-1)

  === [TIME 4] ===
  Job 1, running on core 0, had its quantum expire. Core 0 is now running job 0.
  Queue: 0(0) 2(-1) 1(-1)

  At the end of time unit 4...
  Core 0: 00110

  Queue: 0(0) 2(-1) 1(-1)

  === [TIME 5] ===
  At the end of time unit 5...
  Core 0: 001100

  Queue: 0(0) 2(-1) 1(-1)

  === [TIME 6] ===
  Job 0, running on core 0, had its quantum expire. Core 0 is now running job 2.
  Queue: 2(0) 1(-1) 0(-1)

  At the end of time unit 6...
  Core 0: 0011002

  Queue: 2(0) 1(-1) 0(-1)

  === [TIME 7] ===
  At the end of time unit 7...
  Core 0: 00110022
  Queue: 2(0) 1(-1) 0(-1)

  === [TIME 8] ===
  Job 2, running on core 0, had its quantum expire. Core 0 is now running job 1.
  Queue: 1(0) 0(-1) 2(-1)

  At the end of time unit 8...
  Core 0: 001100221

  Queue: 1(0) 0(-1) 2(-1)

  === [TIME 9] ===
  At the end of time unit 9...
  Core 0: 0011002211

  Queue: 1(0) 0(-1) 2(-1)

  === [TIME 10] ===
  Job 1, running on core 0, had its quantum expire. Core 0 is now running job 0.
  Queue: 0(0) 2(-1) 1(-1)

  At the end of time unit 10...
  Core 0: 00110022110

  Queue: 0(0) 2(-1) 1(-1)

  === [TIME 11] ===
  At the end of time unit 11...
  Core 0: 001100221100

  Queue: 0(0) 2(-1) 1(-1)

  === [TIME 12] ===
  Job 0, running on core 0, had its quantum expire. Core 0 is now running job 2.
  Queue: 2(0) 1(-1) 0(-1)

  At the end of time unit 12...
  Core 0: 0011002211002

  Queue: 2(0) 1(-1) 0(-1)

  === [TIME 13] ===
  At the end of time unit 13...
  Core 0: 00110022110022

  Queue: 2(0) 1(-1) 0(-1)

  === [TIME 14] ===
  Job 2, running on core 0, finished. Core 0 is now running job 1.
  Queue: 1(0) 0(-1)

  At the end of time unit 14...
  Core 0: 001100221100221

  Queue: 1(0) 0(-1)

  === [TIME 15] ===
  At the end of time unit 15...
  Core 0: 0011002211002211

  Queue: 1(0) 0(-1)

  === [TIME 16] ===
  Job 1, running on core 0, had its quantum expire. Core 0 is now running job 0.
  Queue: 0(0) 1(-1)

  At the end of time unit 16...
  Core 0: 00110022110022110

  Queue: 0(0) 1(-1)

  === [TIME 17] ===
  At the end of time unit 17...
  Core 0: 001100221100221100

  Queue: 0(0) 1(-1)

  === [TIME 18] ===
  Job 0, running on core 0, finished. Core 0 is now running job 1.
  Queue: 1(0)

  At the end of time unit 18...
  Core 0: 0011002211002211001

  Queue: 1(0)

  === [TIME 19] ===
  At the end of time unit 19...
  Core 0: 00110022110022110011

  Queue: 1(0)

  === [TIME 20] ===
  Job 1, running on core 0, finished. Core 0 is now running job -1.
  Queue:

  FINAL TIMING DIAGRAM:
  Core 0: 00110022110022110011

  Average Waiting Time: 9.33
  Average Turnaround Time: 16.00
  Average Response Time: 1.33
  ==5703==
  ==5703== HEAP SUMMARY:
  ==5703== in use at exit: 0 bytes in 0 blocks
  ==5703== total heap usage: 22 allocs, 22 frees, 2,169 bytes allocated
  ==5703==
  ==5703== All heap blocks were freed -- no leaks are possible
  ==5703==
  ==5703== For counts of detected and suppressed errors, rerun with: -v
  ==5703== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 4 from 4)
```
