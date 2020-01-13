---
layout: doc
title: Quiz Topics
---

## CBTF Quiz Schedule. These are usually available Friday - Monday. 

| Quiz | First day | Last day |
| -----|-----------|----------|
| Quiz 1 | Fri, Sep 6 	| Mon, Sep 9 |
| Quiz 2 | Fri, Sep 13	| Mon, Sep 16 |
| Quiz 3 | Fri, Sep 27	| Mon, Sep 30 |
| Quiz 4 | Fri, Oct 11	| Mon, Oct 14 |
| Quiz 5 | Fri, Oct 25  | Mon, Oct 28 |
| Quiz 6 | Fri, Nov 8   | Mon, Nov 11 |
| Quiz 7 | *Mon*, Dec 2 | Wed, Dec 4  |

Protip 1: CBTF is used by many courses. *Seats may not be available on the later days* - so sign up early to reserve your preferreed day and time. 
Protip 2: If you miss your slot, visit the CBTF in person as soon as possible to see if it can be re-scheduled.

### Use the CBTF website to book a slot.

* Slots are in limited supply! Book yours today!  [https://cbtf.engr.illinois.edu/](CBTF website)
* Miss your slot? Visit CBTF as soon as possible. 
* Need DRES accomodations? Please visit the CBTF website for more informaiton.

## Quiz 1

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


## Quiz 2

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


## Quiz 3

This quiz asks you about processes (fork, waitpid, waitpid macros, getpid/getppid, exec, and basic use of signals).

## Quiz 4

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

## Quiz 5

#### Topics

The quiz is about malloc and correctly working with pointers and linked lists in C. You'll be implementing a simple placement algorithm (e.g. Best/First/Worst-fit) for a memory pool. A memory pool is just a large piece of contiguous memory that you want to use for all future requests.


## Quiz 6

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

(Multiple Choice only. Scheduling will not be on this quiz)

## Quiz 7

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

(Multiple Choice only)

## Quiz 8 (under review)

#### Topics

* Security
* Scheduling
* Review of everything!

(Multiple Choice only).
 Don't panic  - There are currently only 7 CBTF slots - This quiz currently does not have a slot scheduled at CBTF. We may combine this quiz with quiz 7.
