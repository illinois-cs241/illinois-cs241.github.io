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
* Email the GA (cs341admin@illinois.edu) if you need an exemption for lab attendance.

## Different Lab Sections

* Due to seating limitations, you are required to go to the lab section you signed up for.
* Labs will be in-person.
* If you need to miss a lab, you may be able to switch labs to make up the attendance. 
	* You must email the TA in charge of your assigned lab and the TA for the lab to which you are going.
* There will be no attendance taken for week 1.


## Virtual Machines

## What are they?

* A virtual machine is simply a computer that is running on top of another computer via an emulation system. For example, you may run a Linux virtual machine on top of your Windows installation using a software like Virtualbox, which allows you to use a virtualized version of Linux "inside" of the Windows OS. 
* In this class, you will be assigned a Linux (Ubuntu) virtual machine that has all the prerequisite software for compiling and running the assignments.

<vertical />

```bash
ssh **NETID**@fa23-cs341-**xxx**.cs.illinois.edu
```
where `xxx` is the VM number assigned to you.

## VM Use

We will only help you with your assignments on your VM. We will not debug code running elsewhere.

## Note

You are going to need to be on the campus network to be able to access your VM. If you want to make it work at home, make sure to log in to the campus VPN first before ssh'ing. See the [development guide](http://cs341.cs.illinois.edu/tutorials/development) for details.

## Late Adds

If enrolled in the class recently, you should be getting an email soon about accessing your VM. Everyone else should already have received an email with their VM's details.

<horizontal />

## Utilities

## What is ssh?

SSH is short for secure shell (secure sh). SSH is a network protocol that leverages public key cryptography in order to connect to another computer. You may have used SSH in other classes to connect to EWS.

## What is sudo?

All of you have probably heard of sudo before - it is short for super-user do, and lets you execute any command as root. You have that ability on your VM. Be careful: there is no way to faster crash your VM that throwing sudo around. VMs can only be rebooted or re-imaged by staff.

## What is git?

`git` is a version control system. That means it keeps track of changes in code, allows you to group changes into a commit, and provides tools to manipulate commits.

<horizontal />

## C Questions

## Question 1

```C
int a = 0;
size_t a_size = sizeof(a++);
printf("size: %zu, a: %d\n", a_size, a);
```

## Question 2

```C
#define swap(a, b) temp = a; \
    a = b; \
    b = temp;

void selection_sort(int* a, size_t len){
    size_t temp = len - 1;
    for(size_t i = 0; i < temp; ++i){
        size_t min_index = i;
        for(size_t j = i+1; j < len; ++i){
			if(a[j] < a[i]) min_index = j;
        }
        if(i != min_index)
			swap(a[i], a[min_index]);
    }
}
```

## Question 3

```C
short mystery_bits(short input){
	short max_set = ~0;
	short masked = input & (0xFF00 ^ max_set);
	short shifted = masked << 8;
	short ret = (shifted | 0xCC);
	return ret;
}
```

## Question 4

```C
void positive_under_ten(int input){
	if(0 < input < 10){
		printf("Input is in the range\n");
	}else{
		printf("Input is not in the range\n");
	}
}
```

## Question 5

```C
int print_error(int err_num){
	switch(err_num){
	case ENOENT:
		printf("No such file or entry\n");
	case EINTR:
		printf("Interrupted\n");
	default:
		break;
	}
}
```

<horizontal />

## Debugging

## Valgrind

Valgrind is a framework for building program analysis tools. The most popular Valgrind tool is memcheck, which detects memory leaks. You will use Valgrind very often in CS 341, and the autograder will run Valgrind against your code to check for memory leaks.

## Usage
Given a program `myprog arg1 arg2`:

`valgrind --leak-check=yes myprog arg1 arg2`

## Leak Types

1. _Memory block_: A block of allocated, not-freed memory
2. _Definitely lost_: A memory block wasn't freed, and no pointers point to it.
3. _Still reachable_: A memory block wasn't freed, but there are pointers to it still left.
4. _Indirectly lost_: A memory block wasn't freed that contained pointers to other memory blocks.
5. _Possibly lost_: A memory block wasn't freed, and the pointer to it still exists but was moved (e.g. array)

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
* `watch (type *)0xADDRESS`: Watches an address for a read or write and tells you when it has changed -- useful for when you don't know where the bug is.
* `backtrace`, `bt` to see what functions you are in
* `up`, `down` goes up and down a stack frame

## Navigation

* `print` prints a variable (aliased `p`). You can use `p/x` to print in hex.
* `next` executes the line and goes to the next line, runs functions without stopping.
* `finish` finishes the function and breaks.
* `step` executes the line and goes to the next line. If there is a function, gdb steps into the function.
