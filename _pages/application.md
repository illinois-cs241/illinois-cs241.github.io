---
layout: doc
title: "Course Staff Application"
---

## Introduction

Do you want to know how broadway works behind the curtain? Is there one MP that you think just isn't fair and could be made better? Do you want to flip the roles and mentor an honors project? Or perhaps you just can't get enough of system programming? Then consider becoming a course assistant for CS 341!

To apply, we will ask you to submit an application via google form (link at the bottom of this page). We will go over the applications after the deadline, and send out interview offers soon after. After all the interviews are complete, the offers will be sent out before the end of the break!

We have the following teams that you can join, and we will ask you to choose one or two primary team that interest you the most in your application. However, you will not be locked into the team you initially signed up for, and many of our best staff end up working in areas they did not start out in!

## Teams

### Primary
- Front Facing
- Assignment Development
- PrairieLearn
- Infrastructure
- Honors

### Secondary
- Data Analytics and Research
- Academic Integrity

We want to be completely transparent about what we look in our applicants. We are not simply looking for A+ students. A good grade is neither necessary nor sufficient to be a good course assistant. Different teams look for different set of skills in the applicants, which will be described in greater details below. However, we expect everyone to be passionate about system programming, be willing to learn about new systems and tools, and most importantly be a good communicator - whether it be collaborating with your teammates, creating and amending code documentations, or talking to the students.

Your responsibilities and time commitment will depend on the team too. In general, every CA will be expected to hold at least one lab section (1.5 hours / week), perform 2-4 hours of team specific work, and participate in meetings (up to 1 hour).

## Primary Roles

## Front Facing (Including Lab)

Illinois Computer Science has a wide variety of talent, ranging from those who know as much as our instructors, to those who are still learning to use the terminal. At some point, almost all of these students come to office hours and lab sections to get extra help. Whether it be drawing figures on the white board or stepping through GDB, the fruits of an instructor's labor are priceless. In fact, few things are more rewarding than helping a student understand and develop a passion for the subject you teach. This is the main responsibility of the front facing team.

In lab section, you will be helping run lab activities, helping students out with the labs, and explaining concepts at a high level. During office hours, we have a team of staff ready and eager to answer student questions. You will be hosting your own round-robin office hours, answering questions and clarifying concepts. In addition, you will be asked to monitor Edstem to ensure that student questions get answered. 

Last but not least, the front facing team is the eyes and ears of the entire staff team. We learn about ambiguities in asssignments and bugs in the autograder from student feedback, and you will be the one relaying them to the rest of the team.

### Skills Required

* Patience and empathy - Most of the time, you can fill the gap in a student's understanding of the material just by remembering why you struggled with the material and what helped you understand it. However, some students might not get the material even after the third time you explain it to them. You'll need to be patient and try different methods of explanation.
* A friendly personality and demeanor - Students will most likely be stressed and upset after debugging for several hours and waiting on a long queue. A lot of this tension is easily alleviated if you approach them nicely. It is important to never appear condescending or annoyed.
* Communication and teaching ability - Understanding is only half the battle to being an effective teacher. It helps to understand the material well and be comfortable with it, but you must be able to communicate the material well. You also have to be adaptable in the ways you explain things, since how you understand the problem might not be how your students best understand a problem.
* Debugging - It should go without saying that debugging is a critical skill to have when helping students. Most bugs can be found by effectively using GDB, Valgrind, and print statements. You should be able to look at a failed test case, and know what tools you could use to trace back to the bug at fault, and you should be able to walk a student through the steps.
* Assignment knowledge - Students will mainly come into office hours needing help interpreting the documentation or debugging code. You must be familiar with the assignments before you an help students master them.

### Expected Time Obligations

* Team Meetings (1 hr / week) - It is important for everyone on staff to be on the same page, and for everyone to be present to make key decisions. For front facing specifically, this is the time for summarizing student feedback and brainstorming improvements that can be made.
* Office Hours (2 hrs / week) - It should go without saying that as an front facing course assistant you will be hosting office hours. This is the time where you will put yourself on the queue and help students.
* Lab Sections (1 or 2 sections = 1.5-3 hrs / week) - Most lab sections will run about an hour and twenty minutes. You are expected to have read the documentation already and at a high level know how to solve the assignment. In the bulk of lab time, you will be going around helping students with the assignment. For the more challening MPs, you will also walk through the high level design and pitfalls with students using our slides.
* Edstem (1 hr / week) - It is also important to answer questions on Edstem, since labs and office hours are not available 24/7. Answering one question well on Edstem can potentially resolve a problem for the entire class.

## Assignment Development

Machine Problems and Labs are the meat and cheese of any programming course. These assignments are supposed to be rigorous enough so that students can fully apply their knowledge of systems, and interesting enough so that they have a memorable experience in the course. You will be responsible for improving existing assignments and fixing any issue that pops up, and occasioanlly creating brand new assignments.

Writing assignments involves coming up with a meaningful tasks where students can master the learning objectives. Writing these assignments involves a lot of time spent drafting on white boards and bouncing ideas around. As you are writing these assignments, you will have to ask yourself, "What am I trying to have the students learn?".

Finally, with any good assignment comes excellent documentation that is clear, concise, contextual, and correct. Also, the documentation should mirror what we are looking for in the autograder. One huge shift you'll have to get used to is writing code for an assignment must be perfect or near-perfect. Instead of passing our ~30 test cases, you'll have to be resilient against 300 students' edge cases.

### Skills Required

* Firm Knowledge of C and System Programming - As an assignment developer, you must really understand the things you write, since writing a bug in your MP is equivalent to writing 400+ bugs that get deployed to students. Any race conditions or memory leaks left in the provided code you write will be deployed to 400+ students. In class, you only need to get the test cases working, here you need to make sure that your code is resilient against all test cases, or you will end up with a bug in the assignment.
* Extensive Knowledge of Linux - As an assignment developer, you will need to be comfortable working in a Linux environment beyond a level that was required as a student. You may need to write makefiles, be prepared for obscure kernel conditions, understand process groups, and so on. Don't worry, we can teach you many of these!
* Written Communication - Clear specifications and informative examples are the distinction between a challenging but satisfying MP and an infuriating MP. The same can be said about test descriptions and error messages. You should be able to describe what we expect from students' code accurately and succintly, and be sensitive to ambiguities in the writing.
* Team-Oriented - If you don't mind the buzzword, we have a team of assignment developers that work on each assignment. You will need to collaborate with them in order to get your ideas and code across pull requests.

### Expected Time Obligations

* Team Meetings (1 hr / week) - You will need to meet with the rest of the assignment development team frequently. This is an excellent time for the team to separate out work for a divide-and-conquer strategy, since you will constantly be up against a deadline. These meetings will also be an excellent time to learn from course staff more experienced than you.
* Development and Testing (2-4 hr / week) - You will need to develop meaningful assignments, and doing so takes a lot of effort. Even after the team has written documentation and a TA solution, you will need to test the provided code thoroughly. This is to ensure the assignment is solid and understandable, and hopefully catch any potential bugs.
* Office Hours (0-2 hrs / week) - Although assisting students directly is not your main responsibility, office hours are an excellent venue to spot bugs and issues with the assignments. Leads and co-leads of the assignment development team will be expected to hold office hours to get first hand feedback.
* Lab Sections (1 or 2 sections = 1.5-3 hrs / week) - Ditto

## Infrastructure

We need a lot of code to support our code. Welcome to infrastructure, where the autograder is developed along with tools and scripts that the rest of the staff uses. You will be working on challenging problems in the domain of distributed systems by working on our course's very own Broadway-on-Demand auto-grader. We are always looking to add more features, and make this tool easier to use for students and staff.

We are also looking to automate the routine tasks that the staff team has to perform, such as managing permissions to codebase and material, deploying assignments, granting extensions and regrades, etc. There is plenty of projects that you can participate in.

### Skills Required
* Programming ability - You will most likely need a variety of skills. A little bit of Web development, and some knowledge of scripting knowledge (Python, shell scripting etc.). You also must have an aptitude for picking up skills independently as projects mature. In addition, we plan the software structures we build, and keep up with maintenance. Imagine this as a good combination of software engineer and project manager.
* Self-Directedness - Most of the work will be self directed. We will have a few meetings, but you will need to deliver a polished project by coming up with specifications, executing based on the best possible technologies and maintaining the project. You can receive help, but most of the work and success is on your own.
* Working in a team - Although most of the work is self directed, a few projects involve extensive collaboration either synchronously or asynchronously with other course staffs. You'll need to make sure that most of your work is readable to people who have not looked at your code as well as explainable at a high level to people who are just trying to understand the project.

### Expected Time Obligations
* Team Meetings (1 hr / week) - You will need to meet with the rest of the staff team to talk about your progress, and see what new projects might pop up as new tasks get created.
* Working on the projects (2-4 hr / week)
* Lab Sections (1 or 2 sections = 1.5-3 hrs / week) - Ditto

## PrairieLearn 

[PrairieLearn](https://prairielearn.readthedocs.io/en/latest/) (PL) is a web-assignment platform developed at UIUC. The CS341 PL team is concerned with creating and deploying extra-credit assignments called Pre-Labs (for now!). The goal is to make labs more educational, intuitive, and interactive -- because sometimes programming is not a good replacement for conceptual knowledge (e.g. MMAP lab). We envision that the Lab slides contain the intuitive information, and PL supplements this with neat problems for students to learn from. If you think this course has future potential with PL, or you believe some assignments are lacking and want to do something about it, then this team is for you.    
### Skills 

* Understanding of course content at detailed level. Being able to create thoughtful problems requires more knowledge than being able to simply get-by with the course content. 
* Being able to "fill in the gaps". Not only should you have a solid foundation in Systems Programming, but also the ability to pick up on nuance and details, because some of the content we will be targeting will have been overlooked in past semesters.  
* Be vocal, and be a team player. Ultimately, the TA's and professor decide which content gets through to PL, so it is up to you to discuss with them and plan out the exciting future of this course. Additionally, you are expected to work as a team to pump out assignments during the semester. This is going to require you to be on top of things as a group.  
* Lastly, you should be able to read PrairieLearn documentation. Bonus points if you understand Python, HTML, and Javascript - but these can be learned as you go along.

### Expected Time Obligations

* Team Meetings (1 hr / week) - It is important for everyone on staff to be on the same page. Meetings also serve as a means for more experienced course staff members to give less experienced course staff members advice.
* Working on PrairieLearn (2-4 hr / week)
* Lab Sections (1 or 2 sections = 1.5-3 hrs / week) - Ditto

## Honors

If you have a deep passion for systems and want to instill that passion in the course's one-percent, then this is the position for you. You get to mentor highly talented and passionate students in a semester-long project of their choosing. Note: It is not required for you to have taken CS 341 Honors (CS 199-341) to work on Honors staff.

### Expected Time Obligations

* Team Meetings (1 hr / week) - It is important for everyone on staff to be on the same page. Meetings also serve as a means for more experienced course staff members to give less experienced course staff members advice.
* Mentoring meetings (2 - 2.5 hrs / week) - The honors section has weekly one-hour meetings, and you will be expected to have two or three 30 minutee meetings with your assigned groups. The meeting will primarily cover what happened this past week and prepare for the next week.
* Lecture Development (4 - 6 hrs / week per lecture week) - You will be helping out prepare and deliver part of a lecture to honors students. This lecture needs to be well-documented, well-researched, and expertly given. Not every Honors CA will be helping out with the lecture every week, but the weeks you choose to teach spike the time spent on development.
* Lab Sections (1 or 2 sections = 1.5 - 3 hrs / week) - Ditto

### Skills

* Mentoring Ability - Students need guidance in the honors section, and it is your job to provide that! You will help students with their projects. Since topics vary widely, it's useful to be a jack-of-all-trades with respect to system programming topics, and you should have an excellent ability to advise and oversee groups of students.
* Deep Systems Programming Knowledge - These aren't surface level lectures. You need to either have or be willing to put in the time to understand these topics at an in-depth level. Think of it like taking an oral examination for a PhD. You need to know the topics you help out with in the utmost detail.

## Secondary Roles

## Data Analytics and Research
You will be doing exploratory data analysis, creating visualizations, and mining patterns from all of the data we collect as course staff. This roles is very open-ended, but you will get direction from senior staff members. Past projects have involved creating network visualizations for lab assignment partners, generating lab partners, graphing performance on assignments over time, studying factors that lead to student success in the course (such as commit timestamps, VM logins etc.). You will have the opportunity to work with Prof. Lawrence Angrave on research projects, which will look great on a graduate school application.

### Skills Required
* Programming skills - Python, R, MATLAB/Octave, Scala, and JavaScript are the dominant programming languages in data analysis and machine learning today. Experience with data analysis packages, such as pandas, matplotlib, numpy, d3.js etc. is a bonus!
* Statistics - Knowledge of basic statistics is invaluable especially if you are attempting to create a model, or estimate a distribution.
* Research experience - Past research experience, especially if it involved quantitative analysis will be extremely relevant for the tasks you will be performing.

### Expected Time Obligations
* Varies by project

## Academic Integrity
We take academic integrity seriously in this course, and screen every MP submission for signs of plagiarism. Your will be looking at suspicious submissions, and using your knowledge of the assignment to deduce whether plagiarism is actually happening.

### Skills Required
* Assignment Knowledge - The way MPs are structured means that successful student solutions will inevitably share similar design patterns, especially when starter codes are involved. You need to be able to sense when the similarity can be attributed to convergent ideas, and when it is indicative of work being copied.
* Familiarity of ChatGPT - We are seeing a trend of ChatGPT being used to generate code snippets that get submited as students' original work, although they might not even understand why the snippets work (or do not work). Therefore, we are exploring what we could do to detect this, and how should we handle this situation

### Expected Time Obligations
* Varies by projects

<form action="https://forms.gle/UmQSBYAXJt1ppQwMA">
    <button type="submit" class="apply-button">
        Apply
    </button>
</form>
