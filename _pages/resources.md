---
layout: doc
title: Resources
---

# Resources

## Late Add Instructions
If you added late, check [this page]({% link _pages/late_add.md %}) to get caught up.

## Textbook References

An gentle and short introduction to system programming is Angrave's [CS 341 Crowd-Sourced Wikibook](https://github.com/angrave/SystemProgramming/wiki).
We also have the second iteration the [Coursebook](https://github.com/illinois-cs241/coursebook/wiki) That provides html, pdf, and wiki versions. 
Angrave's mini searchable video-introduction and playful _system programming-in-the-browser_ environment is at:
[mini lectures](http://cs-education.github.io/sys/) (Firefox and Chrome recommended).

No formal textbook is required, but if you really want to buy a physical book, we recommend the following custom book Angrave put together in 2007:

```
Introduction to Systems Concepts and Systems Programming
University of Illinois Custom Edition
Copyright 2007 by Pearson Custom Publishing
ISBN 0-536-48928-9
```

## Tutorials

* [Debugging Tutorial]({% link _coursebook/Background.md %}#debugging-and-environments)
* [Development Tutorial]({% link _tutorials/development.md %})
* [Emacs Tutorial]({% link _tutorials/emacs.md %})
* [SSHFS Workflow Tutorial]({% link _tutorials/sshfs.md %})
* [Shell Tutorial]({% link _coursebook/Appendix.md %}#shell)
* [VS Code Tutorial]({% link _tutorials/vscode.md %})


## How to Succeed

Is this course hard? Yes, but you are bright. You're taking computer science at UIUC. Schedule the time to do it. The two big changes from CS 225:

1. Your code is now much smaller than the complexity of the system around it.
2. No, we will not debug your code for you.

With lecture content, one lab, one MP, and one Quiz/Midterm every week or two, it can get easy to fall behind.

How to fail: some students do not take the time to learn how to debug and reason about system code and then end up complaining that office hours is too busy before deadlines. If you can't write correct solutions, you need to learn _exactly_ how C works, the _details_ of the system calls you are using, learn _better debugging_ skills and _reason_ behind synchronization. Only then can you spot and fix mistakes. Hard? Yes. Impossible? No.

There are no shortcuts to mastery, but we can help you get there. We recommend the [Feynman technique](https://www.youtube.com/watch?v=tkm0TNFzIeg) to learning. Remember, simply recognizing some text in a past exam or in the coursebook is not mastery of those concepts! Find ways to deeply engage your brain with the ideas by working actively with those ideas. Yes, this requires effort. Start the assignments early; expect to get stuck. Write code _slowly_; reason about every line of code you write. Experiment with your own mind hacks so that you have fun spending "time on task" with these materials.

## Forum Q-and-A: Search First. Don't Post.

We're using [Ed](https://edstem.org/) for our Question and Answer forum - check your email for the invite link. Before posting please search the forum to see if someone has already asked your question. Some questions where you need to include your netid (e.g. regrade requests) should be private posts.

#### Low-Effort Questions

We _will not_ accept "low effort questions":

*   "My code doesn't work, can someone look at my github?"
*   Questions that are already answered in a pinned post
*   Questions that are already answered in the docs
*   Questions that have already been answered many times before and can easily be found by searching
*   Questions that provide basically no information to go off of (Debugging? Tests? Valgrind? Anything?)

If we find you asking too many of these low-effort questions, then we reserve the right to remove your forum posting privileges. Hopefully these steps will lead you to the answer you're looking for, or at the very least help you find the answer yourself. Asking on our forum should not be the first thing you do when you have a problem. You're here to learn; we're not going to give you the answer every time you ask.

#### Debugging

Have you run it in Valgrind? Are you testing simpler cases that might show where the problem is? How about adding print statements or using breakpoints in gdb to figure out if you're actually getting to the code you think is running? Are you using the VM we provide to test the code? If you're getting erratic behavior, make sure you've fixed everything Valgrind complains about, as what you do wrong in one place can affect a completely unrelated piece of code. If you ask a question, make sure that you've made some effort to find the problem. Be prepared to provide some Valgrind log.

#### Documentation

A lot of questions can be answered simply by looking at the MP spec, pinned errata posts, or looking through a man page. Don't know where your specific question is answered? Use Ctrl+F with some keywords to search the page. Don't know how to use a function? Read the man page. It provides detailed info on how to use a function, and can even list some examples. Also note man page section 7. It's all explanations of different parts of the C library. There you can find how signal, epoll, and more work in practice.

#### Google Is Your Friend

Most questions can simply be answered by searching Edstem, or Googling your question. The chances are that someone has had your exact problem, and someone has answered it (especially near a due date when most people have already finished). Even if you don't find your exact answer, the questions you find can be close enough to what you're looking for. Here are some tips on Googling: [How to be a Google Power User](http://imgur.com/gallery/rNlQJuT) and [How to get more out of Google](http://imgur.com/gallery/hkmIT).

#### I Found Nothing. What Now?

If you are truly lost, can't find an answer in the docs, or in other questions, or the wide expanse of the internet, ask your question!

*   What's the problem you're having? (And give an example)
*   What have you tried? Have you tested your code?
*   What does Valgrind say? How about a gdb backtrace?
*   If you need to show code, don't take a screenshot. Copy it into a pre tag ("code" on the rich editor bar)
*   If referencing your repo please include your netid or URL so we can easily look it up, and make the post private
*   You can post anonymously if you wish

## CS 341 Admin

Please contact your section TA for most things.

For unusual administrative items (e.g. exam sickness, DRES, 1% issues, problems with your TA) then please email [cs341admin@cs.illinois.edu](mailto:cs341admin@cs.illinois.edu) and explain your scenario.

Note: We do not provide attendance misses for labs (this is not negotiable), especially for something that is 100% in your control like "I have an interview."

## Lawrence Angrave

Lawrence Angrave can often be found on the second floor of Siebel in or near SC2217. His office hours will be posted once the semester starts. He's also able to answer quick questions before or after most lectures.

## Graham Carl Evans

Graham Carl Evans has also taught this course. His office is on the third floor of Siebel 3209.
