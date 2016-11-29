---
layout: doc
title: "Teaching Threads"
permalink: teaching_threads
submissions:
- title: Entire Assignment
  due_date: 09/28/2016, 11:59pm
  graded_files:
  - par_map.c
---

## Learning Objectives
* Using `<pthread.h>`
* Working with threads in an embarassingly parallel setting
* Dividing a problem into a lot of smaller subproblems

## map()

In functional programming, there is a an operation called [`map()`](https://en.wikipedia.org/wiki/Map_(higher-order_function)). `map` takes two parameters, a list and a function. The list is the input data that you wish to transform, and the function "maps" each element of the list to another value. `map` then returns a list where each element is the result of applying the function to each element, in the given order. Thus, `map` is often called "appply-to-all".

Here's a concrete example. Say we have the input list `[1,2,3]` and a callback function `int triple(int elem)` which takes a number and returns that number multiplied by three. If we call `map`, the output list would be `[triple(1), triple(2), triple(3)]`, or simply `[3,6,9]`.

In C code, it looks something like this (which you can find in `map.c`):

{% highlight c %}
double *map(double *list, size_t length, mapper map_func) {
  double *ret_list = malloc(sizeof(double) * length);

  for (size_t i = 0; i < length; ++i) {
    ret_list[i] = map_func(list[i]);
  }

  return ret_list;
}
{% endhighlight %}

(To keep things simple: while the `map` in functional programming is generic, our version for this lab always maps a list of doubles to a list of doubles.)

Notice that this is basically a for-loop on the list. There are no fancy algorithms to improve runtime, since the callback function is essentially a [magic black-box](https://en.wikipedia.org/wiki/Black_box) that we know nothing about. So how do we make it faster?

Parallelism to the rescue!

## par_map()

The first thing to notice is that `map()` is "[embarrassingly parallel](https://en.wikipedia.org/wiki/Embarrassingly_parallel)", which means that:

* it is easy to divide the problem into subproblems, and
* none of the subproblems depend on each other.

For our running example of `[1,2,3]` and `triple()`, we can meet the requirements for "embarrassingly parallel" by doing the following with 3 threads:

* Thread 1: evaluate `triple(1)`
* Thread 2: evaluate `triple(2)`
* Thread 3: evaluate `triple(3)`
* Thread 1: write `triple(1)` into index 0 of the new list
* Thread 2: write `triple(2)` into index 1 of the new list
* Thread 3: write `triple(3)` into index 2 of the new list
* Join the threads

And we are left with our output list, `[3,6,9]`.

Crucially, none of these subproblems depend on the result of another to evaluate, due to how the `map`'s callback function is defined.

Now, it would be unfortunate if someone had to figure out the assignment of jobs to each thread manually every time the problem changes slightly, such as the input list, callback function, or number of threads.

To alleviate that, we provide our users with a nice `par_map()` function that takes an input list, callback function, and the number of threads to create. The end goal is that `par_map` does exactly what `map` does, except with more threads in parallel. To the user, it the same old `map` function, only faster.

For this lab, you are responsible for implementing `par_map()` in `par_map.c`.

Some food for thought:

* What does `int pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine) (void *), void *arg);` do?
	* What are `start_routine` and `arg`?
* What information does each thread need to know in order to do its job?
* How would you divide the problem among your threads?
	* Think of some of the edge cases, like more threads than elements and the number of elements not being a multiple of the number of threads.
* What does `int pthread_join(pthread_t thread, void **retval);` do?

## Testing Your Code

We have provided a makefile that will compile your code along with our framework. We insist that you read through `main.c`, so that you understand just how we are calling your `par_map()` in `par_map.c`.

After running `make`, you can run the executable with the following usage:

{% highlight c %}
./par_map <callback_function_name> <num_elements> <num_threads>
{% endhighlight %}

We have provided some sample callbacks, so you can run:

{% highlight bash %}
./par_map triple 500 4
{% endhighlight %}

which should run your `par_map()` with the `triple` callback function on 500 elements with 4 worker threads.
