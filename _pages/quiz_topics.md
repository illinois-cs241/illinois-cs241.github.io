---
layout: doc
title: Quiz Topics
---
## Overview

These are *not* the PrairleLearn quizzes that are part of your weekly lab.

There are 7 graded Quizzes available at [PrairieLearn](https://www.prairielearn.org/), attempt all 7 (there are no drops).

Quizzes may be retaken without penality and are due the last day of instruction at UIUC ie. *The day before Reading Day.*

To avoid leaving all quizzes to the last moment we suggest the following due dates -

#### Suggested due dates


Don't stress ... These due dates are *not enforced*; they are just suggestions to space out quizes over the semester. You can take and retake the quizes before or after these dates (upto reading day).

Spring / Fall Semesters
 * 02-15 / 09-15 Quiz 1 (C foundation)
 * 03-01 / 10-01 Quiz 2 (fork,exec,wait and heap) 
 * 03-25 / 10-25 Quiz 3 (pthreads, producer-consumer, synchronization primitives)
 * 04-01 / 11-01 Quiz 4 (threading issues & race conditions, virtual memory)
 * 04-13 / 11-13 Quiz 5 (networking and pipes)
 * 04-20 / 11-27 Quiz 6 (review -hand picked questions from the above)
 * 05-03 / 12-03 Quiz 7 (security)

## Quiz 1

#### Topics

* C Strings representation
* C Strings as pointers
* char p[] vs. char* p
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

* C Foundations (see above)
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

## Quiz 4

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

## Quiz 5

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

## Quiz 6

* Review. This quiz includes questions from previous topics.

## Quiz 7

* See the [Security](http://cs341.cs.illinois.edu/coursebook/Security) chapter in the course book.

#### Topics

* Security fundamentals and principles
* Confidentiality, Integrity, Availability (CIA) principles
* CIA examples
* Compiler and developer-related targetted attacks
* Security-related development practices
* CPU Microarchitecture side channel attacks (Meltdown and Spectre)
* Network and protocol attacks (Heartbleed Syn-flooding, DDOS)
* POSIX Process-related security features (exectable memory, process-as-a-secure container model)
