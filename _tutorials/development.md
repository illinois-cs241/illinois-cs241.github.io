---
layout: doc
title: "Development Guide"
learning_objectives:
  - Using the tools needed for CS 241
---

## Development in CS 241
In this course, we use Virtual Machines (VMs) for all our developmment. We will not support development in any other enviornment (e.g. EWS). We would like to stress that no matter what method you use to develop code for CS 241, test all your final code on your VM. The autograding environment is similar to your VM. Thus even though your code "works" on your machine, it may not work on the VMs and thus for the autograder.

For all registered students in the course, you will receive a VM in the CS Department’s VM Farm provisioned by EngrIT. When your VM is provisioned you should receive an email from the course staff or Professor Angrave with information about your VM. If you registered late, please email the CS 241 Admin (you can find the email on our [staff page]({% link _pages/staff.html %})).

Once you have received your VM, you can connect to your VM via SSH. The VM number will be included in the email you received.

On Linux / Mac, you can do something like
```console
$ ssh <NETID>@{{site.data.constants.semester }}-{{ site.data.constants.department_code }}{{ site.data.constants.course_number }}-<NUM>.cs.illinois.edu
```

On Windows, you can use an SSH client like [PuTTY](https://www.putty.org/).

Note that if you are not connected to on-campus internet, you will need to use a Virtual Private Network (VPN) to connect to your VM. Instructions on downloading and using the UIUC VPN can be found [here](https://answers.uillinois.edu/illinois/98773). An alternative to using the UIUC VPN is to SSH twice. You can first SSH into your EWS account and then into your personal VM. Just remember that this causes potentially double the network lag!

## Installing other Things

This is your VM! Install whatever you want on it (given that it is school appropriate). That is, you can install `vim` or `emacs`. If you've ever wanted to become terminal-savvy, this is definitely the course to do it.

If anything is unclear, either post on the course forums or ask your TAs/CAs/fellow students! **Be careful about messing up your VM.** If your VM ever gets into an unusable state, please make a private post in the course forums **with your VM number**, and we will try to resolve it.

## Provisioning a local VM using Vagrant

If you are taking the course remotely and have slow internet when connected to the Campus VPN, you can set up a VM locally (on your own computer) using Vagrant. [This page]({% link _tutorials/development_vagrant.md %}) has instructions on how to do that.

**Note: Your EngrIT-provisioned VM is still the authoritive place for final testing. Your local Vagrant VM is just a way to help remote students with development.**
