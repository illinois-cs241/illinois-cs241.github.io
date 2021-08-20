---
layout: doc
title: Syllabus
---

# Syllabus

## Formal Course Description

This course is an introduction to System Programming. System Programming refers to writing code that prioritizes operating system support for programmers. A computer needs an operating system to manage its resources and provide support for common functions, such as accessing peripherals. There are two categories of "customers" that an operating system must support.

The first category is the community of users. We have all used computers, and you may recognize operating systems' functions such as creating folders (directories) and moving files around. These are examples of operating system support for users. User support is not the objective of this course.

The second category of users is programmers. This course addresses this category. When you write a program, it may have to interact with physical hardware (memory, flash storage, screen, network, etc.). For example, you may want to get input from a keyboard or mouse; you may want to read some configuration file stored on disk; you may want to output data to a screen or printer; or you may want to access a remote server across a network.

The operating system presents common interfaces for programmers to perform these functions. It also provides useful abstractions such as "tasks" (also called processes), "threads", and "semaphores". You can make the computer multi-task by creating new tasks or new threads. You can make these tasks coordinate and synchronize by using semaphores. You can tell the computer the order in which you want tasks to be executed by using a scheduling policy. Finally, you can manage computer memory by calling on the function for memory management.

## Learning Goals/Skills

* Identify the basic components of an operating system, describe their purpose, and explain how they function.
* Write, compile, debug, and execute C programs that correctly use system interfaces provided by UNIX or a UNIX-like operating system.
* Be familiar with important UNIX system calls and invoke them correctly from within C programs.
* Describe the difference between programs, processes, and threads.
* Write a memory allocator or [malloc]({% link _pages/malloc_hall_of_fame.html %}).
* Explain the meaning and purpose of process control blocks and other mechanisms that the operating system uses to implement the process and thread abstractions.
* Write, compile, debug, and execute C programs that create, manage and terminate processes and threads on UNIX.
* Define concurrency and explain the problems that may arise because of concurrent execution of multiple processes or threads. Explain how these problems can be avoided. Write code that avoids these problems.
* Define semaphores, mutexes, and other synchronization primitives. Also, explain their purpose, and describe their internal implementation.
* Describe possible problems that arise from improper use of synchronization primitives (such as deadlocks) and present their solutions.
* Write, compile, debug, and execute C programs that use UNIX synchronization primitives.
* Describe operating system scheduling and use UNIX interfaces to set and modify scheduling policy parameters.
* Define UNIX signals and signal handlers, and describe their use.
* Write, compile, debug, and execute C programs with processes and threads that interact by invoking and catching signals.
* Describe the concepts of I/O devices, files, directories.
* Explain the internal implementation of files systems and operating system I/O.
* Write, compile, debug, and execute C programs that use files and I/O on UNIX.
* Describe the machine memory hierarchy, describe its components such as caches and virtual memory, and explain memory management mechanisms pertaining to these components such as paging and segmentation.
* Write, compile, debug, and execute C programs that make use of memory management functions.
* Describe the protocols (such as TCP and IP) and interfaces (such as sockets) used for communication among different computers.
* Write distributed applications that communicate across a network.
* Understands and uses system security mechanisms to build secure programs.
* By the end of this course, you should be proficient at writing programs that take full advantage of operating system support.
* Can analyze how a specific security error (e.g. buffer overflow, file access control, page access control) impacts the Confidentiality, Integrity and/or Availability of data or service.
* Can identify multiple development practices (e.g. design reviews, code reviews, testing) as important practices to build secure programs.
* Can briefly describe well-known security case studies (e.g. network protocol implementation errors, CPU side channel attacks) and how they comprise the Confidentiality, Integrity and/or Availability of data or service.

## Grading

The following is subject to minor changes:

```
Final Exam : 25%
Quizzes/CBTF: 15%

MP Programming Assignments : 40%
Lab Programming Assignments: 17%

Lab Attendance & other items: 3%
```

We publish the following thresholds:

|   Points   |  Minimum Grade  |
|------------|-----------------|
| [90 - 100] | A-              |
| [80 - 90)  | B-              |
| [70 - 80)  | C-              |

All lab programming assignments are equally weighted. MP programming assignments are weighted by the time given to complete them. This means that three week MPs are worth triple one week. For grading, we will drop your lowest quiz score, lowest lab score, and two lab attendance grades. Some examples: you slept in late; your dog ate your homework; you destroyed the internet.

<!-- The 3-hour handwritten final exam is comprehensive and will test all CS 241 topics, including programming topics covered in the MP and Labs. Do not book your flights until the exam date is known. Early exams will not be offered. Conflict final exams will be offered if you have three exams in a 24 hour period, or you have an exam in another, smaller enrollment course at the same time. -->

The final is 3 hours and will be online. More details will be published at the end of the semester. Early exams will not be offered. Conflict final exams will be offered if you have three exams in a 24 hour period, or you have an exam in another, smaller enrollment course at the same time.

Grading issues should be raised with your TA during section or by email. Missing scores need to be reported within 3 days of being reported.

### Regrades
At the end of the semester there will be a last chance regrade option for two weeks of machine problem or lab grades. To be able to take advantage of this opportunity you will need to have a perfect attendance grade after the drops. Please note that the score for each regrade will be capped at 90%.

## Exams

The quizzes are approximately every other week. Quizzes include a mix of multiple choice questions and at least one short coding problem. In the coding problem, you will be asked to create programs similar to the MPs and labs using a standard Linux machine with local tools (`gedit`, `vim`, `gcc`, `man`, `make`, `bash`, etc) but in an exam environment. Runnable tests will be provided.

<!-- This course uses the College of Engineering Computer-Based Testing Facility (CBTF) for its quizzes[https://cbtf.engr.illinois.edu/sched/](https://cbtf.engr.illinois.edu/sched/).

The policies of the CBTF are the policies of this course, and academic integrity infractions related to the CBTF are infractions in this course.
-->

Quizzes will be online using [Prairie Learn](https://prairielearn.engr.illinois.edu/). Please see the Quiz topics page for more information.


## Coding Assignments

There are two different types of coding assignments in this course labs and machine problems.

Labs are primarily teaching exercises designed either to prepare you for the machine problems or to allow you to explore a topic of systems in a hands on manner. Labs may be done in a collaborative manner. You are allowed to work with each other so as to learn in the best manner for you. This can include sharing code, debugging each other’s code, and discussing the assignment at any level. You still may not publicly publish either your solutions or our code. Finally you should have a comment block with any students or other resources you used in the completion of your lab assignments. This block will not be used for grading but is needed the same way that citing your sources is required when writing a paper.

Machine Problems are different. While they are a key learning experience MPs are also a key assessment of your skills. These are solo exercises and you must work alone. For MPs, you may not share code in any way. This includes show, share, email, or debug each others code. You may have high level discussions with each other on the ideas in the assignments but that is it. You are responsible for keeping the code for you machine problems private this includes not letting people view your code. You may not publish your code on any open website.

No late submissions will be accepted.

## Autograding Policy

You walk into the investor meeting ready to show your demo. You ship your code ready for a million Internet of things. You deploy your code to the Internet backbone. It had better compile and be functional.

Forgot to commit or your committed code that does not compile? Zero. The basic headline is that you're not in Kansas anymore (to quote Dorothy). Don't leave it until the last minute.

There are two kinds of autograder runs:

 * Pre-deadline runs: **You are responsible for starting these.** Our team has worked really hard to improve our grading system and make it more reliable and flexible. Now, you can schedule your pre-deadline autograder runs using the on-demand grading system, that you can find on the `Assignments` page! You have to log in with your GitHub Enterprise account. Assignments will become visible on the web app as we release them. You will get one AG run a day which you can trigger at your disposal. Please be careful in using these. **These pre-deadline runs do not roll over.** We recommend that you develop and work on your assignments every day to make the best of this system. Once you click "Grade Now", your code will start getting tested on our grading machines. You can expect to see feedback in your CS 241 repository's `_feedback` branch in a few minutes. In rare circumstances, the grading process might fail (if your code made our Docker containers crash). In this scenario, there will be no visible feedback. You should make a private post in the course forum and we will deal with this on a per-student basis. Use these runs for feedback as you work on the assignment. **These have no effect on your grade for the assignment.**
* Deadline runs: These will be triggered by us and the grades you get on these will be counted towards your final grades. The results will show up in the `_feedback` branch as usual.

Labs:
- Released every Wednesday
- Pre-deadline runs: Available every day from Friday to Thursday (you will get to start these!)
- Deadline AG run on Thursday at 11:59 pm

MPs:
- Released on Mondays (for multi-week MPs, the entire assignment is released at once)
- Pre-deadline runs: Available every day from Tuesday to Monday (you will get to start these!)
- Deadline run on Monday at 11:59 pm

We will test your code on a multi-core machine; testing on your own laptop is insufficient. Don't be surprised if race conditions that go undetected on a different machine cause your code to fail. We encourage you to develop and test your code on your CS 241 VM, which is near-identical to the grading machine. We will attempt to give you some partial credit if your code passes the tests.

If you have a question about your personal autograder results after the final autograde run, then feel free to make a private post in the course forum titled "&lt;assignment name&gt; Autograde Question" with the folders/tags/labels `autograder` and `<assignment name>` selected.

* It will take time to go through autograder questions, so please do not expect an immediate (or even same day or same week) response. We will try to answer you as quickly as possible.
* _You must show us your test cases first. If they are not close to exhaustive, we reserve to right to not answer your question._
* We will not tell you the details of specific tests, beyond what the test description already says.
* These questions should be for "I have exhaustive test cases for _X_, so how am I failing _Y_?"
* Please mention your NetID in the post, so we can look up your code if needed.

## Getting Help

It's important to say physically and mentally healthy. Please see the links below for mental health resources.
* Office hours and peer mentoring for course staff will be posted in the forums. Office hours will start the second full week of the semester

## Absences

If you are in an exceptional situation -- i.e. family emergency, sickness, please email ([cs241admin@illinois.edu](mailto:cs241admin@illinois.edu)) and we will deal with your situation on a case-by-case basis via the course admin ([cs241admin@illinois.edu](mailto:cs241admin@illinois.edu)). For illness-related excuses, you will need a doctor's note of some kind verifying your illness. _No_ illness-related excuses will be accepted without a dated [Emergency Dean's](http://odos.illinois.edu/community-of-care/student-assistance-center/) note stating that you contacted the Emergency Dean.

## Academic Integrity

CS 241 is considered a critical step in your ability to create useful programs for your later classes and beyond. Unfortunately for grading purposes, a minority of students submit code that was created by others. Cheating is taken very seriously, and all cases of cheating will be brought to the University, your department, and your college. You should understand how [academic integrity](https://wiki.cites.illinois.edu/wiki/display/undergradProg/Honor+Code) applies to Computer Science courses.

__Rule of Thumb:__ If at any point you submit an assignment that does not reflect your understanding of the material, then you have probably cheated.


In the cases of labs, you are allowed to collaborate with others in the class. All you need to do is put your partners netid at the top.
 This can include detailed debugging and code sharing.


__EVERY MACHINE PROBLEM IS A SOLO ASSIGNMENT IN THIS CLASS!__

This means you are not allowed to split the work with a partner.
You are, however, allowed to discuss the assignments at a very high level.
You can even share testing scripts!
If you are found to have shared code work on any machine problem, you will receive a zero on that assignment and a 10% sanction in the course for each infraction where you are found to have used material that is not yours.

You may not publish your solutions or leave them in "plain view", thereby leaving your programs open to copying, which constitutes cheating.
If your code (or a variation of it) is found publicly accessible, then you will receive a letter grade reduction in the class for each infraction.
Do not put your code anywhere besides your private course repository and take measures to ensure that nobody can copy your code, so that you are not charged with a violation.

In the case of quizzes in the CBTF, it is a violation of our course policy to access or provide access to the quiz material outside your registered window.
Cheating at CBTF may also result in immediate failure of the course and further action by the college of engineering.
If you are found to have done so you will receive a zero on the quiz and a 10% sanction in the course.
This includes seeking descriptions of the questions from students who have taken the quiz, as well as any other method that would give you access to the quiz outside your scheduled time.
If there is prep material provided in lecture or on the course forums, you are welcome to share that material freely.

We want you to get the most out your education, and cheating not only affects your peers, but also your level of knowledge and ability.

## Diversity Statement

UIUC is committed to equal opportunity for all persons, regardless of race, ethnicity, religion, sex, gender identity or expression, creed, age, ancestry, national origin, handicap, sexual orientation, political affiliation, marital status, developmental disability, or arrest or conviction record. We value diversity in all of its definitions, including who we are, how we think, and what we do. We cultivate an accessible, inclusive, and equitable culture where everyone can pursue their passions and reach their potential in an intellectually stimulating and respectful environment. We will continue to create an inclusive campus culture where different perspectives are respected and individuals feel valued.

## Mental Health Statement

Diminished mental health, including significant stress, mood changes, excessive worry, substance/alcohol abuse, or problems with eating and/or sleeping can interfere with optimal academic performance, social development, and emotional wellbeing. The University of Illinois offers a variety of confidential services including individual and group counseling, crisis intervention, psychiatric services, and specialized screenings at no additional cost. If you or someone you know experiences any of the above mental health concerns, it is strongly encouraged to contact or visit any of the University’s resources provided below. Getting help is a smart and courageous thing to do -- for yourself and for those who care about you.

[Counseling Center](https://www.counselingcenter.illinois.edu/): <a href="tel:+12173333704">+1 (217) 333-3704</a>, 610 East John Street Champaign, IL 61820

[McKinley Health Center](https://mckinley.illinois.edu/): <a href="tel:+12173332700">+1 (217) 333-2700</a>, 1109 South Lincoln Avenue, Urbana, Illinois 61801
