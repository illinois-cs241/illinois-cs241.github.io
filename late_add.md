---
layout: doc
title: Getting Caught Up
---

## Quick Links

* Piazza: [https://piazza.com](https://piazza.com)
* Linux in Browser: [https://cs-education.github.io/sys/#playground](https://cs-education.github.io/sys/#playground)
* Wikibook: [https://github.com/angrave/SystemProgramming/wiki](https://github.com/angrave/SystemProgramming/wiki)
* Class Transcribe/Old Lecture Recordings: [http://classtranscribe.com/cs241](http://classtranscribe.com/cs241)
* Shared Github: [https://github-dev.cs.illinois.edu/{{ site.subject_code }}{{site.course_number}}-/{{site.semester }}/_release](https://github-dev.cs.illinois.edu/{{ site.subject_code }}{{site.course_number}}-/{{site.semester }}/_release)
* Grades: Compass
* Lecture Videos: [https://echo360.org](https://echo360.org)
* CBTF Quiz and Test Signup: [https://edu.cs.illinois.edu/testcenter/](https://edu.cs.illinois.edu/testcenter/)

## Join Piazza!

[Piazza](https://piazza.com) is the way that we communicate announcements to the rest of the class. It should have deadlines, which you can also find on our course web page (here) under the Labs and MP tab. You can register with your illinois email and pick the classes you are apart of. Search for CS241 and also the advising piazza for all things CS.

To get a sense of going on and where we are in the course, please read **all** the posts by instructors.

## Assignments

* Overdue assignment's deadlines will not be extended. **Though, It is in your best interest to read through the assignments that you missed in order to understand them (some of them will build of each other)**
* Email cs241admin@illinois.edu and say that you have added late (give the date you added if you can remember it).
* Email engrit-help@illinois.edu and tell them that added CS241 late. You will need git access and your own virtual machine. You should give them a bit of time. You can create your repository at [the repository creator](https://edu.cs.illinois.edu/create-ghe-repo/{{site.subject_code}}{{site.course_number}}-/{{site.semester}}/) Your repo should be available at

`https://github-dev.cs.illinois.edu/{{ site.subject_code }}{{site.course_number}}-{{site.semester }}/NETID`.

In that folder, you can read the [Know Your Tools](./know_your_tools.html) lab to get familiar with the VM, `ssh`, `git`, and any other tools you will need to be successful in the course.
* Ideally, we want (and most cases) require you to work on your assignment on your VM. Instructions on how to log in are on the Know Your Tools page. If you can't get your VM in time for an assignment to be do, you can do work on EWS -- just complete the steps below.
* The only non-programming assignment in the first few weeks is [Homework 0](https://github.com/angrave/SystemProgramming/wiki/HW0) if the assignment's deadline has not passed, submit the form on the know your tools page as soon as possible!
* We will not extend deadlines for programming assignments. Here are the steps to be able to start working on your assignments that are not past due. To check if an assignment's deadline has passed, check piazza or the lab and MP page. **If the Assignment has not been deployed to your git (you don't see a folder), complete the following steps**

Go to [https://github-dev.cs.illinois.edu/{{ site.subject_code }}{{site.course_number}}-/{{site.semester }}/_release](https://github-dev.cs.illinois.edu/{{ site.subject_code }}{{site.course_number}}-/{{site.semester }}/_release) and piazza and see what assignments are deployed and are not yet due.

Here are the terminal steps to update. Make sure you are in your git repository in the terminal.
```bash
git clone https://github-dev.cs.illinois.edu/{{ site.subject_code }}{{site.course_number}}-/{{site.semester }}/${NETID}
cd ${NETID}
git remote add release https://github-dev.cs.illinois.edu/{{ site.subject_code }}{{site.course_number}}-/{{site.semester }}/_release
git merge release master
git commit -m "Added assignment ${ASSIGNMENT}"
git push origin master
cd ${ASSIGNMENT}
```

Then to submit your work.

```bash
# Do work on the assignment
$ git commit -A -m "my_submission"
$ git push origin master
```

## Catching up on Material

Make sure you visit the course [Wiki Book](https://github.com/angrave/SystemProgramming/wiki) and read over the chapters relating to our [lecture schedule](./schedule.html#currentWeek) from when you joined.

If you are looking for the lecture handouts, they are in the _shared folder above. Feel free to ask about any material you don't understand on Piazza or Lab sections. There is a lot to go through in this course, so falling behind is not ideal.

## Labs

Go to your assigned lab section and tell the TA in charge that you added late, we will manually give you attendance until we can update the roster. Remember go to your registered lab section.

## Quizzes

We won't have quizzes for the first few weeks but if and when the time comes, go to the quiz and test signup in order to take register to take computerized quizzes at the testing facility in the basement of Grainger.
