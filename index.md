---
layout: doc
title: Syllabus
---
## Course Description (Informal)
This course will challenge you as a programmer and nascent computer scientist of Illinois. Rather than sand-boxed, contained and simple problems of your previous courses that used significant scaffolding and pre-built libraries, you will be interacting with a much more complex environment - the entire system and even computing networks. Further you will need to fully understand how memory is allocated, used and re-used within a process and how input and output can be buffered (or not) between processes and files. In short - it is time to remove the carefully tailored training wheels and that closed course and instead fling open the doors and welcome you to the big wide world of computing. Oh and did we mention the challenge of concurrency and solving asynchronous problems so that your program can take advantage of the multi-cpu cores inside each machine?

## Course Description (Formal)
System programming refers to writing code that tasks advantage of operating system support for programmers.
This course is designed to introduce you to system programming. 

A computer needs an operating system to manage its resources and provide support for common functions such as accessing peripherals.
There are two categories of "customers" that an operating system must support.
The first category is the community of users.
We have all used computers and you may recognize operating systems' functions such as creating folders (directories) and moving files around.
These are examples of operating system support for users.
User support is not the objective of this course.
This course addresses operating system support for the second category of customers; namely, the programmers.
Those are people who write code to execute on the computer.
When you write a program, it may have to interact with physical hardware (memory, flash storage, screen, network, etc.).
For example, you may want to get input from a keyboard or mouse, you may want to read some configuration file stored on disk, you may want to output data to a screen or printer, or you may want to access a remote server across a network.
The operating system presents common interfaces for programmers to perform these functions.
The operating system also provides useful abstractions such as "tasks" (also called processes), "threads", and "semaphores".
You can make the computer multitask by calling the operating system interface for creating new tasks or new threads.
You can make these tasks coordinate and synchronize by using operating system semaphores.
You can tell the computer the order in which you want tasks to be executed, which is called a scheduling policy.
Finally, you can manage computer memory by calling the operating system function for memory management.

## Skills Earned
By the end of this course, you should be proficient at writing programs that take full advantage of operating system support.
To be concrete, we need to fix an operating system and we need to choose a programming language for writing programs.
We chose the C language running on a Linux/UNIX operating system (which implements the POSIX standard interface between the programmer and the OS).
This pairing of C and UNIX/Linux is used heavily by software that must provide high performance and low* level control of the program's execution.
Hence, this course introduces you to systems programming via the specific case of C over UNIX.
By the end of the course you should be proficient with this programming environment and should be able to write non* trivial pieces of software from web server code to your own multiplayer Internet games.

## Learning Goals

* Identify the basic components of an operating system, describe their purpose, and explain how they function.
* Write, compile, debug, and execute C programs that correctly use system interfaces provided by UNIX (or a UNIX* like operating system).
* Be familiar with important UNIX system calls and invoke them correctly from within C programs.
* Describe the difference between programs, processes, and threads.
* Explain the meaning and purpose of process control blocks and other mechanisms that the operating system uses to implement the process and thread abstractions.
* Write, compile, debug, and execute C programs that create, manage and terminate processes and threads on UNIX.
* Define concurrency and explain the problems that may arise because of concurrent execution of multiple processes or threads. Explain how these problems can be avoided. Write code that avoids these problems.
* Define semaphores, mutexes, and other synchronization primitives, explain their purpose, and describe their internal implementation.
* Describe possible problems that arise from improper use of synchronization primitives (such as deadlocks) and present their solutions.
* Write, compile, debug, and execute C programs that use UNIX synchronization primitives.
* Describe operating system scheduling and use UNIX interfaces to set and modify scheduling policy parameters.
* Define UNIX signals and signal handlers, and describe their use.
* Write, compile, debug, and execute C programs with processes and threads that interact by invoking and catching signals.
* Describe, configure, and use operating system timers and clocks.
* Describe the concepts of I/O devices, files, directories.
* Explain the internal implementation of files systems and operating system I/O.
* Write, compile, debug, and execute C programs that use files and I/O on UNIX.
* Describe the machine memory hierarchy, describe its components such as caches and virtual memory, and explain memory management mechanisms pertaining to these components such as paging and segmentation.
* Write, compile, debug, and execute C programs that make use of memory management functions.
* Describe the protocols (such as TCP and IP) and interfaces (such as sockets) used for communication among different computers.
* Write distributed applications that communicate across a network.

## Resources

A really useful, accessible introduction to system programming is Angrave's [CS 241 Crowd-Sourced Wikibook](https://github.com/angrave/SystemProgramming/wiki).

Angrave's mini searchable video* introduction and playful _system programming-in-the-browser_ environment is at:  
[cs-education.github.io/sys/](http://cs-education.github.io/sys/) (Firefox and Chrome recommended).

No formal textbook is required but if you really want to buy some books we recommend the following custom book Angrave put together in 2007:

Introduction to Systems Concepts and Systems Programming
University of Illinois Custom Edition
Copyright 2007 by Pearson Custom Publishing
ISBN 0* 536* 48928* 9

## Grading

The following is subject to minor changes:

{% highlight text %}
Final Exam : 25%
Midterm 1  : 10%
Midterm 2  : 10%
M/C Quizzes: 13%

MP Programming Assignments : 25%
Lab Programming Assignments: 13%

Lab Attendance & other items: 4%

Course grades: We publish the following thresholds: 92: A-  82: B-  72: C-   
{% endhighlight %}


If grade results are significantly postponed due to an internal publishing or IT problem, then regrades may be extended to the following day. All lab programming assignments are equally weighted, while the mp programming assignments are weighted by the time we give to complete them. There are multiple choice quizzes at the testing center approximately every other week. There will be two graded programming midterms where you will be asked to create programs similar to the MPs and labs using a standard Linux machine with local tools (gedit,vim,gcc,man,make,bash terminal etc) but in an exam environment. Runnable tests will be provided. The quizzes and midterms will be in room 57 Grainger Library (to the far left side of the basement) and you will be asked to register for a time slot that works for you. The signup link is [here](https://edu.cs.illinois.edu/testcenter/) (Chrome recommended). Rules, requirements and expectations of the testing center are [here](https://edu.cs.illinois.edu/cbtf/). For grading we will drop your lowest quiz score, lowest lab score and 1 lab attendance. Sickness/ vacation / sleep *  whatever *  we don't care. Unless exceptions (which are almost never granted) have been arranged with the course admin (cs241admin@illinois.edu) or Director of Undergrad studies: Miss 3+ sections or 3+ quizzes is automaticaully a failing grade.

The 3 hour handwritten final exam is comprehensive and will test all CS241 topics including programming topics covered in the MP and Labs. Do not book your flights until the exam date is known. Early exams will not be offered. Conflict final exams will be offered if you have 3 exams in a 24 hour period or you have an exam in another, smaller enrollment course at the same time.

Grading issues should be raised with your TA e.g. during section or by email. Missing scores need to be reported on or before the next section.

## Exams
All exams are in the CBTF and require signing up here: <https://edu.cs.illinois.edu/testcenter>

Approximate schedule (subject to change):

|  Week  | Exam             | Start | End |
|--------|------------------|-------|-----|
| Week 4 | Quiz 1           | TBA | TBA |
| Week 5 | Quiz 2           | TBA | TBA |
| Week 6 | Practice Midterm | TBA | TBA |
| Week 7 | Midterm 1        | TBA | TBA |
| Week 8 | Quiz 3           | TBA | TBA |
| Week 11| Quiz 4           | TBA | TBA |
| Week 13| Midterm 2        | TBA | TBA |
| Week 14| Quiz 5           | TBA | TBA |

### Practice Midterm Explanation
The practice midterm is ungraded (worth 0% of your final grade).
Unlike the real midterm there are no unit-tests provided.
This exam will let you practice using `man` from the command line (ex. `man 2 open` will open the documentation on the system call `open`).
Note that the C library calls are in section 3.
This exam will also let you practice using the provided text editors: vim, nano, gedit, etc.
The practice exam is not required, but we highly encourage you to take it.
You will get to practice your CS 241 skills and exam logistics and therefore more likely to succeed on the real midterm. 

## Absences
If your absence is unplanned—if you have a sudden illness or have a sudden death in the family—we will deal with your situation on a case-by-case basis with the course admin (cs241admin@illinois.edu).

For illness-related excuses, you will need a doctor's note of some kind verifying your illness. NO illness-related excuses will be accepted without a dated [Emergency Dean's](http://www.odos.uiuc.edu/contact/) note stating that you contacted the Emergency Dean.

## How to succeed

Is this course hard!? Yes but you are bright and you're taking computer science at UIUC *  just schedule the time to do it right. The two big changes from CS225: One your code is now much smaller than the complexity of the system around it. Secondly, no we will not debug your code for you.

How to fail: Some students do not take the time to learn how to debug and reason about system code and then end up complaining that office hours is too busy before deadlines. If you can't write correct solutions you need to learn _exactly_ how C works, the _details_ of the system calls you are using, learn _better debugging_ skills and _reason_ about synchronization. Only then can you spot and fix mistakes. Hard? Yes. Impossible? No.

There are no short cuts to mastery but we can help you get there. We recommend the Feynman technique to learning. Remember, simply recognizing some text in a past exam or in the wikibook is not mastery of those concepts! Find ways to deeply engage your brain with the ideas by working actively with those ideas. Yes this requires effort. Start the assignments early *  expect to get stuck. Write code _slowly_; reason about every line of code you write. Experiment with your own mind hacks so that you have fun spending 'time on task' with these materials.

## Autograding Policy

You walk into the investor meeting ready to show your demo. You ship your code ready for a million Internet of Things. You deploy your code to the Internet backbone. It had better compile and be functional. Forgot to commit or your committed code that does not compile? Zero. The basic headline is that you're not in Kansas anymore (to quote Dorothy), and have some pride with your work and don't leave it until the last minute. We will test your code on a multi* core machine; testing on your own laptop is insufficient. Don't be surprised if race conditions that go undetected in a different machine cause your code to fail. We encourage you to develop and test your code on your CS241 VM (which is near identical to the grading machine). We will attempt to give you some partial credit if your code passes the tests but for that it is your responsibility to fully read and understand the specification.


## Academic Integrity

CS241 is considered a critical step in your ability to create useful programs for your later classes and beyond. Unfortunately for grading purposes, a minority of students submit code that was created by others. Cheating is taken very seriously in CS 241 and all cases of cheating will be brought to the University, your department, and your college. You should understand how [academic integrity](https://wiki.cites.illinois.edu/wiki/display/undergradProg/Honor+Code) applies to Computer Science courses.

**and**

<span style="color:green">Rule of Thumb</span> *  If at any point you submit an assignment that does not reflect your understanding of the material, then you have probably cheated.

<span style="color:red">EVERY ASSIGNMENT IS A SOLO ASSIGNMENT IN THIS CLASS!</span>. This means you are not allowed to split the work with a partner unlike other 2xx classes. You are however allowed to discuss the assignments at a very high level.

Additionally, you may not publish your solutions or leave them in 'plain view' thereby leaving your programs open to copying, which constitutes cheating. If your code (or a variation of it) is found publicy accesible, then you will receive a letter grade reduction for each assignment. For example, if we find your code on GitHub for one MP then you will receive a letter grade reduction. 2 letter grades for 2 assignments and so on. If you are confused on what it means to be 'publicly accessible', then do not put your code anywhere besides <https://subversion.ews.illinois.edu> and take measures to ensure that nobody can copy your code, so that you are not charged with a violation.

We want you to get the most out your education and cheating not only affects your peers but also you.
