---
layout: slide
title: MapReduce
---

## Inter Process Communication

<vertical />

The goal of Inter Process Communication (IPC) is to communicate between different *processes*.
- Pipes
- Sockets
- Shared Memory

<horizontal />

## Pipes

A pipe takes in a stream of bytes from an input file descriptor, and spits out the data through an output file descriptor.

## How are pipes used?

```
> ls -1 | cut -d'.' -f1 | sort | uniq | tee dirents
```

![Pipes](https://raw.githubusercontent.com/illinois-cs241/coursebook/master/ipc/drawings/pipe_process.png)

What is going on with this command? How many processes are spawned here?

<vertical />

```
> ls -1 | cut -d'.' -f1 | sort | uniq | tee dirents
```

![Pipes](https://raw.githubusercontent.com/illinois-cs241/coursebook/master/ipc/drawings/pipe_process.png)

There are 5 processes spawned. The stdout (fd 1) of one process is connected to the stdin (fd 0) of the next process through a pipe.

<horizontal />

## Pipes in code

```
int pipe(int pipefd[2]);
```

`pipe()` takes in a single argument - an array of size 2.

`pipefd[0]` will be set to the file descriptor to read from.

`pipefd[1]` will be set to the file descriptor to write to.

<vertical />

How does the reading end of the pipe know when it's done reading?

`read()` will return 0 when all writers close their ends.

If a writer has not closed their end of the pipe yet, `read()` will just block.

<vertical />

How does the writing end of the pipe know when there's no more readers?

If all file descriptors referring to the read end of a pipe have been closed,
then a `write()` will cause a `SIGPIPE` signal to be generated for the writing process.

<horizontal />

## Other facts about pipes

<vertical />

How much data can a pipe hold?

The maximum size is dependent on the system, but usually it ranges from 4 KiB to 128 KiB.

<vertical />

What happens if the pipe is full?

Writing to the pipe will block if a pipe is full. It will unblock once data is read from the pipe.

<vertical />

`pipe()` vs `pipe2()`

`pipe2()` has an additional argument (`flags`).

One flag that might be useful is `O_CLOEXEC`. It closes both pipe file descriptors if a successful `exec` occurs.

<horizontal />

## Mapreduce

## What is MapReduce?

MapReduce is a programming model developed at Google for efficiently exploiting parallel and distributed computing systems for processing large datasets.
Programs that use the MapReduce module consist of a "mapper" function, which consumes some type of input and produces zero, one, or more `(key, value)` pairs from that input.
Then, a "reducer" method performs a summary operation across all of the `(key, value)` pairs to produce a (set) of results.

<horizontal />

## Example

Suppose we wanted to find the count of each word (word frequency) in a large document in a parallel manner. We would split up the document into smaller chunks, and distribute them across a number of processes or machines. Each machine could then map each word `w` to the key-value pair `(w, 1)`. A reducer would then iterate through the key value pairs and combine duplicates by adding them. The final result will then be a set of pairs `(word, count)` where `count` is the number of times `word` appears in the document.

<horizontal />

## Visualization

![MapReduce](https://user-images.githubusercontent.com/3259988/137649801-e741375d-2904-4ab8-81b1-558d05b78302.png)

<horizontal />

## Parallel Mapping

MapReduce is parallelizable because we can run the mappers and reducers across multiple threads/processes/machines. The mapping operation is independent per input element, so we can easily divide up the work of mapping. We simply take the input, split it up into a predefined number of chunks, and distribut each chunk to a mapper process. 

<vertical />

## Parallel Reducing

The reducing should also be parallelizable. We can run a single reducer for *all* of the mapped outputs, or we can also multiple reducers for each chunk and then reduce *those* results to produce the final answer. We can even layer this operation to use multiple stacked layers of reducers. This is only possible because the reduce operation needs to be associative, so `reduce(A[1...n]) = reduce(reduce(A[1...n/2]) + reduce(A[n/2...n]))`. 

<horizontal />


## Your Assignment

In this lab, you will be implementing the MapReduce infrastructure, i.e. the "orchestrator" for MapReduce that splits up the inputs, sends them off to the mappers, and then agglomerates the mapped outputs into a final result via a reducer. You will not need to implement any mappers or reducers yourself, and a tool is provided for splitting up the input. 

<vertical />

## Implementation

Your program will be called as `./mapreduce <input_file> <output_file> <mapper_executable> <reducer_executable> <mapper_count>`.

<vertical />

Your program will do the following:

1. Split the input file into `<mapper_count>` chunks using the given `splitter` tool.
2. Start a mapper executable for each input chunk, and pipe the output of each mapper process into the input of the singular reducer process.
3. Pipe the output of the reducer process to the output file.
