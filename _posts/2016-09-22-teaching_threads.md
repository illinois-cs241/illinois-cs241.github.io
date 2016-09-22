---
layout: doc
title: "Teaching Threads"
permalink: teaching_threads
dueDates: "9/28/2016, 11:59 PM"
---

## Learning Objectives
* using &lt;pthread.h&gt;
* Working with threads in an embarassingly parallel setting.
* Dividing a problem into a lot of smaller subproblems.

## map()

In functional programming, there is a concept of `map()` https://en.wikipedia.org/wiki/Map_(higher-order_function). Map takes two parameters which are a list and a function. The list is the input list that you wish to transform and the function "maps" one element of the list to another value in the same domain. `map()` then returns a list where each element is the result of applying the provided function on every element (in the same order). It is why `map()` is often called "appply-to-all".

So, a concrete example is if we have the input list `[1,2,3]`, and we have a callback function `int triple(int elem)` which takes a number and returns 3 times that number. If we call map, the results list would be `[triple(1), triple(2), triple(3)]` or simply `[3,6,9]`

In C code it looks something like this (you can find this in `map.c`):

{% highlight c %}
double *map(double *list, size_t length, mapper map_func) {
  double *ret_list = (double *)malloc(sizeof(double) * length);

  for (size_t i = 0; i < length; ++i) {
    ret_list[i] = map_func(list[i]);
  }

  return ret_list;
}
{% endhighlight %}

Notice that this is basically a for-loop on the list. There are no fancy algorithms that can make this faster, since the callback function is essentially a magic-black-box https://en.wikipedia.org/wiki/Black_box that we know nothing about.

Parallelism to the rescue!

## par_map()

The first thing to notice is that `map()` is "embarrassingly parallel" https://en.wikipedia.org/wiki/Embarrassingly_parallel, which means that
* it is easy to divide the problem into subproblems
* none of the subproblems depend on each other

For our running example of `[1,2,3]` and `triple()`, we can meet the requirements for "embarrassingly parallel" by doing the following with 3 threads:

* thread 1 : evaluates `triple(1)`
* thread 2 : evaluates `triple(2)`
* thread 3 : evaluates `triple(3)`
* None of these subproblems depend on each other to evaluate do to how the callback function of `map()` is defined.
* thread 1 : writes `triple(1)` into index 0 of the new list
* thread 2 : writes `triple(2)` into index 1 of the new list
* thread 3 : writes `triple(3)` into index 2 of the new list
* Join the threads

And finally we should have our list of `[3,6,9]`.

Now, it would be unfortunate if someone had to figure out the assignment of jobs to each thread manually every time the problem changes slightly:
* input list changes
* callback function changes
* number of threads changes

So to alleviate that, we are providing our users with a nice `par_map()` function that takes in an input list, callback function, and the number of threads (in addition to the main thread). The end goal is that `par_map()` does exactly what `map()` does except with more threads in parallel. To the user, it the same old `map()` function but faster.

For this lab, you are responsible for implementing `par_map()` in `par_map.c`.

Some food for thought:

* What does `int pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine) (void *), void *arg);` do?
	* what are `start_routine` and `arg`?
* What information does each thread need to know in order to do its job?
* How would you divide the problem among your threads?
	* Think of some of the edge cases. More threads than elements and the number of elements not being a multiple of the number of threads.
* What does `int pthread_join(pthread_t thread, void **retval);` do?

## Testing your code

We have provided a makefile that will compile your code along with our framework. We insist that you read through `main.c`, so that you understand just how we are calling your `par_map()` in `par_map.c`.

After running `make`, you can run the executable with the following usage:
par_map <csv_filename> <callback_function_name> <num_threads>

We have already provided a csv file and some sample callbacks so you can run:
./par_map sample_csv.txt triple 3
which should run your `par_map()` with the dataset provided in `sample_csv.txt` with 3 threads.

Note: that a valid csv file for this assignment is a text file that has one line of doubles separated by commas.
