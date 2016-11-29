---
layout: doc
title: "Ideal Indirection"
permalink: ideal_indirection
submissions:
- title: Entire Assignment
  due_date: 10/19 11:59pm
  graded_files:
  - mmu.c
---

## Learning Objectives

* Virtual memory
* The virtual address translation process
*   Memory Management Unit (MMU)
*   Page Tables
*   Translation Lookaside Buffer (TLB)

## Required Reading

Read this in the wikibook before starting the lab.

* [Introduction to Virtual Memory](https://github.com/angrave/SystemProgramming/wiki/Virtual-Memory%2C-Part-1%3A-Introduction-to-Virtual-Memory)

## Overview

This lab simulates the behavior of virtual memory for multiple processes. Before getting started, we highly recommend that you have read the wikibook and answer the [Google Form](http://goo.gl/forms/4Us4vBPJnj). Next, please read through the provided code as many files have comments on usage that you will find useful. There are a few different files in this lab that each represent a different component important to virtual memory. Reading through these files can start to help one understand the roles of the different hardware and software involved with virtual memory.

You will only have to write one function in `mmu.c`, but it requires a good understand of the wikibook and decent knowledge of the rest of the provided code.

Good luck!


## MMU.c

This is the function you are to complete in `mmu.c`:

{% highlight c %}
void *MMU_get_physical_address(MMU *mmu, void *virtual_address, size_t pid)
{% endhighlight %}

This should convert a virtual address to a physical address from a three level page table.

mmu here is a pointer to the MMU struct defined in `mmu.h`, virtual_address is the virtual address you are transforming into a physical address, and pid is the ID of this process. You can assume that the pid will always have its first page created.

From the wikibook: "For most memory accesses of most programs, there is a significant chance that the TLB has cached the results... the TLB [may] not have the result cached and the MMU must use the much slower page table to determine the physical frame."

Thus for any virtual address, you should check whether the result has been already cached in the TLB (see `tlb.h`). Otherwise you must search the page tables.

Virtual addresses use 64 bits with only 51 bits used for the actual virtual address as you can see from the diagram below. MISC is not counted as part of the virtual address here. Make sure to remove these unused bits when storing it in the TLB. In this simulation, the virtual address is broken up as follows for a three level page table.

{% highlight text %}
|-------------|------------|------------|------------|---------------|
    MISC (13)   VPN1 (12)     VPN2 (12)    VPN3 (12)     Offset (15)
{% endhighlight %}

Using PageTable_get_entry() (see `pagetable.h`) will allow you to traverse through the page table using the VPNx addresses. Consider what should be done if the page table or frame we are trying to access has not yet been created.

For the pid, when a new pid tries to access the tlb, what do you think should happen? Think about the security risks!

Be sure to read all of the functions within `mmu.h`, paying close attention to the comments to see the circumstances in which these functions should be called.

NOTE: You must use the `PageTable_get_entry` and `PageTable_set_entry` functions rather than directly accessing the `PageTable` struct. The same goes for the MMU with modifying the `num_tlb_misses` and `num_page_faults`. These should be done using the provided functions.


## Running the simulator

You can run the simulator with the following command (see `simulator.c`): 

{% highlight bash %}
./simulator <num_processes> <num_addresses> <num_iterations> <random seed>
{% endhighlight %}

## Testing

*   Make sure you throughly test your code as usual. We have provided some tests cases, but we encourage you to write your own as well. Use the provided test cases as a reference to learn to create tests with good coverage.
