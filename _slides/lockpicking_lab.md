---
layout: slide
title: "Welcome to CS 341"
---

## What's Lab Gonna Be Like?

## Rules

* Labs will begin with slides followed by a worksheet/Kahoot-style quiz.
* You should work on your lab assignment for the rest of class time.

## Lab Attendance

* Ten minute rule: if you aren't here in the first ten minutes of class, you don't get credit.
* Your total attendance grade will be credited towards the final exam, up to 3%.
* Near the end of every lab, we will ask you to swipe out. You may only leave early if you show us that you have finished the lab.
* Email the GA (cs341admin@cs.illinois.edu) if you need an exemption for lab attendance.

## Different Lab Sections

* Due to seating limitations, you are required to go to the lab section you signed up for.
* Labs will be in-person.
* If you need to miss a lab, you may be able to switch labs to make up the attendance. 
	* You must email the TA in charge of your assigned lab and the TA for the lab to which you are going.
* There will be no attendance taken for week 1.

<horizontal />

## Utilities

## Virtual Machines

## What are they?

* A computer running on top of another computer via an emulation system. 
* Ex) running a Linux virtual machine on top of a Windows OS using a software like Virtualbox, which creates a virtualized version of Linux "inside" of the Windows OS. 
* In this class, you will be assigned a Linux (Ubuntu) virtual machine that has all the prerequisite software for compiling and running the assignments.

<vertical />

```C
ssh <NETID>@sp25-cs341-<xxx>.cs.illinois.edu
```
where `xxx` is the VM number assigned to you.

## VM Use

We will only help you with your assignments on your VM. We will not debug code running elsewhere.

## Note

You are going to need to be on the campus network to be able to access your VM. If you want to make it work at home, make sure to log in to the campus VPN first before ssh'ing. See the [development guide](http://cs341.cs.illinois.edu/tutorials/development) for details.

## Late Adds

If enrolled in the class recently, you should be getting an email soon about accessing your VM. Everyone else should already have received an email with their VM's details.

## What is ssh?

SSH is short for secure shell (secure sh). SSH is a network protocol that leverages public key cryptography in order to connect to another computer. You may have used SSH in other classes to connect to EWS.

## What is sudo?

All of you have probably heard of sudo before - it is short for super-user do, and lets you execute any command as root. You have that ability on your VM. Be careful: there is no way to faster crash your VM that throwing sudo around. VMs can only be rebooted or re-imaged by staff.

## What is git?

`git` is a version control system. That means it keeps track of changes in code, allows you to group changes into a commit, and provides tools to manipulate commits.

<horizontal />

## GDB

## A lot of you are afraid – don't be!

## What is GDB?

* GDB is a program that allows you to see "inside" a program as it executes.
* From the [GDB site](https://www.gnu.org/software/gdb/), GDB helps you catch bugs by enabled you to:
	* Start your program, specifying anything that might affect its behavior.
	* Make your program stop on specified conditions.
	* Examine what has happened, when your program has stopped.
	* Change things within in your program

## GDB Commands

* `layout src` gives you a text-based GUI
* `break <file:line|function> [if condition]`: You can make powerful breakpoints by giving a line, but only under certain circumstances.
* `watch (type *)0xADDRESS`: Watches an address for a read or write and tells you when it has changed -- useful for locating bugs.
* `backtrace`, `bt` to see what functions you are in
* `up`, `down` goes up and down a stack frame

## Navigation

* `print` prints a variable (aliased `p`). You can use `p/x` to print in hex.
* `next` executes the line and goes to the next line, runs functions without stopping.
* `finish` finishes the function and breaks.
* `step` executes the line and goes to the next line. If there is a function, gdb steps into the function.
* `continue` resumes execution of your program.
