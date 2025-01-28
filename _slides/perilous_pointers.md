---
layout: slide
title: Memory
---

## Lab Time!

<vertical />

## Using pointers

Where can a pointer point to?

<vertical />

Heap

Stack

Global

Text

...Anywhere!

## What is a function pointer?

A pointer that stores the address of a function's code

<vertical />

With this, we can pass a function as an argument

This allows us to reuse code

E.g., sorting an array of arbitrary objects could use a function pointer as the comparison function

## Pointer Arithmetic

![Pointer Arithmetic](/images/assignment-docs/lab/perilous_pointers/pointerArithmetic.drawio.png)

## Part 1

<vertical />

You will be debugging several functions that all use pointers incorrectly

## Part 2

<vertical />-

We've given you a set of functions as tools

Your job is to use these tools in the right order to print "Illinois"

<horizontal />

## Hints about the MP

<vertical />

## What is this NULL-terminated array?

Maybe, we don't want to pass around the size of the array everywhere

We know that NULL is not a valid string (but this doesn't work for every type)

```C
char *ptr[] = ...;// vs
int arr[] = ...;
arr[len] = NULL; // NULL = 0, meaning we have a valid element
```

## Useful Functions

* `strdup`: return a string copy
* `strcpy`,`strncpy`: copy a string to another string
* `toupper`, `tolower`: uppercases/lowercases an input character
* `ispunct`,`isspace`,`isalpha`: decide whether a character is punctuation/alphabetical/whitespace

* **Not so useful: `strtok`**

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

## Questions?
