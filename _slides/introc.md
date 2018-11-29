---
layout: slide
title: "Welcome to CS 241"
sup_title: "Lab 1 - Know Your Tools"
authors: "Steve & Bhuvan"
---

## What's Lab Gonna Be Like?

## Rules

* Most labs will begin with a worksheet
* 15-20 minutes in, your TA may go over it with the class
* You should work on your lab assignment for the rest of class time
* You get credit by making an honest effort on the worksheet
* Email the GA (cs241admin@illinois.edu) if you need an exemption

## Lab Attendance

* Ten Minute Rule: if you aren't here in the first ten minutes of class, you don't get credit
* Part of your grade in this class relies on you attending labs. Near the end of every lab, we will ask you to swipe out. You may only leave early if you show us that you have finished the lab, or if the lab attendant calls the time.

## Different Lab Sections

* Due to seating limitations, you are required to go to the lab section you signed up for
* If you wish to go to any other lab section, you may get permission from the TA of another section to go to their section, provided:
    * you will be working on your laptop in the room, or
    * there is seating available where registered students get priority.

<vertical />

You must email the TA in charge of your assigned lab and the TA for the lab to which you are going.

<horizontal />

## Virtual Machines

## What is it?

A virtual machine is simply a computer that is running ontop of another computer emulation system. The computer emulation underneath can be an operating system like Ubuntu that has an application like VmWare workstation to emulate the VM. 

## Bare Metal

You can also have what is called a bare-metal VM where you install a minimum set of instructions needed to get the VM up and running. The second option has the added benefit that you can spawn multiple VMs on the same physical device with low operating system overhead.

<vertical />

```bash
ssh **NETID**@sp18-cs241-**xxx**.cs.illinois.edu
```

## VM Use

We will only help you with your assignments on your VM, all other platforms are unsupported. You have been warned.

## Note

You are going to need to be on the campus network for this to work. If you want to make it work at home, make sure to log in to the campus VPN first before ssh'ing. See the development guide for details.

## Late Adds

If you added in the past 24 hours you should be getting an email soon about your VM from there you can get working. If you cannot find the assignments, they are available in the release folder:

```
https://github-dev.cs.illinois.edu/{{ site.semester }}-cs241/_release/
```

<horizontal />

## Utils

<vertical />

## What is ssh

SSH is short for secure shell (secure sh). SSH is a network protocol that leverages public key cryptography in order to connect to another computer. In the basic version, two key pairs are generated for communication. In the more advanced cases, the keys are only used for another key exchange.

## What is sudo

All of you have probably heard of sudo before. It is short for super-user do. This lets you execute any command as root. You have that ability on your VM. Be careful. There is no way to faster crash your VM that throwing sudo around.

## What is git

`git` is a version control system that means that it keep track of changes in code and whenever you commit, it pushes said changes

<horizontal />

## Sample Questions

<vertical />

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
	short shifted = masked << 16;
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

## Today's lab: Debugging

## Valgrind!

1. A suite providing several tools.
2. Memcheck is the most popular one.
3. Memcheck detects memory-leak.

## Usage
Given a program test arg1 arg2.
`valgrind --leak-check=type command`
`type = <no|summary|yes|full>`
`valgrind --show-leak-kinds=all ...`

## Leak Types

1. _Memory block_: A block of allocated, not-freed memory
2. _Definitely lost_: No pointer to a memory block
3. _Still reachable_: Live pointer to a memory block (not freed)
4. _Indirectly lost_: Memory blocks pointing to a memory block is lost
5. _Possibly lost_: Have a (moved) pointer pointing to a memory block

<horizontal />

## GDB

## A lot of you are afraid – don't be!

## Commands intro

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

## Demo! (maybe)
