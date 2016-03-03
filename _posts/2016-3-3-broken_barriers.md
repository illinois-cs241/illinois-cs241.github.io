---
layout: doc
title: "Broken Barriers"
permalink: broken_barriers
dueDates: "3/9 11:59pm"
---

# Broken Barriers

## Learning Objectives

- Deeper understanding of the barrier as a synchronization structure.
- Being able to recognize parallelizable sections of code.
- Profiling and debugging a parallel program.

## Overview

You will implement a reusable barrier using only condition variables, mutexes and/or semaphores.
Using this barrier we ask that you parallelize a provided serial implementation
of a Poisson equation solver. Here's some interesting, but unnecessary to complete this
assignment, background: 

- [Poisson Equation Explanation](./images/poisson.pdf)

## Barrier

##### You've already done most of this

[Wiki page](https://github.com/angrave/SystemProgramming/wiki/Synchronization%2C-Part-6%3A-Implementing-a-barrier)

Perhaps you haven't realized it yet but throughout the last few assignments chances
are that you've implemented a barrier. You've probably written some code along these
lines:

```C
pthread_mutex_lock(&m);
counter--;
while (counter != 0) {
    pthread_cond_wait(&cv, &m);
}
pthread_cond_signal(&cv);
pthread_mutex_unlock(&m);
```

This is the essence of a barrier. The question we would like for you to ponder before
moving on is this: What happens if we want to go through this critical section more than once?
In an iterative parallel application that has to go through this critical section hundreds of
times we need to have a way to automatically reset the barrier without introducing any race conditions.
The only real guarantee that we would like to give our barrier is that the number of threads it can
handle is fixed at initiation, any more trying to use the barrier would result in undefined behavior
and any less would result in our code hanging.

##### Implement your barrier

This is the meat and potatoes of this lab. We want to see how you decide to implement a reusable
barrier without giving you any explicit hints outside of what is in the wiki (*wink, wink, nudge,
nudge*). Ask the TAs if the direction you are going in is the right one or if you really feel lost.
You can find some stub functions inside of `barrier.c` to get you started.

##### Test your barrier

We provide some silly code inside `barrier_test.c` which should give you an idea of whether
or not your barrier is working at all. We strongly encourage you to come up with some more robust 
tests. In addition we provide a library with a reference implementation. Simply call

{% highlight bash %}
make barrier_test-reference
{% endhighlight %}

to use our barrier implementation with your test file.

## Poisson Solver

In `poisson.c` you will find the serial implementation of the Poisson Solver. There are a lot
of moving parts as this is a full implementation of a relatively complex application, try to
understand what is happening at at least a high level before diving into your parallelization.

If you read the pdf linked at the top you would know that the way we have chosen to solve the
poisson equation (you don't need to know what poisson equations are) is to use a Jacobi iterative 
numerical method (you don't need to know what that is either). This method gets closer to the
real solution of the equation every time it goes through an iteration until there is an arbitrarily
small difference between iterations (we call this arbitrary number epsilon).

Given an equation in the form provided in `basic_function`, let's say, a sine wave, this program starts
with an empty image (all the indices of the array are initialized to 0). Each iteration of this solver
then populates the `current` array with the next guess of the solution and calculates the error between it
and the `previous` array. This updating takes place inside the `solve_poisson_helper` function. 
During this process we want BMP image files of the state of the solution to be created at a fixed interval,
we call this interval the granularity. That is, if we decide we want to see the state every 20 iterations
(i.e. a granularity of 20) we expect to have an image of what our closest guess to the solution is at 
iteration 20, 40, 60, ... and so on. In addition we want an output of the image when we hit the desired error.

The math required for each index of an iteration in our 2-D array is completely independent of any other
result in the array. This means that, if we wanted to, we could have an individual thread calculate the
result for each index entirely at the same time. A problem with this attribute is said to be embarrassingly
parallel. However, each iteration depends on the previous one. Therefore you need to make sure all the
indices of the previous iteration have been calculated before moving on (*hint, hint*).

To do all this image writing we provide a little BMP library. The only function you absolutely need
to use in it is `write_to_file`. We do provide some "lower level" functions inside of `bmp.h` in case
you would like to increase the parallelism of your code. This should be unnecessary however and is simply
a challenge to you if you would like to implement it. Just use function `write_to_file` in your parallel 
implementation at first. Remember, however, you probably don't want all your threads writing this file and you
need to make sure all the calculations are done before writing it (*hint, hint*).

##### Struct Explanation
	
There are three pointers to external memory in `poisson_struct`, which is defined inside of
poisson.h. The double pointers `current` and `previous` are the arrays for the calculated value of the current 
iteration and the previous iteration respectively. We need to keep both these arrays in memory as each
new iteration depends on the previous one. At the end of the iteration you may notice that we swap the
pointer values. This way we overwrite the solution from two iterations ago which is no longer needed.
The double pointer `target_image` is the function that we are trying to satisfy the poisson equation for.
The memory that these three `double **` variables point to are the same for every thread.

```C
typedef struct poisson_struct {
    double **current;
    double **previous;
    double **target_image;
    int iter;
    int n;
    int num_threads;
    int granularity;
    double epsilon;
} poisson_struct;
```

The other values are metadata that we use inside of solve_poisson to decide, amongst other things,
what section of `current` and `previous` a thread should work on. `n` is simply the size of the grid the user
requested be solved. `num_threads` is a hint as to the number of threads to be created. You are not
forced to create threads if you don't think it will be beneficial. `granularity` is how many
iterations to calculate before printing an image.

Once you look over the code you will notice that the metadata variables are just input from the user 
and are put in the `poisson_struct` in order for all the functions inside `poisson.c` to be as opaque
as possible. Any information from the outside that any part of the poisson equation solver may need
in its serial form is represented inside the struct. We expect you to add more elements to this struct
in order to accommodate the parallel implementation.

The `iter` variable is only really there to get returned to the user, it's simply the number of 
iterations that were run.

### Functions you must modify

`parallel_poisson` is the function we will call when we test your code. We do not care about the
details of the implementation of any other function. As long as the output BMPs are identical to the
reference implementation and you use your own barrier you will get full credit for correctness.

#### Functions you can modify

Any function definition or declaration inside `poisson_test.c`, `poisson.c`, `bmp.c` or
`bmp.h` is fair game to modify. We expect the signatures for the functions inside of `poisson.h` to
be unchanged. We highly recommend that you modify only the poisson files however. TAs will not
debug nor guide any modification to `bmp.*`.

#### Functions we recommend you modify

##### basic_equation::poisson_test.c

This function is provided inside of `poisson_test.c` as an example of a 
mathematical function that can be solved by our program. If you wish to input a different
mathematical function to the solver we recommend you copy and modify `basic_equation`.

##### parallel_poisson

We use this function as the primary interface with the solver. This is where you should spin up your
threads and handle the memory creation and cleanup.

##### solve_poisson

Here is where the bulk of the parallelization can be achieved. We expect you to use the
helper function to do the actual calculations based off of what thread is currently running
this function. **Please focus most of your attention on this function.**

##### poisson_setup

We provide this function as a convenience to the user. We allocate the "2-D" array of
doubles here. In addition we allocate the memory necessary for a `poisson_struct`
per thread. If you take a closer look at the implementation of this function you will notice
that we're actually allocating each of the "2-D" arrays as a single piece of memory. This helps
the compiler and the machine implement optimizations that make your code faster.

##### poisson_destroy

Here we clean up all the memory allocated to each the `poisson_struct`. Since many resources
are shared between threads `poisson_setup` didn't need to allocate a `u` or `uo` array
for each struct for example. Don't be alarmed by the way we free things in here it's only 
done this way because of the 1-D to 2-D abstraction we did in setup.

##### Notes

You may notice a lot of `N+2` floating around the code. This is because we want the boundaries of the
matrices `u` and `uo` to always be 0. Therefore we allocate an additional 2 rows and columns in our
arrays. If you examine the manner in which the solution is calculated inside of `solve_poisson_helper`
it should be obvious why we need to give ourselves this little bit of extra space and to set it to an
arbitrary value (think about going out of bounds in the array).

### Compile and Run

Running
{% highlight bash %}
make
{% endhighlight %}
will make both your barrier_test and poisson_test binaries.
{% highlight bash %}
make reference
{% endhighlight %}
will use your test files with the reference implementations. Please tell us if you see
something that you think is wrong with the references. This is a young lab.
{% highlight bash %}
make debug
{% endhighlight %}
will make debug binaries for all the code you have written.

You can run your tests any which way you would like but we have given you a simple interface in
`poisson_test.c`. You can run the test this way:

{% highlight bash %}
./poisson_test <size> <num_threads> <granularity> <epsilon>
{% endhighlight %}

Where size is the size of the grid we would like to solve over, num_threads is the number of threads
to be used, granularity is the number of iterations to calculate before writing an image and epsilon
is the desired precision of the calculation.

We recommend using a small value for size and large granularity and epsilon values until you are
fairly certain that your code works. An epsilon between 0.05 and 0.0005 is adequate.
**Be very careful when using a small granularity on sizes that will run for a long time. BMPs are 
uncompressed image files and will use up your filesystem quota very quickly if you are not careful.**

Some recommended inputs to use until you feel comfortable about the correctness of your code are:
{% highlight bash %}
./poisson_test 256 4 50 0.000005
./poisson_test 512 4 100 0.00005
./poisson_test 1024 8 150 0.0005
./poisson_test 2048 8 500 0.0005
{% endhighlight %}
where they should take an increasing amount of time. When testing with different sizes you will
probably notice some input that takes much longer than an input that is not much smaller than it.
This is normal. If you recall from 233 this is called a performance cliff and happens in this
application when the data no longer fits in a cache level, or in the cache at all.

## Grading Policy
   
60% of this lab will be based on correctness, 50% from barrier and 50% from poisson.
The following 40% will be based on performance compared to the reference implementation.
The 40% will be on a sliding scale and no you **do not need to be as fast or faster than the
reference to get full credit**, we will choose goals the vast majority of the class can achieve.

## Good luck!

####References for those who missed them in the docs

- Important: [Wiki page](https://github.com/angrave/SystemProgramming/wiki/Synchronization%2C-Part-6%3A-Implementing-a-barrier)
- Less Important: [Poisson Equation Explanation](./images/poisson.pdf)
