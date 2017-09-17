---
layout: doc
title: "Pointers Gone Wild"
submissions:
- title: Entire Assignment
  due_date: 09/13 11:59pm
  graded_files:
  - part1-functions.c
  - part2-main.c
  - part3-functions.c
learning_objectives:
  - Pointers
  - Strings
  - Functions
  - Function Pointers
wikibook:
  - "C Programming, Part 1: Introduction"
  - "C Programming, Part 2: Text Input And Output"
  - "C Programming, Part 3: Common Gotchas"
---

## Introduction

In CS 125, CS 225, and other classes, you have used various languages that are considered to be "C-based", but up to now you may have very limited experience in C programming. This lab will provide a short programming introduction to pointers, strings, and functions in C.

This lab will be divided up into three parts. In the first part, you will be debugging broken functions that use pointers incorrectly. In the second part, you will need to write code to call some "creatively defined" functions so that each prints out "Illinois". In the third part, there be dragons (and function pointer practice)!

For this lab, you should modify only:

*   `part1-functions.c`
*   `part2-main.c`
*   `part3-functions.c`

All other files will be replaced with new/different files for grading. If you modify any other files for debugging purposes, please ensure you test your program with the original files.

## Part 1

There are erroneous/unimplemented functions in `part1-functions.c`. Your task is to modify the functions according to the comment above each function so that the output of `./part1` looks exactly as follows:

```
== one() ==
20 not passed!
100.000000 passed!
== two() ==
The value of p is: 4
== three() ==
x and y are equal.
x and y are different.
== four() ==
4 == 4.000000
432 == 432.000000
== five() ==
a is a letter.
a is not a letter.
== six() ==
Hello World!
== seven() ==
0.000000 0.100000 0.200000 0.300000 0.400000 0.500000 0.600000 0.700000 0.800000 0.900000
== eight() ==
0 10 40 90 160 250 360 490 640 810
== nine() ==
orange and blue!
ORANGE and blue!
Orange and BLUE!
orange and blue!
== ten() ==
The radius of the circle is: 17.500000.
The radius of the circle is: 10.000000.
== clear_bits() ==
170
0
171
0
20
0
== little finite automatons
5
4
6
7
```

Note that you can just diff with ```part1-expected-output```.

## Part 2

We have given you a file called `part2-functions.c`, that you may not change. Inside `part2-functions.c`, you will see twelve different functions, such as `first_step()`:

```
void first_step(int value) {
  if (value == 81)
    printf("1: Illinois\n");
}
```

To complete Part 2, you must write `part2-main.c` so that it makes calls to all twelve functions in `part2-functions.c`, and such that each one prints out its "Illinois" line. When running `./part2`, your output should look exactly like this:

```
1: Illinois
2: Illinois
3: Illinois
4: Illinois
5: Illinois
6: Illinois
7: Illinois
8: Illinois
9: Illinois
10: Illinois
11: Illinois
```

Note that you can just diff with ```part2-expected-output```.

<span style="color: #800">You should __not__ edit the part2-functions.c file. In fact, when we grade your program, we will replace the part2-functions.c file with a new version of the file (and we'll change the "Illinois" string so printing out "Illinois" in a for-loop will get you no credit).</span>

## Part 3

This part will explore a few different use cases of function pointers.

We have provided a library that implements a `vector`, similar to the C++ vector class. It allows you to supply a copy constructor and destructor which correspond to the data type you want the vector to store. This is useful, since we don't need a separate vector implementation for every data type we want to store. We have provided the header file for the vector interface in `includes/vector.h`. You will see this library being used in future assignments, so it's a good idea to familiarize yourself with it.

A similar but simpler design pattern using function pointers is illustrated by the dragon struct (defined in `part3-utils.h`):

```
typedef struct{
  char *name;
  talon_data_type talon;
} dragon;
```

As is common knowledge, every dragon has a unique "talon" which it can use to do miraculous things. In this lab, we will be using the power of the dragons to encode and decode data. We can create our own dragons, each with a function for encoding or decoding a single byte, by placing pointers to our own functions in the "talon" field of our new dragon.

The talon data type is defined in `part3-utils.h` as follows:

```
typedef char (*talon_data_type)(char c);
```

A function can be assigned to a dragon's talon if it takes a character and returns a character.

### Your Tasks

There are six functions in `part3-functions.c` you will need to implement or modify: `one`, `two`, `dragon_encode`, `dragon_decode`, `create_dragons`, and a sixth function which you will be defining yourself. You can name this last function anything you like.

For `one` and `two`, you will be using the vector struct we provided. Check the comments for details.

`dragon_encode` will take a dragon and a string and return a vector of encoded "chunks". Each chunk is a c string with a maximum length of 256. For example, if my input string was 700 'a's (followed by a null byte), and my dragon held a talon which would increment the value of each character, then this function will return a vector of strings that looks like this:

```
[ 'b'*256, 'b'*256, 'b'*188 ]
```

where `'b'*n` represents a string composed of _n_ 'b's.

`dragon_decode` is a function that takes in a dragon and a vector of a chunks of encoded strings (each with a maximum length of 256), then merges them into one decoded string. (Hint: Have you already implemented a function that can merge a vector of strings together?)

`create_dragons` and the function you need to define are described in the comments for `create_dragons`.

To test this, run `./part3 part3-test-file`, or test it with your own file as a command-line argument.

## Compile and Run

To compile the release version of the code, run:

```
make clean
make
```

This will compile your code with some optimizations enabled, and will not include debugging information (if you use a debugger on the 'release' build, it will not be able to show you the original source code, or line numbers). Optimizations sometimes expose bugs in your code that would not show up otherwise, but since optimizations tend to reorder your code while compiling, an optimized version of your code is not optimal for debugging.

You probably don't need to worry about the different build types very much for this assignment, but the distinction will become more important on future assignments.

To compile your code in debug mode, run `make debug` instead of `make`.

To run Part 1:

```
./part1
```

or

```
./part1-debug
```

To run Part 2:

```
./part2
```

or

```
./part2-debug
```

To run Part 3:

```
./part3 [inputfile]
```

or

```
./part3-debug [inputfile]
```
