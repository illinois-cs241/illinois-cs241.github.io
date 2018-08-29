---
layout: doc
title: "Debugging Guide"
learning_objectives:
  - Learning how to debug 241 Code
---

## Git

What is `git`? Git is a version control system. What that means is git stores the entire history of a directory. We refer to the directory as a repository. So what do you need to know is a few things.

The first thing is you need to go to [the repo creator url](https://edu.cs.illinois.edu/create-ghe-repo/{{site.subject_code}}-/{{site.semester}}/) and make yourself a 241 github repository. If you haven't already signed into enterprise github, make sure to do so otherwise your repository won't be created for you.

After that, that means your repository is created on the server. Git is a decentralized version control system, meaning that you'll need to get a repository onto your VM. We can do this with a clone. 

```console
$ git clone https://github-dev.cs.illinois.edu/cs241-fa18/<netid>.git
```

This will create a local repsitory. The workflow is you make a change on your local repository, add the changes to a current commit, actually commit, and push the changes to the server.

```console
$ # edit the file, maybe using vim
$ git add <file>
$ git commit -m "Committing my file"
$ git push origin master
```

### Git Good

Now to explain git well, you need to understand that git for our purposes will look like a linked list.

![Git linked list commits](./images/git_history.png)

You will always be at the head of master, and you will do the edit-add-commit-push loop. We have a separate branch on github that we push feedback to under `_feedback` which you can view on github website. The markdown file will have information on the test cases and results (like standard out).

Every so often git can break. Here are a list of commands you probably won't need to fix your repo

* git-cherry-pick
* git-pack
* git-gc
* git-clean
* git-rebase
* git-stash/git-apply/git-pop
* git-branch

In addition if you are currently on a branch, and you don't see either

```
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
``` 

or

```
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   <FILE>
        ...

no changes added to commit (use "git add" and/or "git commit -a")
```

And something like

```
$ git status
HEAD detached at 4bc4426
nothing to commit, working directory clean
```

Don't panic, but your repository may be in an unworkable state. If you aren't nearing a deadline, come in to office hours or ask your question on Piazza, and we'd be happy to help. In an emergency scenario, delete your repository and re-clone (you'll have to add the `release` as above). **This will lose any local uncommitted changes. Make sure to copy any files you were working on outside the directory, remove and copy them back in**

## Make Commands

### Make

```console
make
```

Will make all of the targets, or all the assignments.

### Make clean

```console
make clean
```

to make sure there aren't any leftover object files. This will force recompilation of all the files as well

### Make Debug

```console
make debug
```

To generate a debug build. A debug build has things like variable names and line numbers which are super helpful for debugging. It will generate a file with `executable_name-debug`. When we get to multithreading assignments you can `make tsan` in order to get thread sanitization as well.


## Starting to debug - Valgrind

To test for memory errors, try

```console
$ valgrind ./secure_move-debug files/final.txt files/final_test.txt
```

Valgrind will give you helpful output like the line number and stack trace where a memory error occured as well as where that memory was allocated.

Using the test cases that you failed, design a test that would make the code fail and run valgrind on it to see where the error is.

The most likely options you will need to know for valgrind

```console
$ valgrind --leak-check=full ...
```

Which will check for leaks from all process/possible leaks and anything in between.

```console
$ valgrind --leak-check=full --show-leak-kinds=all ...
```

This will trace anything still reachable at the end of the program and report if you're cleanup method didn't clean everything up.

More about valgrind is below.

* [Valgrind](http://valgrind.org/docs/manual/QuickStart.html)

## GDB

In this course, you will need to know how to use GDB

Consider the simple program (you may be able to spot the bug already)

```C
#include <stdio.h>

double convert_to_radians(int deg);

int main(){
	for(int deg = 0; deg < 360; ++deg){
		double radians = convert_to_radians(deg);
		printf("%d. %f\n", deg, radians);
	}
	return 0;
}

double convert_to_radians(int deg){
	return ( 31415 / 1000 ) * deg / 180;
}
```

Let's say that we have a problem with our program. How can we use gdb to debug? First we ought to load GDB.

```console
$ gdb --args ./main
(gdb) layout src; #if you want an GUI type
(gdb) run
(gdb)
```

Hey that doesn't look right.

Want to take a look at the source?

```console
(gdb) l
1	#include <stdio.h>
2	
3	double convert_to_radians(int deg);
4	
5	int main(){
6		for(int deg = 0; deg < 360; ++deg){
7			double radians = convert_to_radians(deg);
8			printf("%d. %f\n", deg, radians);
9		}
10	    return 0;
(gdb) break 7 # break <file>:line or break <file>:function
(gdb) run
(gdb)
```
Huh the breakpoint didn't even trigger, meaning the code never got to that point. That's because of the comparison! Okay flip the sign it should work now right?

```console
(gdb) run
350. 60.000000
351. 60.000000
352. 60.000000
353. 60.000000
354. 60.000000
355. 61.000000
356. 61.000000
357. 61.000000
358. 61.000000
359. 61.000000
```

Well doesn't look like it. Let's see what is wrong.

```console
(gdb) break 14 if deg == 359 # Let's check the last iteration only
(gdb) run
...
(gdb) print/x deg # print the hex value of degree
$1 = 0x167
(gdb) print (31415/1000)
$2 = 0x31
(gdb) print (31415/1000.0)
$3 = 201.749
(gdb) print (31415.0/10000.0)
$4 = 3.1414999999999999
```

It looks like we make a casting error as well! We can change it and our program is fixed!

These are just the most basic things that you can do with the tools. We highly recommend that you read tutorials on these tools to effectively use them through out this course. Here are just a couple of promising links:


* [CppCon 2015: Greg Law "Give me 15 minutes & I'll change your view of GDB"](https://www.youtube.com/watch?v=PorfLSr3DDI)
* [GDB](https://www.cs.umd.edu/~srhuang/teaching/cmsc212/gdb-tutorial-handout.pdf)
