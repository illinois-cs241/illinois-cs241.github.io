---
layout: doc
title: "Perilous Pointers"
submissions:
- title: Entire Assignment
  due_date: 01/31 11:59pm
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

This lab will be divided up into three parts. In the first part, you will be debugging broken functions that use pointers incorrectly. In the second part, you will need to write code to call some "creatively defined" functions so that each prints out "Illinois". In the third part, you will implmement map and reduce for a vector!

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

A similar but simpler design pattern using function pointers is illustrated by the vector printer (defined in `part3-main.c`):

```
typedef void (*printer_type)(void*);
void vector_print(printer_type printer, vector* v){
  printf("[");
  VECTOR_FOR_EACH(v, elem, {printer(elem); if(_it+1!=_iend) printf(", ");});
  printf("]\n");
}
```

You might have noticed the VECTOR_FOR_EACH macro that we make use of here. It iterates through the vector for you, making your code look much neater. Feel free to use it in your solutions. 

The typedef statement serves as syntatic sugar to wrap around the rather tedious notation for a function pointer. Notice how vector_print can now take in a function that would implement some specific way to print whatever data type the vector might be storing. This is useful since our vector library is designed to be general purpose and hold any data type - including ones that a user might define. Below is an example of a printer for string (defined in `part3-main.c`)

```
void printer(void *s){
  printf("%s\n", (char*)s);
}
```

Similarly, in `part3-functions.h` we have defined two types, `mapper` and `reducer` which represent the mappers and reducer you can pass in to the functions you implement. 

```
typedef char*(*mapper)(char*);
typedef void*(*reducer)(char*,void*);
```

Here, `mapper` is defined to be a function that accepts a string (`char*`) and returns a string. `reducer` is a function that accepts a string and a `void*` and returns a `void*`.

### Your Tasks

There are four functions in `part3-functions.c` you will need to implement or modify: `vector_map`, `vector_reduce`, `length_reducer`, and `concat_reducer`. `map` and `reduce` are powerful functions which show up very frequently, especially in functional paradigms. Here is a link explaning [Functional Programming in Python](http://www.bogotobogo.com/python/python_fncs_map_filter_reduce.php) a link explaning the concept in python. 

`vector *vector_map(vector *input, mapper map)` will take a vector of strings and a function which takes a string as input and returns a string. `vector_map` should return a new vector where every element of the old vector is passed to the input function, and the ouput of the input function is stored in an output vector. Here's a pseudocode example:

```
input = ["foo", "bar", "baz"]
vector_map(input, string_reverser) = ["oof", "rab", "zab"]
```

Where we assume the existence of some function `char *string_reverser(char *input)`  which takes a string as input and returns a reversed version.

When you make a new vector, make sure it's set up with the write constructor callbacks (using `string_vector_create` solves this problem). It is also worth noting that calling `vector_push_back` will make a copy of the data passed in (according to the copy constructor it was initialized with) and thus if you pushed in something that was allocated on the heap, you can free the original copy without affecting the vector.

`void *vector_reduce(vector *input, reducer reduce, void *acc)` will take a vector of strings, a function returning a void pointers that takes a string and a void pointer, and a void pointer to an accumulator and returns a void pointer. This function should iterate over the list of elements in the vector in order and update the accumulator by passing in the current element and the existing accumulator to the function passed in. The value you return may not necessarily be the same memory location passed in as the accumulator, but make sure not to leak any memory! You will also need to account for an inital accumulator value of NULL, which is not considered an error for our purposes. You should pass values to the reducer in the order vector element, then the accumulator (note that this matches the types of the arguments the reducer accepts. If you need to typecast, you're doing it wrong!). 

`void *length_reducer(char *input, void *output)` is a specific reducer you will be implementing. It should use the accumulator to store a pointer to an integer and likewise, returns a pointer to an integer. This function returns a pointer to an integer containing the sum of the length of the string passed in and the inital value stored in the accumulator. If the accumulator is NULL, allocate some memory for an integer, and store the length of the string inside it. Psuedocode exmaple:

```
input = ["foo", "bar", "baz"]
*vector_reduce(input, length_reducer, NULL) = 9
```

`void *concat_reducer(char *input, void *output)` is a specific reducer you will be implementing. It should use the accumulator to store the result from the previous iteration and return a string which is the output of concatenating the input string the the string in the accumulator. This function concats all the strings in a vector in order to form one complete string. They should be joined in the order `input` then `accumulator`. If the accumulator is NULL, allocate enough memory to store the string in `input` and return a copy of `input`. Psuedocode example:

```
input = ["foo", "bar", "baz"]
vector_reduce(input, concat_reducer, NULL) = "foobarbaz"
```

## Compile and Run

To compile the release version of the code, run:

```
make clean
make
```

This will compile your code with some optimizations enabled, and will not include debugging information. If you use a debugger on the 'release' build, it will not be able to show you the original source code, or line numbers. Optimizations sometimes expose bugs in your code that would not show up otherwise, but since optimizations tend to reorder your code while compiling, an optimized version of your code is not optimal for debugging.

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
./part3 [test string]
```

or

```
./part3-debug [test string]
```
