---
layout: doc
title: "Mini Valgrind"
submissions:
- title: Entire Assignment
  due_date: 9/27/17, 11:59 PM
  graded_files:
  - mini_valgrind.c
learning_objectives:
  - Using metadata for memory bookkeeping
  - Memory management and linked lists
  - Learning what Valgrind does
  - Preparation for the Malloc MP
wikibook:
  - "Memory, Part 1: Heap Memory Introduction"
  - "Memory, Part 2: Implementing a Memory Allocator"
  - "Memory, Part 3: Smashing the Stack Example"
---

## Overview

For this lab, you will be implementing a small version of [Valgrind](http://valgrind.org/docs/manual/quick-start.html) called `mini_valgrind`. Valgrind is a great tool for monitoring memory usage, and you have likely used it earlier in this class. Your version will print out a summary of the memory leaks in a particular C program. This lab is meant in part as preparation for your Malloc MP, introducing some topics and techniques which you will find helpful there.

## Main Concepts

The main concept of this lab is that we can track each block of memory using some extra space before each allocation (called *metadata*). We have provided you with a struct `meta_data` in `mini_valgrind.h`. The metadata is set up as a linked list of nodes which store information for each allocated block. Each node stores the amount of memory requested, the filename and location of the instruction that made the request, and a pointer to the next allocated block.

Here's an illustration:

![](./images/mini_valgrind.jpg)

When the program is about to exit, we can look at this metadata list to see what the user hasn't freed. These are your memory leaks.

If you feel that you need a refresher on linked lists or other prerequisite concepts, feel free to ask a CA or TA one-on-one.

## mini_valgrind.c

We have set up `mini_valgrind` to dynamically replace every call to `malloc`, `calloc`, `realloc`, and `free` in the user's program with a call to `mini_malloc`, `mini_calloc`, `mini_realloc`, and `mini_free`, respectively. You will be implementing these four functions in order to track the memory the user allocates.

Inside of `mini_valgrind.c`, it is safe to call the real versions of `malloc` and related functions. You should *not* be writing your own implementation of `malloc` using `sbrk` or related system calls.

See the `mini_valgrind.h` header file for details.

### Global Variables

In addition to the four functions above, you'll need to maintain the following global variables:

* `total_memory_requested`: stores the total number of bytes of memory requested by the user throughout the lifetime of the program (excluding metadata)

* `total_memory_freed`: stores the total number of bytes of memory freed by the user throughout the lifetime of the program

* `invalid_addresses`: stores the number of times the user has tried to `realloc` or `free` an invalid pointer

Since we keep track of this data, we can show the user how much memory they've allocated, just like the real Valgrind. We can also find out how much memory a user might be leaking, by subtracting `total_memory_freed` from `total_memory_requested`.

## Testing

You'll want to test your `mini_valgrind` thoroughly.

We've provided you with a `test.c` file that you can put test cases in. Running `make` will generate a `./test` executable alongside `mini_valgrind`. You can use it like the regular Valgrind:

    ./mini_valgrind ./test

The output should look familiar!

Note that we always build `./test` with debugging symbols (`gcc -g`), so `mini_valgrind` can find the line numbers corresponding to memory leaks.

To debug `mini_valgrind` itself, you can use `gdb` like usual. Use `make debug` to generate a version of `mini_valgrind` with debugging symbols:

    gdb --args ./mini_valgrind-debug ./test

### Warning: printf

Be careful with `printf` in Mini Valgrind! By default, stdout is buffered, so `printf` calls `malloc` internally to create a buffer.

If you call `printf` inside of `mini_malloc`, it will allocate its buffer using the _real_ `malloc` (since calls to `malloc` inside `mini_valgrind.c` use the real version), __but then free it using__ ___your___ `mini_free` since the cleanup happens outside of `mini_valgrind.c`. As you can imagine, this results in unexpected behavior.

Instead, you can use `fprintf(stderr, ...)`, which is unbuffered, or use `write`, but the easiest solution may be to turn off buffering for stdout:

```c
  setvbuf(stdout, NULL, _IONBF, 0);
```

## Example

Here's a basic test case to check your progress.

Say you had the following in your `test.c` file:

```c
#include <stdlib.h>
int main() {
    void *p1 = malloc(30);
    void *p2 = malloc(40);
    void *p3 = malloc(50);
    free(p2);
    return 0;
}
```

`mini_valgrind`'s output should look like this (of course, your process ID and addresses might be different):

```
==25219== Mini-Valgrind
==25219==
==25219== LEAK REPORT:
==25219==    Leak origin: main (test.c:5)
==25219==    Leak size: 50 bytes
==25219==    Leak memory address: 0x1009790
==25219==
==25219==    Leak origin: main (test.c:3)
==25219==    Leak size: 30 bytes
==25219==    Leak memory address: 0x10096f0
==25219==
==25219== Program made 0 bad call(s) to free or realloc.
==25219==
==25219== HEAP SUMMARY:
==25219==    Total memory requested: 120 bytes
==25219==    Total memory freed: 40 bytes
==25219==    Total leak: 80 bytes
```

Notice that leaks are reported most-recent-first. This is because we insert new metadata at the head of the linked list.

### Other Programs

You can also run `mini_valgrind` on other programs, like `echo`:

```
$ ./mini_valgrind echo 'Hello, world!'
==19506== Mini-Valgrind
Hello, world!
==19506==
==19506== Program made 0 bad call(s) to free or realloc.
==19506==
==19506== HEAP SUMMARY:
==19506==    Total memory requested: 1068 bytes
==19506==    Total memory freed: 1068 bytes
==19506==    No leaks, all memory freed. Congratulations!
```

It should work on most standard utilities, but just be aware that it won't work on everything. You'll notice it may generate different output than Valgrind or may even crash when run on complex software like `python`. _This is okay; writing a memory checker is hard!_ You only need to implement what we've described above and in `mini_valgrind.h`.

## Behind the Scenes

This section describes some details of how we've implemented `mini_valgrind`. You are encouraged, but not required, to understand this.

We compile your `mini_` functions, along with some extra code from `mini_hacks.c`, into a [_shared object_](https://en.wikipedia.org/wiki/Library_%28computing%29#Shared_libraries) called `mini_valgrind.so`.

`mini_hacks.c` has two main jobs:

- Create wrappers around `malloc` and the other functions to make sure they use your replacement functions when the user's program calls them, while still letting you use the real versions within your code
- Print out leak info at program exit

The actual `./mini_valgrind` program is implemented in `mini_main.c`. When you run `./mini_valgrind ./test`, we use an environment variable called [`LD_PRELOAD`](https://rafalcieslak.wordpress.com/2013/04/02/dynamic-linker-tricks-using-ld_preload-to-cheat-inject-features-and-investigate-programs/) to run the `./test` program using the code in `mini_valgrind.so`. Essentially, it replaces normal references to the built-in `malloc` with references to our version.

_"But,"_ you may ask, _"how do we call the real version of `malloc` if we've replaced it with our own version of it?"_ The trick is a function called [`dlsym`](https://linux.die.net/man/3/dlsym), which allows us to bypass `LD_PRELOAD` and ask for a function pointer to the real `malloc`. This is all handled within `mini_hacks.c`.
