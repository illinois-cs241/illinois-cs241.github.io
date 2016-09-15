---
layout: doc
title: "Mini Valgrind"
permalink: mini_valgrind
---

## Demo

Your section leaders will attempt to demo a implementation of a working Mini Valgrind. Please do also make an effort to read over the code that is provided for you.

## Learning Objectives

*   Metadata
*   Review of memory management and linked lists
*   Preparation for the Malloc MP

## Overview

For this lab, you will be implementing a small version of *Valgrind*. Valgrind is a great tool which monitors your memory usage which you have likely used already. Your version will print out a summary of the memory leaks in a particular C program This lab is meant in part as preparation for your *Malloc MP*, introducing some topics and techniques which you will find helpful when approaching Malloc soon.

## Main Concepts

The main concept of this lab is using some extra memory for each allocation (which we will call metadata) to track each block of allocated memory. We have provided you with a struct `_meta_data` in `mini_valgrind.h`. The metadata is set up as a node of a linked list (remember 125 and 225?) which should store information for each allocated block of the requested size. This includes the memory address of the actual block, line number it was allocated at, the size, filename, and a pointer to the next allocated block.

Here's a simple illustration:

![](./images/mini_valgrind.jpg)

If you do feel that you need a refresher on linked lists or other prerequisite concepts, feel free to ask a CA/TA one-on-one.

## mini_valgrind.c and .h

There are five functions in total you must be writing.

### mini_malloc

Here you are to write a wrapper function for malloc that will not only allocating the required space but also allocate and set up metadata to track each requested block allocated by the standard `malloc`. A call to `insert_meta_data` should be made to insert into the linked list of allocated blocks.  **NOTE:** you do not have to write your own implementation of `malloc` using `sbrk` or related system calls. You will call the standard `malloc`, simply allocating more space than normally due to the metadata. Return null if `malloc` fails, otherwise return the pointer to the allocated block of memory **NOT** the metadata.

Take a look at the `#define` statements in `mini_valgrind.h` to understand how this is being used. Note that the two macros `__FILE__` and `__LINE__` are standard predefined macros which are available with all compilers. A macro is just a fragment of code replaced by the contents of the macro when it is called, so `__FILE__` will expand to the name of the current input file and `__LINE__` will expand to current input line number when they are called in a program. If you want to learn more about macros and how they work, here are two useful links:

  https://gcc.gnu.org/onlinedocs/cpp/Standard-Predefined-Macros.html
  
  https://gcc.gnu.org/onlinedocs/cpp/Macro-Arguments.html#Macro-Arguments.

### mini_realloc

Now you are to implement realloc that will reassign memory for a pointer. The basic logic for realloc is if the pointer already has memory, then the pointer need ask new memory, and increase the totoal usage if the current size is smaller than the new size. However, if the pointer hasn't been assigned any memory, then realloc is same as malloc.

### insert_meta_data

Here you are passed a pointer to your metadata, the size of the block without metadata, the filename, and the line number from which the allocation was made in the .c file being run. You should ensure your metadata is set up here, and insert into the linked list at the head **in constant time**. You should be adding new nodes to the head of your linked list defined in the `mini_valgrind.h` file. Ensure that you update the `total_usage` here and deal with insertion into a linked list just as you have in 125/225.

### mini_free

Here you are passed a pointer to a block of previously allocated memory. To implement this function, use `remove_meta_data` properly, and also consider what happens when you free a `NULL` pointer.

Take a look at the `#define` statements in `mini_valgrind.h` to understand how this is being used.

### remove_meta_data

Remove your metadata passed in as a parameter from the linked list here. Ensure that you update `total_free` or `bad_frees` (depending on whether the block pointed to was previously allocated, not already freed, etc.) here and deal with removal from a linked list just as you have in 125/225, keeping in mind the different cases that might come about (such as removal of the head node, etc.). You should free the metadata and requested block.

### destroy

Here you must delete all nodes of the linked list that have been created. Ensure that you **DO NOT** add to `total_free` here. This is called when the program has finished executing and so any blocks that have not been deallocated should be counted as memory leaks.

## Reference Executables

You will be given a reference executable as usual for this lab. As usual, please direct as many "What should my code do in case X" questions as you can to the reference implementation first, but do feel free to ask us after checking. NOTE: You must run make each time you would like to test with the reference when you change `test.c`.

## Testing
If you would like to check your program, you may write tests within `test.c`. We recommend checking your program on a variety of inputs.

Helpful Hints and Notes

*   **DO NOT EDIT** print_report! You risk failing the autograder if you do! No one wants that!
*   A review of pointer arithmetic might be useful here.
*   Notice `char file_name[MAX_FILENAME_LENGTH]`; within the struct in `mini_valgrind.h`. Ensure that you write the filename over properly as the length of `file_name` is bounded by `MAX_FILENAME_LENGTH`.