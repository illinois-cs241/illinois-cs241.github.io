---
layout: doc
title: "Vector"
submissions:
- title: Entire Assignment
  due_date: 02/06/2017 11:59pm
  graded_files:
  - vector.c
  - document.c
learning_objectives:
  - Implementing a C++ style Vector in C
  - Using Dynamic/Heap Memory
  - Using malloc(), free(), calloc(), realloc()
  - Function Pointers
  - OOP in C
  - Serializing/Deserializing to/from a File
wikibook:
  - "C Programming, Part 1: Introduction"
  - "C Programming, Part 2: Text Input And Output"
  - "C Programming, Part 3: Common Gotchas"
  - "Memory, Part 1: Heap Memory Introduction"
---

## Groundwork For Text Editor and Shell

You are an intern at Macrohard, where you'll be writing a text editor and shell for everyone on your team.

These projects will take you several weeks, and your mentor has decided on the following timetable:

*   Week A: Vector and Document
*   Week B: Text Editor
*   Week C: Shell

The _Text Editor_ will use a [TUI](https://en.wikipedia.org/wiki/Text-based_user_interface) that another intern has written. Your mentor has decided to abstract away the concept of a _Document_ as a sequence of lines. 

The _Shell_ is a terminal. Like all good terminals, your shell will need to remember what processes are running. 

Your mentor has realized that documents and logs are both just arrays of strings. So, to implement the document, your mentor has decided that you will create a _Vector_ to store strings.

However, after hearing tales of your talent, and with vectors being all the rage, other team leads have asked for vectors that they can use in their own projects. One option would be to write a vector for each team. However, being a good programmer, you know that code duplication is bad. Also, you're a lazy programmer, so you want to write as little code as possible to accomplish everything. You decide to implement a generic vector, something that every team can use with minimal changes.


## Vector

A vector is an array that grows and shrinks as a user adds and removes items from it. (Since CS 225 was a prerequisite, you probably knew all of that already.) However, your vector will need to be feature-rich enough for someone to easily create a log or document from it, or anything else the other sneaky teams want for their projects.

Your implementation should go in `vector.c`, which is the only file that will be sent to your team lead for review. As an intern looking to become a full-time employee, you should create test cases in `vector_test.c` to show you are a responsible programmer. Your mentor has left notes in `vector.h` guiding your implementation.

In case a fellow employee asks what you learned in CS 225, here's some review:

* [Lectures](https://web.archive.org/web/20151225075250/https://chara.cs.illinois.edu/cs225/lectures/)
* [Array Resizing](https://web.archive.org/web/20160119032015/https://chara.cs.illinois.edu/cs225/lectures/slides/lec0928-resizing.pdf)
* [Lecture Recording](https://recordings.engineering.illinois.edu:8443/ess/echo/presentation/a73d58c6-98a0-4a8c-bf68-f0fb224f5c26)

Since this vector is generic, it will have to call custom constructor and destructor functions when objects are added or removed. (How is this better than a single function which handles all possible types?) Thus, your vector structure will contain pointers to your constructor or destructor routines, and you can initialize the vector by passing pointers to these functions as parameters.

Here's an illustration:

![](./images/vector.jpg)

What you'll end up with is a useful general-purpose vector, capable of dynamically expanding and shrinking. (No more fixed-sized buffers!)

Note: Remember that vector size (the number of actual objects held in the vector) and capacity (size of the storage space currently allocated for the vector) are two different things. Refer to documentation in vector.h and vector.c for more information.


## Document

Your mentor has provided trivial functions for you that assume a correctly implemented vector. The only file that will be reviewed (for this portion of the assignment) by your team lead is `document.c`. Since Macrohard frowns on interns who rely on QAs to catch their mistakes, you are encouraged to write your own testcases in `document_test.c`. Your mentor has left some notes in `document.h`.

Since you're working with files, you should have basic notions of serialization and deserialization. _Serialization_ is the process of converting the state of a data structure or object into a representation that can be stored (in this case, in a file) or transmitted. _Deserialization_ is the reverse process, where a serialized representation is converted into the original data structure or object. These two processes are equal and opposite, and will cancel each other out if sequentially applied on something. That is, `deserialize(serialize(x)) == x`.


## Vector vs. Document

Make sure you're completely clear on the difference between a vector and a document! Your document uses an _underlying_ vector to represent the state of a file, and each entry in the vector corresponds to a single line in the file. This makes it much easier to manipulate individual lines.

Recall that [POSIX defines a line](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_206) as "A sequence of zero or more non-`<newline>` characters plus a terminating `<newline>` character". When you're working with the document, be careful how you handle newlines in the files you're opening. Remember, serialization and deserialization are equal and opposite. Your document already provides an abstraction for lines of text. Do you need to add the newline characters to the strings you store?

## Managing memory

Remember, `man` is man's best friend. Since you're working with dynamic memory, there are quite a few functions you should be familiar with before you proceed. `malloc()`, `free()`, `realloc()`,  `calloc()`, `memmove()` are your friends; don't shy away!

* `man 3 malloc`
* `man 3 free`
* ...there's a pattern here

## Undefined behavior

_Undefined behavior_ is a scenario or edge case for which there is no documentation describing how the code should react. For example, man pages do not describe what happens when you feed `NULL` into `strcmp()`. Your mentor will not answer questions like "What if my user wants an element past the end of the vector?", because that is undefined behavior.

So, for the entirety of this MP, you should use `assert()` statements to check that your user is passing valid input to your function before operating on the input. For example, if you were implementing `strcmp(const char *s1, const char *s2)`, then your code might look like this:

```C
#include <assert.h>

strcmp(const char *s1, const char *s2) {
    assert(s1 != NULL && s2 != NULL);
    // Compare the two strings
    .
    .
    .
    return rv;
}
```

## Writing test cases

Just to emphasize how important test cases are, this lab spec will repeat itself and remind you that as good programmers, you are expected to write your own test cases for document and vector.
