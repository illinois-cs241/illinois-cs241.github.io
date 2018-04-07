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

* Return 0 on success and return anything else on failure. Any extra files/utilities to run should be inside the svn directory as well.
* The test should also be deterministic. For example, testing a threading library's efficiency should ensure that the results match after a series of runs. 
* The test should also have no memory leaks or tsan errors.
* It should test any functions/executables that *you were required to implement*. Testing TA code will not count.
*  You should strive to test at the highest level possible. In the event that your test is entirely external functions (like testing an external makefile for parmake), you will need to give a lot of information in the `README.md` in addition to an output file with which we can diff to find out solution. Just know that we prefer if the test is automated because it saves time running through everyone's solution (try to see if you can formulate your code in terms of `system` and pipes).
* Be a good test, meaning that testing a simple aspect of the assignment is not acceptable. For example, in malloc, whether or not `free(malloc(1))` doesn't segfault successfully terminates doesn't count as a good test. It should test an edge or corner case of an assignment, for example.
	* A test case for malloc when the heap is fragmented to 2.5 GB and a series of allocations cause any malloc that does not split or coalesce to fail.
	* What happens when you give parmake a bunch of parallel dependencies, a bottleneck dependency, and more parallel dependencies? Does it execute in the expected number of times?
	* What happens when you try to append to a line that doesn't exist? What should the output be?
	* It can be an existing edge case, but you'll have to put a twist on it (try to combine multiple edge cases).
* Wondering how we decide what is a good test? That is where `README.md` comes into play. 
	* Include how to run your code in your `README.md`
	* You have to justify why your test is good (by referencing the docs or a systems programming concept). You'll have to write about ~1-2 paragraphs-ish (see below) about why you think your test is good. There is no hard word count or limit, just be sure to provide a thorough justification.
	* Please err on the side of being verbose. We like to read :D.
* If you try to "cheat" the system by taking one of our test cases and modifying it slightly or sharing test cases you'll lose this week and the other two possible weeks of autograding. If you give an honest attempt, you don't need to worry about it.

## Manual Testing

In the event that our code becomes hard/impossible to test externally, we allow the option to do a manual test. Meaning that you have to provide a sequence of testing steps in your `README.md` and any expected output files committed to your svn. Please try to refrain from doing this because this increases the tournaround time for getting your test approved. In addition, you'll have to write ~3-4 paragraphsish (see below) justifying the test.

## Submission/Tournaround

As soon as you are finished, [please submit the form](https://docs.google.com/forms/d/e/1FAIpQLSedW7LgFMQ2uVgFtyDNuidSHultKVaC9gwsKs3rIwXEyPCFIQ/viewform?usp=sf_link) and we will try to grade your test ASAP. If we think your test is good, you can go ahead and select a third week for regrades. We will commit a file called `results.txt` to your directory with your status. If not you can edit and resubmit -- avoid spam because we are all humans. Excessive submissions will just be dropped like networking packets. In any event, we hope to have the results up by 1 week before classes officially end. The deadline for this is Reading Day at midnight, but note that the close it gets to the deadline the slower we will grade because this has to be hand graded.

## Example Code Test README

Here is a "proposal" for tester 12 in malloc:

_Tester 12 makes sure that you are splitting and coalescing your blocks. The first allocation allocates a large amount of memory. We first verify that the block of memory is a valid block of memory by verifying zeros, writing and verifying the write. After freeing the first allocation, we allocate half and a quarter of the space. If splitting is implemented correctly, then we should be able to read and write from the memory location and have it be seperate from the memory location that the quarter alloction takes up. We verify all the memory is zeroed out because that is calloc behavior. These memory regions should not overlap, so we check for that as well. We repeat this many times to make sure no new blocks are being created. We allow for wiggle room of the sizeof metadata struct which is why the blocks are not two allocations of SIZE/2._

_Using a worst-fit allocation scheme, this would test for if you have both splitting and coalescing because if you have splitting without coalescing you would reach the memory limit. Coalescing without splitting would also have the same effect. Under a best-fit, the tests pass if splitting and coalescing are both implemented or both not implemented but fail if either one is and the other isn't. Using first fit, the tests pass if splitting and coalescing are both implemented or both not, but again fail if one is and the other is not._


## Example Manual Test README

Here is a "proposal" for testfile10 in parmake


_In order to test this manually, make sure that you have the testfile10 in subversion. Then run the following command `./parmake -f testfile10 -j 4 > output.txt`. The test should output the stages in correct order as shown in `test.txt` meaning that `diff output.txt test.txt` should show no differences. The executable should also run in about 2.666 seconds. A failed implementation of parmake would have differences between the output and the test file or the test would take longer than 2.666 (by a much greater factor) to execute. The test should at maximum take 3 seconds to execute (or else it will be killed)._

_The purpose is to test for parallelism. We segment the makefile into a number of stages. Rule d prints first because it has no other dependencies. Then there is a cascading effect that rule a1 is run then a2-4 are run (in any particular order). Then, the execution returns and finishes the A stage. B does a similar process of events. If the implementation does not check dependencies in the right way, then the stages output will be completely messed up. If the implementation does not parallelize correctly, the sleeps will be run sequentially meaning that the code should take much longer to execute than finishing sequentially._

_The test then does a static diff against a makefile. If diff outputs anything, that means the dependencies were satisfied in the wrong order -- meaning we should give a message about rule dependencies not being satisfied. If the test runs too long, that means the dependencies are not handled correctly, or it is not parallelized -- meaning that we should give the appropriate message. There are also edge cases where rules are outputted twice or not at all -- that should be handled by diff as well._

_Other interesting additions could be to make sure the program doesn't segfault and make sure that there is no race conditions or any other adverse output. If we check that the CPU time was much greater than the actual runtime, that means the solution was busywaiting and should penalize from that (although the purpose of the test is to test against paralellism, we could use it for busy waiting). Other notes like cycle error should also trigger a failure._


## Questions?

If you have any questions about the setting up the test, or the assignment, or what counts as an applicable test, make a piazza post! We are happy to help out.
