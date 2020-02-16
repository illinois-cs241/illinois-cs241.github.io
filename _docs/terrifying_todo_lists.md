---
layout: doc
title: "Terrifying TODO lists"
learning_objectives:
  - Understanding coreutils
  - Parsing text
  - Learning a scripting language
---


Welcome to CS 296's first lab! Unlike CS 241, this course only has labs (and not
every week!). Each lab will usually involve getting some hands on experience
related to our lectures. You will be given time in class to complete this
assignment. If you are unable to finish it by the end of the period, you have
until the end of this week to complete and submit your lab implementation. This
week, the lab is due at the end of this lab period. Your grade will be
determined based off of whether or not you made an attempt in good faith.

Today's lab is inteded to help you explore the concepts you have been learning
in CS 241 and also introduce, processing binary data and how to analyze a
program like a systems programmer!

## Obtaining honors labs

We have a seperate repo set up for honors labs which you can add a remote to
your own repository.

```
git remote add honors https://github-dev.cs.illinois.edu/cs241-sp19/_honors.git
git pull honors master --allow-unrelated-histories
git push origin master
```

You can then pull future labs by running `git pull honors master`.

## The task at hand

For starters, please read the todo.txt format that can be found here: [https://github.com/todotxt/todo.txt](https://github.com/todotxt/todo.txt)

Start by implementing a program that can parse the `todo.txt` format and display
tasks, sorting them by a user's choice of completion, due date, priority,
project, or tag. You must implement this parser/browser in bash, go or perl.
Course staff will officially support bash. You may use any standard utilities
installed on the VM.

Be sure to consider how your program will handle invalid inputs, how your
program provides a clean and usable interface to a user, and how the
data will be formated and displayed to a user.

To submit, push your code with `git push origin master` and we will grade this
assignment manually.

The goal of this assignment is to get you familiar with the environment systems
programmers work with. A large part of systems programming is being able to work
with various formats of data to analyse a scenario, such as sifting through logs
to find out why a kernel crashed or sorting through some timed output to find
which inputs to a program give you the best performance. To be able to work with
this kind of data efficiently, having mastery over a scripting languages such as
`bash`, `awk`, `perl`, `sed` (to a certain extent), is incredibly useful.
Furthermore, we hope that if you do this week's assignment in bash you will
explore the utilities availible on your machine which may help you throughout
the semester in 241 or in your project.

### Optional task
If you finish, continue onwards to design and implement a more 'effecient'
version of `todo.txt`. Efficiency can be determined based off of the following
criteria:

+ Size of file vs number of entries
+ Time taken to retrieve an entry based on some criteria
+ Time taken to insert entries into the file

Here are some hints to get you started:

+ Calling `read` frequently can impact performance due to the system call overhead.
+ When storing any data in a file, do you need to store a string representation?
+ What data structures have the least overhead when serialized to a file?
+ Can you compress the data you are storing?
