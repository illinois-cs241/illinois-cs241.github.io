---
layout: doc
title: "Vagrant Setup Guide"
learning_objectives:
  - Setting up a local VM using Vagrant
---

## Setup Instructions
We are [Vagrant](https://www.vagrantup.com/) to provision VMs. Vagrant allows us to provide a consistent VM environment, similar to your EngrIT-provisioned VM and the environment in which assignments will be graded.

Here are the steps to provision a VM on your own laptop using Vagrant:

1. You will first need to install Vagrant. You can do this by following the instructions at [this page](https://www.vagrantup.com/docs/installation).

2. Next, you will need to download VirtualBox. You can do this by going [here](https://www.virtualbox.org/wiki/Downloads) and then downloading the correct version for your operating system.

3. Next, you will need to download a Vagrantfile. The Vagrantfile sets the enviornment for your VM, so please do not modify it. The libraries configured are the exact same versions as the ones that will be used when grading. We have 2 different versions depending on the number of cores your computer has. If your computer has 2 cores, download [this version](../resources/development/Vagrantfile_2_cores). If your computer has 4 or more cores, download [this version](../resources/development/Vagrantfile_4_cores).

4. Next, make a directory called `cs241-vm`. Move the downloaded file from step (3) into this folder, and **rename the downloaded file to `Vagrantfile`**.

Now, everything needed for your VM should be installed. Here are some commands that you will need to use to connect to your personal VM. All these commands should be run in the `cs241-vm` directory (i.e. the directory that contains the Vagrantfile).
1. `vagrant up` - This command turns on and configures the VM according to the Vagrantfile.
2. `vagrant halt` - This command shuts down the VM.
3. `vagrant ssh` - You can use this command to SSH into the VM. Make sure that the VM is already running before trying to SSH into the VM.

Here's the complete list of commands: [https://www.vagrantup.com/docs/cli](https://www.vagrantup.com/docs/cli).

If you want to use a VScode SSH plugin to edit the files on Vagrant VM, you can configure the plugin to connect to localhost port 2222 with user name "student" (e.g. `ssh student@localhost -p 2222`). No password is needed if you use the correct ssh config files.
