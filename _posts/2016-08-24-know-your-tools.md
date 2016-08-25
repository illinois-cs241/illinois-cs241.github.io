---
layout: doc
title: "Know Your Tools"
permalink: know_your_tools
dueDates: "08/31 11:59pm"
---

## Introduction

*   Please introduce yourself (lab assistants should go first) to the rest of your class.
*   Tell everyone your name, grade, and one interesting fact about yourself.

## VMs

In this course we are using the VMs for all our development so it is important that you learn how to use them. Note: That this VM is part of the CS Cloud and we will not support any other machine for grading. This means that you should test on this VM and and not any other machine (this includes the CS2XX VM you received in CS 225, EWS, and your local machine). This is to your benefit, since the grading VM is identical to your VM. Please ssh or FastX into your VM. I have provided the ip in your svn repo. If you want to ssh in and your netid is 'bschong2' and your hostname is 'fa16-cs241-000.cs.illinois.edu', then all you need to do is enter

{% highlight bash %}
ssh bschong2@fa16-cs241-000.cs.illinois.edu
{% endhighlight %}

into your terminal. If you want a GUI, then you should use FastX and follow these [instructions](https://it.engineering.illinois.edu/user-guides/remote-access/connecting-ews-linux-fastx) or add the -Y flag. We also have this nice, [Developing in 241 guide](./#developing) to solve your problems and (hopefully) make getting started in setting up your dev environment much easier.

## SVN

In this course we are using SVN to submit all our assignments

**Once you are in your VM** please checkout your svn repo with the following command

{% highlight bash %}
svn co https://subversion.ews.illinois.edu/svn/fa16-cs241/YOUR-NETID cs241
{% endhighlight %}

which will check out your entire SVN repo into a folder called 'cs241' into your current directory. Now change your directory into the 'cs241' folder

{% highlight bash %}
cd cs241
{% endhighlight %}

and create a 'know_your_tools' folder

{% highlight bash %}
mkdir know_your_tools
{% endhighlight %}

Now check the status of your repo

{% highlight bash %}
svn status
{% endhighlight %}

and notice that you now have a 'know_your_tools' folder that needs to be added. Add the 'know_your_tools' folder to svn

{% highlight bash %}
svn add know_your_tools
{% endhighlight %}

and commit it

{% highlight bash %}
svn ci -m "adding the know_your_tools folder"
{% endhighlight %}

This is just the bare minimum you might need to know when using SVN. We recommend that you refer to the [SVN Bible](http://svnbook.red-bean.com/en/1.7/) if you ever have a problem. It is always good to learn the ins and outs of a version control system, since it makes it easier to pick them up when you are working in industry.


## Valgrind + GDB + Clang

In this course you will need to know how to use Valgrind + GDB + Clang

**Once you are in your VM** please create a file called 'dumb.c' in your 'know_your_tools' directory that you just made. Now write a valid C program in 'dumb.c' that will segfault. Now compile with clang

{% highlight bash %}
clang dumb.c -o dumb -g
{% endhighlight %}

Run it to make sure it segfaults

{% highlight bash %}
./dumb
{% endhighlight %}

Run valgrind to see what line it segfaults on

{% highlight bash %}
valgrind ./dumb
{% endhighlight %}

Run gdb to see what line it segfaults on

{% highlight bash %}
gdb ./dumb
run
backtrace
{% endhighlight %}

Then exit gdb

{% highlight bash %}
quit
{% endhighlight %}

Now commit 'dumb.c' to your 'know_your_tools' folder on svn (I leave this as an exercise to the reader).

These are just the most basic things that you can do with the tools. We highly recommend that you read tutorials on these tools to effectively use them through out this course. Here are just a couple of promising looking links:

* [Valgrind](http://valgrind.org/docs/manual/QuickStart.html)
* [GDB](https://www.cs.umd.edu/~srhuang/teaching/cmsc212/gdb-tutorial-handout.pdf)
* [Clang](http://clang.llvm.org/get_started.html)

## CS 241 Makefile

All the assignments in this class will use a similar makefile. 

Here is what a typical makefile will look like:

{% highlight make %}
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

{% endhighlight %}

This looks scary, but if you google some makefile basics and carefully read the comments it should mostly make sense. However these are the things you will need to know at the minimum:


{% highlight bash %}
make
{% endhighlight %}

Will compile the assignment

{% highlight bash %}
make clean
{% endhighlight %}

Will clean up the assignment directory

{% highlight bash %}
make debug
{% endhighlight %}

Will compile a debugable version of your code that you can use gdb on

{% highlight bash %}
make release
{% endhighlight %}

Will compile a release version of your assignment that you test with

## Lab Attendance

Part of your grade in this class is to attend labs. Toward the end of every lab we will ask you to swipe out. You may only leave early if you show that you have finished the lab to your lab attendant or if the lab attendant calls the time. If you are late (like more than 10 minutes), then your lab attendant reserves the right to not swipe you for the day. You may never swipe yourself out without your lab attendant's consent (any violation will result in a 0 in lab attendance for the semester). Also, you must attend the lab section you have been assigned to unless you have an exemption from our GA (cs241admin@illinois.edu) or follow the stated policy for the semester. We will never grant exemptions for lab attendance (if you have an interview, then you are just going to have to use your drop). You also can not make up lab attendance. Attendance grades will be uploaded to [Chara](https://chara.cs.illinois.edu/gb) every Friday 11:59pm. You have until Friday 11:59pm of the next week to refute attendance grades. Note that forgetting to swipe out is not a valid excuse (your lab attendant is not allowed to vouch for your attendance).


## HW0

You have already been assigned a [HW0](https://goo.gl/forms/OrbWzXAdfNRfToZD2) for this class. The lab instructors will go around to make sure that you have made progress on this assignment. HW0 is due with the rest of the lab. If you finish the lab early we recommend sticking around and getting help from the lab assistants.
