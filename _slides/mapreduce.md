---
layout: slide
title: MapReduce
---


## What is MapReduce?

MapReduce is a programming model developed at Google for efficiently exploiting parallel and distributed computing systems for processing large datasets.
Programs that use the MapReduce module consist of a "mapper" function, which consumes some type of input and produces zero, one, or more `(key, value)` pairs from that input.
Then, a "reducer" method performs a summary operation across all of the `(key, value)` pairs to produce a (set) of results.

<horizontal />

## Example

Suppose we wanted to find the count of each word (word frequency) in a large document in a parallel manner. We would split up the document into smaller chunks, and distribute them across a number of processes or machines. Each machine could then map each word `w` to the key-value pair `(w, 1)`. A reducer would then iterate through the key value pairs and combine duplicates by adding them. The final result will then be a set of pairs `(word, count)` where `count` is the number of times `word` appears in the document.

<horizontal />

## Parallel Mapping

MapReduce is parallelizable because we can run the mappers and reducers across multiple threads/processes/machines. The mapping operation is independent per input element, so we can easily divide up the work of mapping. We simply take the input, split it up into a predefined number of chunks, and distribut each chunk to a mapper process. 

</vertical>

## Parallel Reducing

The reducing should also be parallelizable. We can run a single reducer for *all* of the mapped outputs, or we can also multiple reducers for each chunk and then reduce *those* results to produce the final answer. We can even layer this operation to use multiple stacked layers of reducers. This is only possible because the reduce operation needs to be associative, so `reduce(A[1...n]) = reduce(reduce(A[1...n/2]) + reduce(A[n/2...n]))`. 

<horizontal />

## Visualization

![MapReduce](https://user-images.githubusercontent.com/3259988/137649801-e741375d-2904-4ab8-81b1-558d05b78302.png)

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
