---
layout: doc
title: Late Add
---

## Quick Links

* Piazza: [https://piazza.com](https://piazza.com)
* Linux in Browser: [https://cs-education.github.io/sys/#playground](https://cs-education.github.io/sys/#playground)
* Wikibook: [https://github.com/angrave/SystemProgramming/wiki](https://github.com/angrave/SystemProgramming/wiki)
* Class Transcribe/Old Lecture Recordings: [http://classtranscribe.com/cs241](http://classtranscribe.com/cs241)
* Shared Subversion: [https://subversion.ews.illinois.edu/svn/sp17-cs241/_shared/](https://subversion.ews.illinois.edu/svn/fa16-cs241/_shared/)
* Grades: [https://chara.cs.illinois.edu/gb/](https://chara.cs.illinois.edu/gb/)
* Lecture Videos: [https://recordings.engineering.illinois.edu:8443/ess/portal/section/2df91b3e-88f7-4554-8a2e-91a173f23332](https://recordings.engineering.illinois.edu:8443/ess/portal/section/2df91b3e-88f7-4554-8a2e-91a173f23332)
* Quiz and Test Signup: [https://edu.cs.illinois.edu/testcenter/](https://edu.cs.illinois.edu/testcenter/)

## Join Piazza!

[Piazza](https://piazza.com) is the way that we communicate announcements to the rest of the class. It should have deadlines, which you can also find on our course web page (here) under the Labs and MP tab. You can register with your illinois email and pick the classes you are apart of. Search for CS241 and also the advising piazza for all things CS.

To get a sense of going on and where we are in the course, please read all the posts by instructors.

## Assignments

* If you added the course after an assignment is due, that assignment is forgiven. **It is in your best interest to read through the assignments that you missed in order to understand them (some of them will build of each other)**
* Email engrit-help@illinois.edu and tell them that you late added CS241. You will need SVN access and your own virtual machine. You should give them a bit of time. Once you have SVN you can access it at
`https://subversion.ews.illinois.edu/svn/sp17-cs241/NETID/`.
In that folder, you can read the [Know Your Tools](./know_your_tools.html) lab to get familiar with the VM, `ssh`, `svn`, and any other tools you will need to be successful in the course.
* Ideally, we want (and most cases) require you to work on your assignment on your VM. Instructions on how to log in are on the Know Your Tools page. If you can't get your VM in time for an assignment to be do, you can do work on EWS -- just complete the steps below.
* The only non-programming assignment in the first few weeks is [Homework 0](https://github.com/angrave/SystemProgramming/wiki/HW0) if the assignment's deadline has not passed, submit the form on the know your tools page as soon as possible!
* We will not extend deadlines for programming assignments. Here are the steps to be able to start working on your assignments that are not past due. To check if an assignment's deadline has passed, check piazza or the lab and MP page. **If the Assignment has not been deployed to your SVN (you don't see a folder), complete the following steps**

Go to [https://subversion.ews.illinois.edu/svn/fa16-cs241/_shared/](https://subversion.ews.illinois.edu/svn/fa16-cs241/_shared/) and piazza and see what assignments are deployed and are not yet due.

Here are the terminal steps to update. Make sure you are in your subversion repository in the terminal.
```bash
cd ${NETID}
svn export https://subversion.ews.illinois.edu/svn/fa16-cs241/_shared/${ASSIGNMENT}
svn add {ASSIGNMENT}
svn commit -m "Added Assignment %s"
cd {ASSIGNMENT}
```

Then to submit.

```bash
# Do work on the assignment
svn ci -m "my_submission"
```

## Catching up on Material

Make sure you visit the course [Wiki Book](https://github.com/angrave/SystemProgramming/wiki) and read over the chapters relating to our [lecture schedule](http://cs241.cs.illinois.edu/schedule.html#currentWeek) from when you joined.

If you are looking for the lecture handouts, they are in the _shared folder above. Feel free to ask about any material you don't understand on Piazza or Lab sections. There is a lot to go through in this course, so falling behind is not ideal.

## Labs

Go to your assigned lab section and tell the TA in charge that you are a late add, we will manually give you attendance until we can update the roster. Remember go to your registered lab section.

## Quizzes

We won't have quizzes for the first few weeks but if and when the time comes, go to the quiz and test signup in order to take register to take computerized quizzes at the testing facility in the basement of Grainger.
