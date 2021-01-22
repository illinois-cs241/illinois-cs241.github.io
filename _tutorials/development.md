---
layout: doc
title: "Development Guide"
learning_objectives:
  - Using the tools needed for CS 241
---

## Development in CS 241
In this course, we use Virtual Machines (VMs) for all our developmment. We will not support development in any other enviornment (e.g. EWS).

For most students in the course, you will need to setup a VM for development on your personal computer. A small number of students may receive VMs from the CS Department's VM Farm if their personal computer isn't powerful enough. Below are tutorials on how to setup / access your VMs.

## Local (Personal Computer) VM
We are using [Vagrant](https://www.vagrantup.com/) to provision VMs. Vagrant allows us to provide a consistent VM environment, similar to the environment in which assignments will be graded.

Here are the steps to setup your personal VM.

1. You will first need to install Vagrant. You can do this by following the instructions at [this page](https://www.vagrantup.com/docs/installation).

2. Next, you will need to download VirtualBox. You can do this by going [here](https://www.virtualbox.org/wiki/Downloads) and then downloading the correct version for your operating system.

3. Next, you will need to download a Vagrantfile. The Vagrantfile sets the enviornment for your VM, so please do not modify it. The libraries configured are the exact same versions as the ones that will be used when grading. We have 2 different versions depending on the number of cores your computer has. If your computer has 2 cores, download [this version](../resources/development/Vagrantfile_2_cores). If your computer has 4 or more cores, download [this version](../resources/development/Vagrantfile_4_cores).

4. Next, make a directory called `cs241-vm`. Move the downloaded file from step (3) into this folder, and rename the downloaded file to `Vagrantfile`.

Now, everything needed for your VM should be installed. Here are some commands that you will need to use to connect to your personal VM. All these commands should be run in the `cs241-vm` directory (i.e. the directory that contains the Vagrantfile).
1. `vagrant up` - This command turns on and configures the VM according to the Vagrantfile.
2. `vagrant halt` - This command shuts down the VM.
3. `vagrant ssh` - You can use this command to SSH into the VM. Make sure that the VM is already running before trying to SSH into the VM.

Here's the complete list of commands: [https://www.vagrantup.com/docs/cli](https://www.vagrantup.com/docs/cli).

If you want to use a VScode SSH plugin to edit the files on Vagrant VM, you can configure the plugin to connect to localhost port 2222 with user name "student" (e.g. `ssh student@localhost -p 2222`). No password is needed if you use the correct ssh config files.


## Remote (CS Cloud) VM
If you are receiving a VM from the CS VM Farm, you will not need to do any setup. When your VM is provisioned you should receive a message from EngrIT in the [secure messaging portal](https://my.engr.illinois.edu/smd).

Once you have received your VM, you can connect to your VM via SSH. The VM number will be in the message from EngrIT. 

On Linux / Mac, you can do something like
```console
$ ssh <NETID>@{{site.data.constants.semester }}-{{ site.data.constants.department_code }}{{ site.data.constants.course_number }}-<NUM>.cs.illinois.edu
```

On Windows, you can use an SSH client like [PuTTY](https://www.putty.org/).

Note that if you are not connected to Campus Wifi, you will need to use a Virtual Private Network (VPN) to connect to your VM. You should set up the VPN from the UIUC WebStore. An alternative to using the UIUC VPN is to SSH twice. You can first into your EWS account and then into your personal VM. Just remember that this causes potentially double the network lag!
