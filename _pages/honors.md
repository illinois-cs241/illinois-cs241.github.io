---
layout: doc
title: Honors
---

## Syllabus

Couldn't get enough systems programming from CS 341? Welcome to the honors section! This course is recommended for those who want to expand their systems knowledge with additional lectures and a semester long project in systems programming.

There will be lectures throughout the semester, usually every week or every other week, given by various members of the honors course staff. These lectures are intended to expose you to advanced topics in systems that are outside the scope of CS 341. On some weeks, we will have lecture activities to complement the lectures.

You are also required to propose and complete a project of your own. Your project should be related to systems programming and it should clearly demonstrate and build upon concepts learned in regular [and/or honors] CS 341 lectures. Once your project has been approved by course staff, you will be assigned a mentor who you will check in with weekly for progress reports and code review.

At the end of the semester, you will present your work to your peers. The presentation will consist of a demonstration of your project along with a brief explanation of your project and results. Your presentation should include what you learned working on your project, challenges faced, results (if any), etc.

## Grading
```
Semester-Long Project
- Project Proposal/Planning : 5%
- Weekly Check-ins          : 10%
- Midterm Presentation      : 15%
- Final Deliverables        : 30%
- Final Presentation        : 20%
```

We publish the same grading thresholds as the regular section of CS 341. Your project will be graded in a holistic manner against other projects in the class. Note that this does not imply only a handful of projects can receive an A; education is not a zero-sum game. Historically, grades have been assigned with a generous curve.

## Absences

We understand that student life is busy and schedule conflicts can arise. In exchange for requiring attendance at lectures, we will drop one lecture attendance grade, no questions asked. These drops are meant for conflicts that you have control over, such as a vacation or job interviews.

If you have a required conflict (e.g. an exam in another class), please notify course staff **ahead of time** and we will excuse your absence. If you have a sudden illness or other personal emergencies, please refer to the [CS 341 absence policy]({% link _pages/index.html %}#absences).

## Project

Requirements:

* Projects may be done in teams of 2 or 3 people; if you want to work alone or on a larger team, ask us first
* Your project should be novel to you and your partners. We want you to explore new things!
* Work on your project should take about 3 hours a week for each member of the team
* Your project must relate to systems programming in a meaningful way. If you aren't sure whether your idea meets this requirement, ask us in advance

After the first few weeks of the course, you will be required to submit a project proposal. Your proposal should include the following:

* Overview (Alternatively, “Explain it to me like I am five”)
* Purpose (Why are you doing this? Why is it interesting?)
* Expected workload distribution among group members
* Projected project milestones (What will you do in the first month? Second month? etc.)
* Challenges you expect will arise in working on this project

Project proposals should be submitted as a private post on Ed by the due date (we will specify the due date in lecture and on Ed).

The exact grading requirements of each project vary. You and your mentor will decide on a reasonable scope for your project at the beginning of the semester, though this target may move as appropriate throughout the semester.

## Presentations

Presentations will take place during the last week or two of class during the normal lecture time. Each group will have around 10 minutes to present their project to the class.

You should be sure to touch on what your project is, what interesting systems programming concepts were involved in your project, and any challenges you encountered along the way and how you tackled them. If you have more questions about what to include in your presentation, ask your mentor.

You should have some sort of visual presentation (Powerpoint, Google Slides, LaTeX beamer, etc.) to accompany your talk. Feel free to include screenshots of your project or pre-recorded demo videos. To avoid losing time to technical difficulties, live project demonstrations are not allowed; you must pre-record any demonstration you plan to give.

**Please email your presentation to course staff by 5pm on the day you are presenting** so that we have adequate time to load presentations onto one machine to reduce the overhead of switching presenting groups.

Remember that you do not have to have completed your project by the time you present. However, you should make sure you briefly cover any remaining work you plan to do.

## Weekly Check-ins

You are required to meet with your mentor on a weekly basis. The meeting can last up to an hour and you will typically go over what you did that week, what your goals are for the next week, and any roadblocks you encountered. To get full credit, you must meet with your mentor and display satisfactory progress on your project.

If your project requires research before beginning your design and implementation (i.e., figuring out what a filesystem is before implementing it), you should write up a short summary of your work for that week and share it with your mentor during your check-in. This should include what you learned that week, how it relates to your project, and what you plan to learn about going forward.

When you and your group start writing code, we expect you to use git and for each group member to commit their changes using their own account. Your commit history will be used in part to determine your individual contribution to the project. Keep in mind that a group project is a group effort; the group must coordinate who is doing what and what a fair work balance is between group members. Your mentor is here to guide you through roadblocks, check in on progress, and to answer any questions you have about the project. Your mentor is **not** a personalized debugger, nor are they an additional group member.

## The Team

| Name | NetID | Interests |
|:-----|:------|:----------|
| TBA | TBA | TBA |
## Lectures

Lectures can be watched at any time. The table below contains a suggested cadence.

<!-- Desktop Table -->
<table width = "100%" class="table">
  <thead>
	<tr>
	  <th>Date</th>
	  <th>Lecture Content</th>
	  <th>Slides</th>
	  <th>Videos</th>
	</tr>
  </thead>
  <tbody>
{% for lecture in site.data.honors_schedule %}
  <tr>
	<td scope="row">{{lecture.date}}</td>
	<td>{{lecture.content}}</td>
	{% if lecture.slides %}
	<td><a href="{{lecture.slides}}"><img src="./images/lab-icons/animation.png" alt='Slides'></a></td>
	{% else %}
	<td>
	</td>
	{% endif %}
	{% if lecture.video %}
	<td><a href="{{lecture.video}}"><img src="./images/lab-icons/video.png" alt='Video'></a></td>
	{% else %}
	<td>
	</td>
	{% endif %}
  </tr>
{% endfor %}
  </tbody>
</table>

## Ed

We will use Ed for this course to post announcements, lecture schedules, etc.

## Project Ideas?

Come check out what past students have created in the [past project page]({% link _pages/past_projects.html %}).

If not here are some project ideas

* GPU/Device Programming
* Networking
    * Decentralized Chat
    * Proxies/Firewalls/Encryption
    * Network Congestion
    * [Other Project] With Networking
    * Implementing Remote Procedure Calls
    * Messaging Queues
* Kernel Programming
    * Debugging with a Twist
    * Hacking the Kernel
    * High Performance System Calls
* Scheduling
    * Custom Scheduling
* MultiThreading
    * High Performance Threading Library with Purpose
* Memory Management
    * Garbage Collection
