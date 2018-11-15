---
layout: doc
title: Quiz Topics
---

## Quiz 1 (Week 2)

#### Start: Tue, Sep 4

#### End: Fri, Sep 7

#### Topics

* C Strings representation
* C Strings as pointers
* char p[]vs char* p
* Simple C string functions (strcmp, strcat, strcpy)
* sizeof char
* sizeof x vs x*
* Heap memory lifetime
* Calls to heap allocation
* Dereferencing pointers
* Address-of operator
* Pointer arithmetic
* String duplication
* String truncation
* double-free error
* String literals
* Print formatting.
* memory out of bounds errors
* static memory
* fileio POSIX vs. C library
* C io fprintf and printf
* POSIX file IO (read, write, open)
* Buffering of stdout


## Quiz 2 (Week 4)

#### Start: Tue, Sep 18

#### End: Fri, Sep 21

#### Topics
C (As above with)


* Correct use of fork, exec and waitpid
* Using exec with a path
* Understanding what fork and exec and waitpid do. E.g. how to use their return values.
* SIGKILL vs SIGSTOP vs SIGINT.
* What signal is sent when you press CTRL-C
* Using kill from the shell or the kill POSIX call.
* Process memory isolation.
* Process memory layout (where is the heap, stack etc; invalid memory addresses).
* What is a fork bomb, zombie and orphan? How to create/remove them.
* getpid vs getppid
* How to use the WAIT exit status macros WIFEXITED etc.


## Quiz 3 (Week 6)

#### Start: Tue, Oct 2

#### End: Fri, Oct 5


This quiz asks you about processes (fork, waitpid, waitpid macros, getpid/getppid, exec, and basic use of signals).

## Quiz 4 (Week 8)

#### Start: Tue, Oct 16

#### End: Fri, Oct 19

#### Topics

* pthread lifecycle
* create join
* pthread_join pthread_exit vs exit
* threads vs process
* Critical sections
* Counting Semaphores
* Barriers
* Condition Variables
* Producer Consumer
* Ring buffer

## Quiz 5 (Week 10)

#### Start: Tue, Oct 30

#### End: Fri, Nov 2

#### Topics


The quiz is about malloc and correctly working with pointers and linked lists in C. You'll be implementing a simple placement algorithm (e.g. Best/First/Worst-fit) for a memory pool. A memory pool is just a large piece of contiguous memory that you want to use for all future requests.


## Quiz 6 (Week 12)

#### Start: Tue, Nov 13

#### End: Fri, Nov 16

#### Topics

* The Dining Philosopher Problem
* The Reader Writer Problem
* The four  Coffman conditions (and the definition of each one)
* Create thread safe code using semaphores
* Creating a barrier using condition variables
* Deadlock and Resource Allocation Graph
* pthread race conditions
* Creating pipes
* Using fseek and ftell
* page tables (page offsets, dirty bit,TLB)
* and a little bit of scheduling (starvation, minimum wait time, best scheduler for interactive tasks).

## Quiz 7 (Week 14)

#### Start: Tue, Nov 27

#### End: Fri, Nov 30

#### Topics

* Basic properties of TCP and UDP
* Purpose and properties of each TCP server call
* Correct order of the "big 4" TCP server calls.
* What is DNS, and what is its purpose?
* POSIX calls required to create a TCP client
* Properties of UDP, TCP, IPv4, IPv6, privileged ports
* Purpose and basic properties of sockets
* Be able to correctly choose when to use ntohs, ntohl, htons, htonl
* Correct setting up addrinfo hints struct for a TCP server or client
* Purpose and properties of getaddrinfo
* Reading and writing to pipes (including blocking, SIGPIPE and detecting when no more bytes can be read)

## Quiz 8 (Week 15)

#### Start: Tue, Dec 4

#### End: Fri, Dec 7

#### Topics

* Review of everything!
