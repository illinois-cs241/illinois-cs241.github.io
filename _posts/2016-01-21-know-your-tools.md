---
layout: doc
title: "Know Your Tools"
permalink: Know Your Tools
---

## Introduction

*   Please introduce yourself (lab assistants should go first) to the rest of your class.
*   Tell everyone your name, grade, and one interesting fact about yourself.

## VMs

In this course we are using the VMs for all our development so it is important that you learn how to use them. Note: That this VM is part of the CS Cloud and we will not support any other machine for grading. This means that you should test on this VM and and not any other machine (this includes the CS2XX VM you received in CS 225, EWS, and your local machine). This is to your benefit, since the grading VM is identical to your VM. Please ssh or FastX into your VM. I have provided the ip in your svn repo. If you want to ssh in and your netid is 'bschong2' and your hostname is 'sp16-cs241-000.cs.illinois.edu', then all you need to do is enter

<pre class="terminal">ssh bschong2@sp16-cs241-000.cs.illinois.edu</pre>

into your terminal. If you want a GUI, then you should use FastX and follow these [instructions](https://it.engineering.illinois.edu/user-guides/remote-access/connecting-ews-linux-fastx) or add the -Y flag. We also have this nice, [Developing in 241 guide](./#developing) to solve your problems and (hopefully) make getting started in setting up your dev environment much easier.

## SVN

In this course we are using SVN to submit all our assignments

**Once you are in your VM** please checkout your svn repo with the following command

<pre class="terminal">svn co https://subversion.ews.illinois.edu/svn/sp16-cs241/YOUR-NETID cs241</pre>

which will check out your entire SVN repo into a folder called 'cs241' into your current directory. Now change your directory into the 'cs241' folder

<pre class="terminal">cd cs241</pre>

and create a 'know_your_tools' folder

<pre class="terminal">mkdir know_your_tools</pre>

Now check the status of your repo

<pre class="terminal">svn status</pre>

and notice that you now have a 'know_your_tools' folder that needs to be added. Add the 'know_your_tools' folder to svn

<pre class="terminal">svn add know_your_tools</pre>

and commit it

<pre class="terminal">svn ci -m "adding the know_your_tools folder"</pre>


## Valgrind + GDB + Clang

In this course you will need to know how to use Valgrind + GDB + Clang

**Once you are in your VM** please create a file called 'dumb.c' in your know_your_tools directory that you just made. Now write a valid C program in 'dumb.c' that will segfault. Now compile with clang

<pre class="terminal">clang dumb.c -o dumb -g</pre>

Run it to make sure it segfaults

<pre class="terminal">./dumb</pre>

Run valgrind to see what line it segfaults on

<pre class="terminal"> valgrind ./dumb</pre>

Run gdb to see what line it segfaults on

<pre class="terminal">gdb ./dumb
run
backtrace
</pre>

Then exit gdb

<pre class="terminal">quit</pre>

Now commit 'dumb.c' to your know_your_tools folder on svn (I leave this as an exercise to the reader).</div>

## Lab Attendance

Part of your grade in this class is to attend labs. Toward the end of every lab we will ask you to swipe out. You may only leave early if you show that you have finished the lab to your lab attendant or if the lab attendant calls the time. If you are late (like more than 10 minutes), then your lab attendant reserves the right to not swipe you for the day. You may never swipe yourself out without your lab attendant's consent (any violation will result in a 0 in lab attendance for the semester). Also, you must attend the lab section you have been assigned to unless you have an exemption from our GA (cs241admin@illinois.edu). We will never grant exemptions for lab attendance (if you have an interview, then you are just going to have to use your drop). You also can not make up lab attendance. Attendance grades will be uploaded to [Chara](https://chara.cs.illinois.edu/gb) every Friday 11:59pm. You have until Friday 11:59pm of the next week to refute attendance grades. Note that forgetting to swipe out is not a valid excuse (your lab attendant is not allowed to vouch for your attendance).


## HW0

You have already been assigned a [HW0](https://github.com/angrave/SystemProgramming/wiki/HW0) for this class. The lab instructors will go around to make sure that you have made progress on this assignment. For your final submission you must submit a pdf called "hw0.pdf" in your "know_your_tools" folder. This is due with the rest of this lab. If you finish the lab early we recommend sticking around and getting help from the lab assistants.
