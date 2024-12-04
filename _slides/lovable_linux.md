---
layout: slide
title: Review
---

## C

<vertical />

How are C strings represented in memory? 

What is wrong with malloc(strlen(s)) when copying strings?

<vertical />

```"hello" = [h][e][l][l][o][```**\0**```]```

A C string is just an array of characters with a null terminator (\0) at the end.

<vertical />

```strlen("hello") == 5```

```strlen()``` **does not** count the null terminator.

If used with malloc, there won't be enough memory allocated for the null terminator!

<horizontal />

## Virtual Memory

<vertical />

Explain how a virtual address is converted into a physical address using a multi-level page table. You may use a concrete example e.g. a 64bit machine with 4KB pages.


<vertical />

### How long is the offset?

* How many addresses do you need? One per Byte in the page

Page size: ```4 KB = 2^12 B```

* How many bits do you need to define 2^12 addresses?

```log_2⁡ (2^12⁡)```  = 12 bits

* You take the rest of the bits and split it up evenly among the level of page tables.
  
<vertical />

```|-VPN1-|-VPN2-|-VPN3-|-Offset-|```

> level_1 = top_level[VPN1]

> level_2 = level_1[VPN2]

> level_3 = level_2[VPN3]

> physical_address = level_3 + Offset

<vertical />

What is a page fault? When is it an error? When is it not an error?

<vertical />

Page fault – program attempts access to virtual memory that is not mapped to physical memory. 

There are three types

* Major - The page is on disk and needs to be loaded into memory (disk I/O)
* Minor – No mapping for the page, but valid address (no disk I/O)
* Invalid - Memory being accessed is not part of the virtual address space. There cannot be a page corresponding to it. 

<vertical />

When it’s an Error - Invalid (The operating system usually segfaults)

When it’s not an Error - Major or Minor

<vertical />

What is Spatial and Temporal Locality? Swapping? Swap file? Demand Paging? 

<vertical />

Spatial Locality - Objects in adjacent memory addresses get used (think arrays). That is why a page table is a certain size.

Temporal Locality - Objects used more recently get used. The TLB takes advantage of that

<vertical />

Swapping - Taking a page in memory and burning to disk.

Swap File - specific file on disk that the pages get written to. Another solution is a swap space partition.

Demand Paging - Only allocate pages as the process requests them

<horizontal />

Processes and Threads

<vertical />

Explain the operating system actions required to perform a process context switch.

<vertical/>

1. Save state in process control block(pcb)

This includes:
* Program Counter
* Registers
* Priority
* Stack Pointer / Address Space
* Open Files

<vertical />

2. Flush Translation Lookaside Buffer (TLB)
**BUT** with ASID or PCID (intel) may not be necessary
* Used to identify which process an entry is from
* Address space identifiers (ASID) assigned dynamically
* interactive processes don't get ASIDs
* ASID's are short, too short to identify all processes
* stored in a data structure and optimized for cache usage

<vertical />
3. Choose next process (scheduler's job)

4. Load process state from control block

5. Pop program counter, resume task

<vertical />

Explain the actions required to perform a thread context switch (to a thread in the same process)

<vertical />

Same as above **EXCEPT**
* Only need to save Thread Control Block (TCB) instead of PCB

(i.e. not whole address space, just the stack)

* Don't need to flush TLB
* Scheduler could be the OS for kernel threads (so just like process scheduling) or the scheduler could be the CPU for user-level threads (so a library handles it)

<horizontal />

Scheduling

<vertical />

Which scheduling algorithm results the smallest average wait time?

<vertical />

Round Robin (**IF** new processes sent to the back of the queue)
* wait time \leq (x number of processes on queue)

<vertical />
Why not any other scheduler?

FCFS: wait time = sum of runtime of all processes on queue

SJF/PSJF: wait time = /inf if shorter jobs keep arriving

Priority: waittime = /inf if higher priority jobs keep arriving

<vertical />

What scheduling algorithm has the longest average response time?

<vertical />

Priority
* process can always be pushed lower on the queue by higher priority processes
* priority doesn't correspond to runtime

<vertical />
Why not any other scheduler?

FCFS: response \leq runtime of processes ahead of it on the queue
SJF/PSJF: \inf, but at least all jobs ahead of a process on the queue have shorter runtimes. Priority doesn't guarantee this.
RR: response \leq time quantum x number of processes ahead on the queue.

<horizontal />

Synchronization and Deadlock

<vertical />

Define circular wait, mutual exclusion, hold and wait, and no-preemption. How are these related to deadlock?

<vertical />

### Coffman Conditions

Circular wait: There exists a cycle in the Resource Allocation graph

* P1 is waiting for resources from P2
* P2 is waiting for resources from P3
* ect...
* PN is waiting for resources from P1

Mutual Exclusion: no two processes can hold the same resources at the same time

Hold and Wait: Once a resources is obtained, process holds it until finished

No pre-emption: Nothing can make a process give up a resource

<vertical />

What is the difference between Deadlock Prevention, Deadlock Detection and Deadlock Avoidance?

<vertical />

Deadlock Prevention: Eliminate a Coffman conditions. Deadlocks become impossible.

Deadlock Avoidance: Avoid by allocating resources in a safe manner. The OS implements concurrency control.

Deadlock Detection: When deadlock occurs, OS can detect and resolve it. 

(i.e. use a Resource Allocation Graph to detect deadlocks. kill processes or preempt resources to resolve)

<horizontal />

IPC and signals

<vertical />

Give an example of kernel generated signal. List 2 calls that can a process can use to generate a ```SIGUSR1```.

<vertical />

Kernel generated signals:
* ```SIGSEGV```
* ```SIGILL```
* ```SIGXCPU```

Try running ```kill -l``` to see all signals

<vertical />

```raise(int signal)``` signals yourself

```kill(pid_t pid, int signal)``` signal other processes

<vertical />

What signals can be caught and ignored? What signals cannot be caught?

<vertical />

You can catch anything except ```SIGKILL``` and ```SIGSTOP```

See man page for ```signal(2)``` on how to set signal disposition.

<horizontal />

Networking

<vertical />

Describe the services provided by TCP but not UDP.

<vertical />

* TCP performs flow control, UDP does not
* TCP guarantees delivery, UDP is “best effort”
* TCP has a notion of a connection, UDP is connectionless
* TCP has 3-way (SYN - SYN/ACK - ACK) handshake

TCP is used for web browsing, email, file transfers, etc. UDP is used when data becomes stale quickly (e.g. audio/video streaming and DNS).

<horizontal />

Files

<vertical />

Briefly explain permission bits (including sticky and setuid bits) for files and directories.

<vertical />

```drwxrwxr-x```

```d``` or ```-``` : directory or file
```rwx``` : What the owner of the file is allowed to do (read, write, execute)
```rwx```: What users in the owner's group are allowed to do (read, write, execute)
```r-x```: What everyone else is allowed to od (read and execute, but not write)

<horizontal />

File System