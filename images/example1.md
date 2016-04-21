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
 scheduler_start_up(cores = 1, scheme = FCFS)
     --> scheduler initialized

 scheduler_new_job(job_number = 0, time = 0, running_time = 8, priority = 1)
     --> returns 0, indicating job(id=0) should run on core(id=0)

 scheduler_new_job(job_number = 1, time = 1, running_time = 8, priority = 1)
     --> returns -1, indicating that job(id=1) will not be scheduled at this time.

 scheduler_new_job(job_number = 2, time = 3, running_time = 4, priority = 2)
     --> returns -1, indicating that job(id=2) will not be scheduled at this time.

 scheduler_job_finished(core_id = 0, job_number = 0, time = 8)
     --> returns 1, indicating job(id=1) should run next on core(id=0).

 scheduler_job_finished(core_id = 0, job_number = 1, time = 16)
     --> returns 2, indicating job(id=2) should run next on core(id=0).

 scheduler_job_finished(core_id = 0, job_number = 2, time = 20)
     --> returns -1, indicating that core(id=0) should remain idle.

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
Loaded 1 core(s) and 3 job(s) using First Come First Served (FCFS) scheduling...

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
At the end of time unit 2...
Core 0: 000

Queue: 0(0) 1(-1)

=== [TIME 3] ===
A new job, job 2 (running time=4, priority=2), arrived. Job 2 is set to idle (-1).
Queue: 0(0) 1(-1) 2(-1)

At the end of time unit 3...
Core 0: 0000

Queue: 0(0) 1(-1) 2(-1)

=== [TIME 4] ===
At the end of time unit 4...
Core 0: 00000

Queue: 0(0) 1(-1) 2(-1)

=== [TIME 5] ===
At the end of time unit 5...
Core 0: 000000

Queue: 0(0) 1(-1) 2(-1)

=== [TIME 6] ===
At the end of time unit 6...
Core 0: 0000000

Queue: 0(0) 1(-1) 2(-1)

=== [TIME 7] ===
At the end of time unit 7...
Core 0: 00000000

Queue: 0(0) 1(-1) 2(-1)

=== [TIME 8] ===
Job 0, running on core 0, finished. Core 0 is now running job 1.
Queue: 1(0) 2(-1)

At the end of time unit 8...
Core 0: 000000001

Queue: 1(0) 2(-1)

=== [TIME 9] ===
At the end of time unit 9...
Core 0: 0000000011

Queue: 1(0) 2(-1)

=== [TIME 10] ===
At the end of time unit 10...
Core 0: 00000000111

Queue: 1(0) 2(-1)

=== [TIME 11] ===
At the end of time unit 11...
Core 0: 000000001111

Queue: 1(0) 2(-1)

=== [TIME 12] ===
At the end of time unit 12...
Core 0: 0000000011111

Queue: 1(0) 2(-1)

=== [TIME 13] ===
At the end of time unit 13...
Core 0: 00000000111111

Queue: 1(0) 2(-1)

=== [TIME 14] ===
At the end of time unit 14...
Core 0: 000000001111111

Queue: 1(0) 2(-1)

=== [TIME 15] ===
At the end of time unit 15...
Core 0: 0000000011111111

Queue: 1(0) 2(-1)

=== [TIME 16] ===
Job 1, running on core 0, finished. Core 0 is now running job 2.
Queue: 2(0)

At the end of time unit 16...
Core 0: 00000000111111112

Queue: 2(0)

=== [TIME 17] ===
At the end of time unit 17...
Core 0: 000000001111111122

Queue: 2(0)

=== [TIME 18] ===
At the end of time unit 18...
Core 0: 0000000011111111222

Queue: 2(0)

=== [TIME 19] ===
At the end of time unit 19...
Core 0: 00000000111111112222

Queue: 2(0)

=== [TIME 20] ===
Job 2, running on core 0, finished. Core 0 is now running job -1.
Queue:

FINAL TIMING DIAGRAM:
Core 0: 00000000111111112222

Average Waiting Time: 6.67
Average Turnaround Time: 13.33
Average Response Time: 6.67
==12546==
==12546== HEAP SUMMARY:
==12546== in use at exit: 0 bytes in 0 blocks
==12546== total heap usage: 15 allocs, 15 frees, 2,057 bytes allocated
==12546==
==12546== All heap blocks were freed -- no leaks are possible
==12546==
==12546== For counts of detected and suppressed errors, rerun with: -v
==12546== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 4 from 4)

```
