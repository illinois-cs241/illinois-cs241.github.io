---
layout: doc
title: "Know Your Tools"
submissions:
- title: HW0
  due_date: 9/1 11:59 PM
- title: Lab Assignment
  due_date: 9/6 11:59 PM
  graded_files:
  - read_wrap.c
  - secure_move.c
  - shred.c
learning_objectives:
  - Getting familiar with the tools needed for CS 241!
wikibook:
  - "HW0"
  - "System Programming Jokes"
---

## Introduction

Your lab TA will do a brief intro to get you accustomed to the lab.

## HW0

You have already been assigned a [HW0](https://goo.gl/forms/ceDM7n4nJ5qK9L8m2) for this class. The lab instructors will go around to make sure that you have made progress on this assignment. HW0 is due Friday, September 1, at 11:59 PM. If you finish the lab early, we recommend sticking around and getting help from the lab assistants.

Your grade for this lab is partly HW0 and partly the assignment below.

## Development

Read the [Development Guide](./development.html)!

## SVN

You will be using SVN to submit all your assignments in this course.

**Once you are in your VM**, please checkout your SVN repo with the following command

```console
svn co https://subversion.ews.illinois.edu/svn/{{site.semester}}-{{site.subject_code}}{{site.course_number}}/YOUR-NETID {{site.subject_code}}{{site.course_number}}
```

which will check out your entire SVN repo into a folder called '{{site.subject_code}}{{site.course_number}}' into your current directory. Now change your directory into the 'cs241' folder:

```console
cd {{site.subject_code}}{{site.course_number}}
```

## The Problem

You are working for ShadyCorp, Inc. Your boss commissioned your coworker to write a program. The program reads a file, overwrites it multiple times so that it is harder to recover on the hard disk, then encrypts the file, then writes it once to an output file.

But the head of ShadyCorp is lazy, so they want more features. They want the first five lines of the file and the last five lines of the file to be copied to the beginning. They also want the file to be wrapped to be more easily read on mobile devices. Lines should be at most 80 characters (not including the newline). If a line is longer than 80 characters, then it should be split into two or more lines, where all the but the last line has 80 characters (not including the newline). Your co-worker sighs and comes up with the following game plan.

1. Read the entire file from disk
2. Wrap the lines to 80 characters max
3. Do the rewrite and make sure the file is mangled
4. Find the first five and the last five lines and copy them in the front of the string
5. Write it to an output file

Usage:

```console
$ ./secure_move -h
Usage:

	./secure_move: <path> <destination>

./secure_move takes a file located at <path>, copies the file into memory
then wraps the file to 80 characters maximum and
overwrites the file 3 times to prevent recovery.
Then it writes to the file at <desination> the following
	- The first five lines (after wrapping)
	- A newline
	- The last five lines (after wrapping)
	- A newline
	- The rest of the file

```

But your boss at ShadyCorp is _very_ paranoid. To test that his program, he wrote a test suite himself. Your co-worker went home sick that day. Now, he hasn't been heard from in two weeks; you don't ask any questions. The Boss sent you an email to fix the code that your co-worker gave you. Since you are the Boss' cousin, he gives you the test cases that you failed and promises to run the test cases every day (your mom is _very_ convincing).

But, he imposed a penalty. You are currently passing 5/7 test cases, but you won't get any points for those because your co-worker wrote those tests. You are failing two test cases. If you get those test cases to pass, you get full points for this lab and keep your job at ShadyCorp. If you mess any test cases that you were passing before, you will lose one point. The boss assures that the code is well sectioned so you won't have to even _look_ at the files that aren't related to the test case.

The output of the file should be:

```C
<first 5 lines>
<newline>
<last 5 lines>
<newline>
<rest of file><newline>
```

Where `newline = '\n'`.
A line is defined as zero or more characters terminated by a newline character.

## Debugging Guide

Read [this](./debugging.html) to get started with debugging!

## Manual Testing

In the end, your boss was nice enough to give you some test cases. In `files/`, there are a few files that your boss will use to test the program with. One is `files/blank.txt`, which you can use to test blank input. Another is `files/final.txt`, which is full of secret business-y type stuff. In order to run a test case, try the following commands:

```console
$ make reset # Make sure to do this before test cases
$ make
$ ./secure_move files/final.txt files/final_out.txt
$ diff files/final_out.txt files/final_sol.txt
$ # If diff has nothing to complain about you are good!
$ # You may want to make sure files/final.txt is overwritten though...
```


## CS 241 Makefile

All the assignments in this class will use a similar makefile.

**Note: This is not a class about makefile programming, so you will not need to know the advanced parts of makefiles (pattern matching, expansion phases, etc). Still, it is important that you know a little bit about how they work for a future assignment.**

Here is what a typical makefile will look like:

```make
# directory to store object files
OBJS_DIR = .objs

# define the EXES
EXE_SHELL=shell
EXES_STUDENT=$(EXE_SHELL)

OBJS_SHELL=$(EXE_SHELL).o format.o

# set up compiler
CC = clang
INCLUDES=-I./includes/
WARNINGS = -Wall -Wextra -Werror -Wno-error=unused-parameter
CFLAGS_DEBUG   = -O0 $(INCLUDES) $(WARNINGS) -g -std=c99 -c -MMD -MP -D_GNU_SOURCE -DDEBUG
CFLAGS_RELEASE = -O2 $(INCLUDES) $(WARNINGS) -g -std=c99 -c -MMD -MP -D_GNU_SOURCE

# set up linker
LD = clang
LDFLAGS = -Llibs/ -lprovided

.PHONY: all
all: release

# build types
# run clean before building debug so that all of the release executables
# disappear
.PHONY: release
.PHONY: debug

release: $(EXES_STUDENT)
debug: clean $(EXES_STUDENT:%=%-debug)

# include dependencies
-include $(OBJS_DIR)/*.d

$(OBJS_DIR):
@mkdir -p $(OBJS_DIR)

# patterns to create objects
# keep the debug and release postfix for object files so that we can always
# separate them correctly
$(OBJS_DIR)/%-debug.o: %.c | $(OBJS_DIR)
$(CC) $(CFLAGS_DEBUG) $< -o $@

$(OBJS_DIR)/%-release.o: %.c | $(OBJS_DIR)
$(CC) $(CFLAGS_RELEASE) $< -o $@

# exes
$(EXE_SHELL)-debug: $(OBJS_SHELL:%.o=$(OBJS_DIR)/%-debug.o)
$(LD) $^ $(LDFLAGS) -o $@

$(EXE_SHELL): $(OBJS_SHELL:%.o=$(OBJS_DIR)/%-release.o)
$(LD) $^ $(LDFLAGS) -o $@

.PHONY: clean
clean:
rm -rf .objs $(EXES_STUDENT) $(EXES_STUDENT:%=%-debug)

```

This looks scary, but if you Google some makefile basics and carefully read the comments it should start to make sense. These are the things you will need to know, at the minimum:


* Compile the assignment:

```console
make
```

* Clean up the assignment directory:

```console
make clean
```

* Compile a debug-able version of your code that you can use gdb on:

```console
make debug
```

* Compile a release version of your assignment that you test with:

```console
make release
```

## The Outline

* Log into your VM
* Clone your SVN repository on your VM
* Check the grade report in subversion and see what test cases you failed
* _Fix the code using the test cases_
	* Look through the code in the files!
	* Use `printf`'s!
    * Use valgrind!
    * Use GDB!
    * Run on the given files and see if the output is what you expect.
* `svn ci -m "My Submission"` (commit your work to subversion).


## Lab Attendance

Part of your grade in this class relies on you attending labs. Towards the end of every lab, we will ask you to swipe out (swipe your i-card). You may only leave early if you show that you have finished the lab to your lab attendant or if the lab attendant calls time. If you are more than ten minutes late to class, then your lab attendant reserves the right to not swipe you out for the day. You may never swipe yourself out without your lab attendant's consent (any violation will result in a zero in lab attendance for the semester).

Due to seating limitations, you are required to go to the lab section you signed up for. If you wish to go to any other lab section, you may get permission from the TA of another section to go to their section, provided that:

* you will be working on your laptop in the room, or
* there is seating available where registered students get priority.

You must email the TA of that lab section beforehand.

You can still get credit for attending a different section due to special or occasional circumstances by making arrangements with the graduate assistant (GA) at [cs241admin@illinois.edu](mailto:cs241admin@illinois.edu). However, you must change your registered lab if you start regularly going to a different lab. Please contact Holly Bagwell in the academic office (SC 1210) to change your section without having to drop your enrollment.

We will never grant exemptions for lab attendance (if you have an interview, then you are just going to have to use your lab attendance drop). You also can _not_ make up lab attendance. Be warned that forgetting to swipe out is not a valid excuse—your lab attendant is not allowed to vouch for your attendance.
