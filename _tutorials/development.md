---
layout: doc
title: "Development Guide"
learning_objectives:
  - Using the tools needed for CS 241
---

## How to Make Your Life Easier

Hi there! We noticed that there was quite a bit of confusion about ssh, VMs, coding on your own computer, etc. We thought we would try to clear a few things up.

## VMs

A Virtual Machine is an emulation of a computer system. Your personal VMs in this class are hosted somewhere on a server and are completely separate from your EWS account. You can use SSH to access your VM via the command line.

### How We Have Things Laid Out

We can divide our entire development environment for the class into 3 parts: your own computer, your personal VM, and EWS. EWS is the same environment as when you log into one of the computers in the labs. Your personal VM is what we will show you how to `ssh` into during lab, and is where you should be testing and developing your code as well.

In this course, we use VMs for all our development, so it is important that you learn how to use them. These VMs are part of the CS Cloud, and we will not support any other machines for grading. This means that you should test on your VM and and not any other machine -- this includes the CS 2XX VM you received in CS 225, EWS, or your local machine. This is to your benefit, since the grading VM is identical to your VM.

Please `ssh` into your VM. The VM number is emailed to. The general format is

```console
$ ssh <NETID>@{{site.data.constants.semester }}-{{ site.data.constants.department_code }}{{ site.data.constants.course_number }}-<NUM>.cs.illinois.edu
```

into your terminal. If you want to use graphical editors, add the `-Y` flag to `ssh` to enable forwarding.  We highly recommend **not** to use GUIs in order to get comfortable with the command line (also because it is slow).

We would like to stress that no matter what method you use to develop code for CS 241, **test all your final code on your VM**. The autograding environment is similar to your VM. Thus even though your code "works" on your machine, it may not work on the VMs and thus for the autograder.


## SSH

SSH is a network protocol for initiating text­-based shell sessions on a remote machine. In plain English, this basically means you can access another machine remotely, sending information via the command line. SSH is normally completely text­-based, but one can use X11 forwarding to use graphical applications like gedit. **We do not support FastX as does 225.**


## SSH on Windows
If you would like to remotely access EWS or your 241 VM on your Windows computer, I recommend Xming and PuTTY.
Download [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)
Download [Xming](http://sourceforge.net/projects/xming/?source=directory)

[This is a great tutorial](https://wiki.utdallas.edu/wiki/display/FAQ/X11+Forwarding+using+Xming+and+PuTTY) on how to use and install Xming and PuTTY.

There are applications like Sublime and Notepad++ that can use SFTP (Simple File Transfer Protocol) to allow you to modify and save remote files. You could also look into Cygwin or a Windows Side git handler.

## SSH Mac/Linux
Connecting Mac/Linux is pretty easy because they share the same UNIX architecture as EWS and your VM. It really should just be as easy as opening a terminal and typing:

```console
$ ssh ­-Y <Hostname>
```

You should now be able to use programs with a graphic interface by starting them from the command line by typing, e.g.:

```console
gedit <filename>
```

gedit should then open with a GUI. It really is that easy. Remember, you can exit ssh by using the command:

```console
logout
```

## I AM OFF CAMPUS AND CANNOT CONNECT TO THE VM, HELP!
You can use a Virtual Private Network (VPN) to access on campus resources and then use Putty or SSH directly into your VM. Set up the VPN from the UIUC WebStore.

OR, you can SSH twice. First into your EWS account and then into your personal VM. Just remember that this causes potentially double the network lag!

Of course, there are many other ways to do things too. You could just work on your own machine or in EWS and upload all of your work to SVN and then open your VM and pull down all of your saved files and test, but we think that is tedious. If you have anything interesting you would like to add, please post below and share with your classmates; you will also be helping future students. 

## Installing other Things

This is your VM! Install whatever you want on it (given that it is school appropriate). That is, you can install `vim` or `emacs`. If you've ever wanted to become terminal-savvy, this is definitely the course to do it.

If anything is unclear, either post on Piazza or ask your TAs/CAs/fellow students! **Be careful about messing up your VM.**
