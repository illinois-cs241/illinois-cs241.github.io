---
layout: doc
title: "Regrade Test"
---

Regrades this semester are getting an extra twist. In addition to the two regrades offered, you can choose to do this optional piece for another (1) week of regrades. In order to do this, you'll need to think like a 241 CA. You'll need to create a test case for an assignment!

## Creating the Grading Folder

First you will have to choose an assignment to autograde. You can choose any assignment, just keep in mind that some assignments are easier to set up code test cases than other assignments. These are the steps to create the folder from scratch

```console
$ cd c241_folder/
$ cp -R $ASSIGNMENT regrade_test/
$ cd regrade_test/
$ chmod +wr Makefile
$ touch README.md
$ touch regrade_test.c
$ make clean # Don't commit object files
$ svn add .
$ svn ci -m "Committing initial regrade_test to svn"
```

If you ever want to change the assignement that you are doing the regrade execute the following commands and set up the assignment as before.

```console
$ svn -D regrade_test/
$ svn ci -m "Deleting regrade tests"
```

## Creating the Grading Test

The test should be entirely defined in a file called `regrade_test.c`. You should be able to call `make regrade_test` and be able to compile the executable `regrade_test`. The modifications to the makefile should just be as below

```
(...)

regrade_test: $(EXE_OBJS) $(OBJS_DIR)/regrade_test-release.o # May be $(EXE1_OBJS)
	$(LD) $^ $(LDFLAGS) -o $@

(...)

```

If you are creating a test for assignments like `malloc` where you have to run another executable using our hooks, it is sufficient to create another makefile entry that compiles that specific test.

```c
regrade_test: regrade_test.c
	$(GCC) $(CFLAGS_RELEASE) $< -o $@
```

```c
// Regrade test.c

int main() {
	// Your test goes here...
}
```

## Test Grading Criteria

The test should

* Return 0 on success 1 on failure. Any extra files/utilities to run should be inside the svn directory as well.
* The test should also be deterministic. Meaning, testing a threading library's efficiency should ensure that the results match. 
* The test should also have no memory leaks or tsan errors
* It should test any functions/executables that *you were required to implement*. Testing TA code will not count.
*  You should strive to test at the highest level possible. In the event that your test is entirely external functions (like you test an external makefile for parmake), you will need to give a lot of information in the `README.md` in addition to an output file with which we can diff to find out solution. Just know that we prefer if the test is automated because it saves time running through everyone's solution (try to see if you can formulate your code in terms of `system` and pipes).
* Be a good test, meaning that testing a simple aspect of the assignment like whether or not `free(malloc(1))` works should not. It should test an edge or corner case of an assignment, for example.
	* What happens when the heap is fragmented to 2.5 GB and your series of allocations cause any malloc that does not split or coalesce to fail.
	* What happens when you give parmake a bunch of parallel dependencies, a bottleneck dependency, and more parallel dependencies? Does it execute in the expected number of times?
	* What happens when you try to append to a line that doesn't exist?
	* It can be an existing edge case, but you'll have to put a twist on it (try to combine multiple edge cases).
* Wondering how we decide what is a good test? That is where `README.md` comes into play. 
	* Include how to run your code in your `README.md`
	* You have to justify why your test is good (by referencing the docs or a systems programming concept). You'll have to write about 1-2 paragraphs about why you think your test is good. There is no hard word count or limit, just be sure to provide a thorough justification.
* If you try to "cheat" the system by taking one of our test cases and modifying it slightly or sharing test cases you'll lose this week and the other two possible weeks of autograding. If you give an honest attempt, you don't need to worry about it.

## Manual Testing

In the event that our code becomes hard/impossible to test externally, we allow the option to do a manual test. Meaning that you have to provide a sequence of testing steps in your `README.md` and any expected output files committed to your svn. Please try to refrain from doing this because this increases the tournaround time for getting your test approved. In addition, you'll have to write 3-4 paragraphs justifying the regrade.

## Submission/Tournaround

As soon as you think you have a good test, please submit the form [here](./dead) and we will try to grade your test ASAP. If we think your test is good, you can go ahead and select a third week for regrades. If not you can edit and resubmit -- avoid spam though. In any event, we hope to have the results up by 1 week before classes officially end. This is so you can edit your submission form to accurately choose which assignments to regrade.

## Questions?

If you have any questions about the setting up the test, or the assignment, or what counts as an applicable test, make a piazza post! We are happy to help out.