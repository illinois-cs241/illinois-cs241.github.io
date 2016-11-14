---
layout: doc
title: "MapReduce"
permalink: mapreduce
submissions:
- title: Part 1
  due_date: 11/14 11:59pm
  graded_files:
  - mr1.c
- title: Part 2
  due_date: 11/28 11:59pm
  graded_files:
  - mr2.c
---

## MapReduce

**This is a continuation of the [MapReduce lab](http://cs241.cs.illinois.edu/mr0.html).**

The inputs, outputs, and general flow are the same, but now you will be solving more difficult and interesting problems.

In 2004, Google released a general framework for processing large data sets on clusters of computers.
We recommend you read [this link](http://en.wikipedia.org/wiki/MapReduce) on Wikipedia for a general understanding of MapReduce.
Also, [this paper](http://static.googleusercontent.com/media/research.google.com/zh-CN/us/archive/mapreduce-osdi04.pdf) written by Jeffrey Dean and Sanjay Ghemawat gives more detailed information about MapReduce.
However, we will explain everything you need to know below.

To demonstrate what MapReduce can do, we'll start with a small dataset--three lines of text:

{% highlight text %}
Hello
there
class!
{% endhighlight %}

The goal of this MapReduce program will be to count the number of occurrences of each letter in the input.

MapReduce is designed to make it easy to process large data sets, spreading the work across many machines. We'll start by splitting our (not so large) data set into one chunk per line.

|           | Chunk #1 | Chunk #2 | Chunk #3 |
| --------- | -------- | -------- | -------- |
| **Input** | "Hello"  | "there"  | "class!" |


**Map**. Once the data is split into chunks, `map()` is used to convert the input into `(key, value)` pairs.
In this example, our `map()` function will create a `(key, value)` pair for each letter in the input, where the key is the letter and the value is 1.

|            | Chunk #1 | Chunk #2 | Chunk #3 |
|------------|----------|----------|----------|
| **Input**  | "Hello"  | "there"  | "class!" |
| **Output** | `(h, 1)` | `(t, 1)` | `(c, 1)` |
|            | `(e, 1)` | `(h, 1)` | `(l, 1)` |
|            | `(l, 1)` | `(e, 1)` | `(a, 1)` |
|            | `(l, 1)` | `(r, 1)` | `(s, 1)` |
|            | `(o, 1)` | `(e, 1)` | `(s, 1)` |

**Reduce.** Now that the data is organized into `(key, value)` pairs, the `reduce()` function is used to combine all the values for each key.
In this example, it will "reduce" multiple values by adding up the counts for each letter.
Note that only values for the same key are reduced.
Each key is reduced independently, which makes it easy to process keys in parallel.


|            | Chunk #1 | Chunk #2 | Chunk #3 |
|------------|----------|----------|----------|
| **Input**  | `(h, 1)` | `(t, 1)` | `(c, 1)` |
|            | `(e, 1)` | `(h, 1)` | `(l, 1)` |
|            | `(l, 1)` | `(e, 1)` | `(a, 1)` |
|            | `(l, 1)` | `(r, 1)` | `(s, 1)` |
|            | `(o, 1)` | `(e, 1)` | `(s, 1)` |
| **Output** | `(a, 1)` |          |          |
|            | `(c, 1)` |          |          |
|            | `(e, 3)` |          |          |
|            | `(h, 2)` |          |          |
|            | `(l, 3)` |          |          |
|            | `(o, 1)` |          |          |
|            | `(r, 1)` |          |          |
|            | `(s, 2)` |          |          |
|            | `(t, 1)` |          |          |

MapReduce is useful because many different algorithms can be implemented by plugging in different functions for `map()` and `reduce()`.
If you want to implement a new algorithm you just need to implement those two functions.
The MapReduce framework will take care of all the other aspects of running a large job: splitting the data and CPU time across any number of machines, recovering from machine failures, tracking job progress, etc.

## The MP

For this MP, you have been tasked with building a simplified version of the MapReduce framework.
It will run multiple processes on one machine as independent processing units and use IPC mechanisms to communicate between them.
`map()` and `reduce()` will be programs that read from standard input and write to standard output.
The input data for each mapper program will be lines of text.
Key/value pairs will be represented as a line of text with ": " between the key and the value:

{% highlight text %}
key1: value1
key two: values and keys may contain spaces
key_3: but they cannot have colons or newlines
{% endhighlight %}


## Version 1 - many mappers, one reducer

For version 1, you'll spread the work across multiple instances of the mapper executable.



    [...input_file...]
    |       |       |
    MAP1  MAP2  MAP3
        \  |  /
         REDUCE
           |
      output_file


The input file will need to be split into chunks, with one chunk for each mapper process.
To split the input file, we've supplied the tool `splitter`.
Run it without arguments for a brief explanation of how it works.
You'll start up one instance of splitter for each mapper, using a pipe to send `stdout` of splitter to `stdin` of the mapper program.

      splitter inputfile 3 0
      |
      |     splitter inputfile 3 1
      |     |
      |     |    splitter inputfile 3 2
      |     |    |
    MAP1  MAP2  MAP3
       \  |  /
        REDUCE
          |
     output_file


Command line:

    mr1 <input_file> <output_file> <mapper_executable> <reducer_executable> <mapper_count>

Sample Usage


    % ./mr1 test.in test.out my_mapper my_reducer 3
    my_mapper 0 exited with status 1
    my_mapper 2 exited with status 2
    output pairs in test.out: 9


Your program will:

* Split the input file into <mapper_count> parts and pipe the contents into <mapper_count> different mapper processes (use splitter).
* Write the output of the reducer process to the output file.
* Print any nonzero exit statuses.
* Count the number of lines in the output file and print it to `stdout`.


**Remember to close all the unused file descriptors!**

This too can be done in the Unix shell:

    % (./splitter inputfile 3 0 | my_mapper ; \
       ./splitter inputfile 3 1 | my_mapper ; \
       ./splitter inputfile 3 2 | my_mapper ; ) | my_reducer > test.out

### Files used for grading part 1:
* mr1.c
* common.c
* common.h

### Things we will be testing for in Part 1:
* Inputs of varying size
* Different types of mapper and reducer tasks
* Both mapper and and reducer generating accurate output to stdout file descriptor independently
* Splitter being used correctly to generate equally sized input data for each mapper
* All mappers being run in parallel resulting in at least 2x performance speedup for the pi executable
* No memory leaks and memory errors when running the application

### Things that will not be tested for in Part 1:
* Illegal inputs for either the mapper or reducer (Input data in a format other than as described above)
* Invalid mapper or reducer code (mappers or reducers that do not work)
* Input data larger than 1 MB
* Empty inputs
* Greater than 5 mappers


## Version 2 - many mappers, many reducers
For the final version of your program, you'll add support for multiple reducers.
Each reducer will handle a distinct subset of the keys.
In a full implementation of MapReduce, each map process would know how to send data to each reducer process and send each key/value pair to the appropriate place.

In our simplified version of MapReduce, one process will handle the routing of key/value pairs to the correct reducer process. We'll call it the shuffler.

          splitter inputfile 3 0
          |
          |    splitter inputfile 3 1
          |    |
          |    |      splitter inputfile 3 2
          |    |      |
        MAP1  MAP2  MAP3
           \  |  /
          SHUFFLER
         /  |  |  \
        R1  R2  R3  R4
         \  \  /  /
          \  \/  /
        output_file


As before, all mapper processes will read from `stdin` and write to `stdout`. You should redirect `stdout` of splitter to `stdin` of mapper as in Version 1 and send `stdout` of all mapper to write end of a pipe that is attachted to `stdin` of the shuffler process, which you will write.

The shuffler will be run with N output filenames as command line parameters, where N is the number of reducer processes.
It will read key/value pairs from `stdin`, hash the key with `hashKey()` function declared in `commmon.h` and then use the hash, modulo N, to decide which output file will the key/value pair will be written to.
Please note, you **must** put your shuffler implementation in 'shuffler.c'.

{% highlight C %}
const char *key = ...
const char *value = ...
FILE *outf = output_files[ hashKey(key) % N ];
fprintf(outf, "%s: %s\n", key, value)
{% endhighlight %}


Sample shuffler input:

    a: 1
    c: 1
    e: 3
    h: 2
    l: 3
    o: 1
    r: 1
    s: 2
    t: 1


Sample shuffler output (with 3 output files):

| File1 | File2 | File3 |
|-------|-------|-------|
| c: 1  | e: 3  | a: 1  |
| l: 3  | h: 2  | s: 2  |
| o: 1  | t: 1  |       |
| r: 1  |       |       |

Sample shuffler output (with 4 output files):

| File1 | File2 | File3 | File4 |
|-------|-------|-------|-------|
| c: 1  | r: 1  | a: 1  | h: 2  |
| o: 1  |       | e: 3  | l: 3  |
| s: 2  |       |       | t: 1  |


### mkfifo.

Time for the fun part. You can create pipes that look like normal files (see man page for `mkfifo()`).
Your main program will use `mkfifo()` to create a pipe file for each reducer.
Use `./fifo_N` as the names of the `fifo` files (so they will be created in the current directory), where N is the index of the reducer that will read from it.
Use `S_IRWXU` as the `mode` argument for `mkfifo()`.
Your program will give the names of those fifo files to shuffler on its command line and set up each reducer such that it reads from corresponding fifo file.

`mkfifo()` will fail if the file exists already. You should try to remove all fifo files before creating any in order to prevent your program from crashing during testing. And at the end of your program, remove all fifo files created. Make sure to check the return value of `mkfifo()`. Your program should print a helpful error message and exit with a nonzero exit status if it `mkfifo()` fails.

All the reducers will send their output to one output file.
When opening the output file (with `open()`) be sure to set `O_APPEND` (if you do not, the reducers will overwrite each other).

Command line:

    mr2 <input_file> <output_file> <mapper_executable> <reducer_executable> <mapper_count> <reducer_count>

Sample Usage

    % ./mr2 test.in test.out my_mapper my_reducer 3 4
    my_mapper 2 exited with status 1
    my_reducer 3 exited with status 1
    output pairs in test.out: 9

Your program will:

* Split the input file into <mapper_count> parts and pipe the contents into <mapper_count> different mapper processes (use splitter).
* Split the results of the mappers among the reducers using the shuffler.
* Write the output of each of the <reducer_count> reducer process to the output file.
* You must use fifo files to communicate between the shuffler and the reducers.
* Print any nonzero exit statuses.
* Count the number of lines in the output file and print it to `stdout`.


### Files used for grading part 2:

  * mr2.c
  * shuffler.c
  * common.c
  * common.h

### Things we will be testing for in Part 2:

* Input data of varying sizes
* Different types of mapper and reducer tasks being spawned based on the arguments specified
* Both mapper, reducer and shuffler tasks will be tested both independently of one another and run together
* Splitter being used correctly to generate equally sized input data for each mapper
* All mappers and reducers being run in parallel resulting in at least 2x performance speedup for the pi executable
* Ensuring that mkfifo is used correctly and cleaned up
* No memory leaks and memory errors when running application

### Things that will not be tested for in Part 2:

* Illegal inputs for either the mapper or reducer (Input data in a format other than as described above)
* Invalid mapper or reducer code (mappers or reducers that do not work)
* Input data larger than 1 MB
* Empty inputs
* Greater than 5 mappers or reducers


##  Building and Running

### Building
This MP has a very complicated `Makefile`, but, it defines all the normal targets.

{% highlight bash %}
make # builds provided code and student code in release mode
make debug # builds provided code and student code in debug mode
# there is no tsan target because threading is not needed for this MP.
{% endhighlight %}

If you are curious, you can run `make test` to build and run all of the tests in the `unit_tests` directory.
These tests test the provided code, and can serve as some examples of how it all works.

### Input Data
To download the example input files (books from [Project Gutenberg](https://www.gutenberg.org/)), use the `Makefile`:

{% highlight bash %}
make data
{% endhighlight %}

You should now see `data/dracula.txt` and `data/alice.txt` in your mp folder

### Running Your Code
We have provided the following mappers:

  * `mapper_wordcount`
  * `mapper_lettercount`
  * `mapper_asciicount`
  * `mapper_wordlengths`
  * `mapper_pi`

These each be used anywhere we specify `my_mapper` in these docs.

And the following reducers:

  * `reducer_sum`
  * `reducer_pi`

These each be used anywhere we specify `my_reducer` in these docs.

For example, if you wanted to count the occurrences of each word in Alice in Wonderland, you can run and of the following

    ./mr0 data/alice.txt test.out ./mapper_wordcount ./reducer_sum

With 4 mappers:

    ./mr1 data/alice.txt test.out ./mapper_wordcount ./reducer_sum 4

With 4 mappers and 4 reducers

    ./mr2 data/alice.txt test.out ./mapper_wordcount ./reducer_sum 4 4

### Record Setting Pi Code
As well as the simple mapper/reducer pairs, we also have also included some really cool pi computation code (see [this](http://www.karrels.org/pi/) for more info).
For instructions on how to use the pi code, see the file `pi/README.txt`.
Note that we do not currently compile this with an NVIDIA compiler, so you will
not be able to use the CUDA version of this code (which we have not tested) unless you fiddle with the `Makefile`.
