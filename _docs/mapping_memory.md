---
layout: doc
title: "Mapping Memory"
submissions:
- title: Entire Assignment
  due_date: 10/Something 11:59pm
  graded_files:
  - mmu.c
learning_objectives:
  - Memory Mapped Files
  - File Streams 
  - Virtual Memory
wikibook:
  - "File System, Part 6: Memory mapped files and Shared memory"
---
## Required Reading

Read this in the wikibook before starting the lab.

* [Introduction to Virtual Memory](https://github.com/angrave/SystemProgramming/wiki/Virtual-Memory%2C-Part-1%3A-Introduction-to-Virtual-Memory)

## Overview

In this lab you will be implementing mmap! Note that what you will implement in this lab has a slightly different interface than the system call mmap. The basic concepts however, are the same. This lab will build off of the mmu you implemented back in `Ideal Indirection`. We have provided all of the mmu functionality. Before starting you should go through all the provided files and make sure that you understand what functions are available to you.

You do not need to worry about two processes reading from the same mmap file.

You will only have to write code in `mmap.c`. The functions you need to implement are detailed below. 

Good luck!


## mmap_create

Creates a new mmap object. This involves setting all fields of the `mmap` struct defined in `mmap.h` and reproduced below.

```c
typedef struct {
    mmu *mmu;
    FILE *stream;
    size_t length;
    uintptr_t start_address;
} mmap;

```

You will need to create a new mmu struct (check `mmu.h` for functions that do this!) and make sure you add the process with pid `DEFAULT_PID` defined in `mmap.h`. You will also need to create a segment corresponding to the `segment` type MMAP. It is your job to find out how many pages are needed for this segment. 

## mmap_read 

Read from the mmap'd file into a buffer provided by the user. You will need to use the mmu to perform translations from virtual memory into physical addresses. 

## mmap_write
 
Same as mmap_read, but with writes instead of reads.

##munmap

Cleanup and destroy the mmap object. Remember that you need to copy dirty pages back to the file on disk. Be sure to close the file stream and free all memory allocated here. 

## Testing

*   Make sure you throughly test your code as usual. We have provided some tests cases, but we encourage you to write your own as well. Use the provided test cases as a reference to learn to create tests with good coverage.
