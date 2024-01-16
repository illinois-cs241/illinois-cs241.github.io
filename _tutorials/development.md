---
layout: doc
title: "Development Guide"
learning_objectives:
  - Using the tools needed for CS 341
---

## Development in CS 341
In this course, we use Virtual Machines (VMs) for all our developmment. We will not support development in any other enviornment (e.g. EWS). We would like to stress that no matter what method you use to develop code for CS 341, test all your final code on your VM. The autograding environment is similar to your VM. Thus even though your code "works" on your machine, it may not work on the VMs and thus for the autograder.

For all registered students in the course, you will receive a VM in the CS Department’s VM Farm provisioned by EngrIT. When your VM is provisioned you should receive an email about your VM. If you registered late, please email the CS 341 Admin (you can find the email on our [staff page]({% link _pages/staff.html %})).

Once you have received your VM, you can connect to your VM via SSH. 
If you are not on the campus netowkr you will need to install and use the campus VPN.

The VM number will be included in the email you received.

On Linux / Mac, you can do something like
```console
$ ssh <NETID>@{{site.data.constants.semester }}-{{ site.data.constants.department_code }}{{ site.data.constants.course_number }}-<NUM>.cs.illinois.edu
```

On Windows, you can use an SSH client like [PuTTY](https://www.putty.org/).

Note that if you are not connected to on-campus internet, you will need to use a Virtual Private Network (VPN) to connect to your VM. Instructions on downloading and using the UIUC VPN can be found [here](https://answers.uillinois.edu/illinois/98773). An alternative to using the UIUC VPN is to SSH twice. You can first SSH into your EWS account and then into your personal VM. Just remember that this causes potentially double the network lag!

### Enabling password-less authentication with you VM

If you have generated an SSH key on your local machine (see [Using SSH keys](#using-ssh-keys) below), you can export your public key to your VM using the following command:
ssh-copy-id <netid>@<vm hostname>

## Authenticating with GitHub

There are two ways that we recommend for authenticating with GitHub

### Using SSH keys

GitHub provides an easy way to add SSH keys to your account. GitHub's documentation can be found [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=linux). This method has the added benefit that you can reuse the same SSH key for passwordless authentication to your CS341 VM.

In summary:

1. Create an SSH key on your local machine if you do not already have one. Currently, we recommend the EdDSA key algorithm. You can create an EdDSA key with the command `ssh-keygen -t ed25519 -a 100 -f`.
2. Copy the ***public*** key to your clipboard. This is usually stored at a path like `~/.ssh/*.pub`, where `~` denotes your home directory.
3. Log into your GitHub account, navigate to Settings->SSH Keys, and follow the prompts to add a new SSH key by pasting in the ***public*** key on your clipboard.

### Using the GH Auth tool

GitHub provides their own command line tool for automating tasks, including authentication. The relevant documentation for the tool can be found [here](https://cli.github.com/manual/gh_auth_login).

In summary:

1. Install the `gh` tool using `sudo apt update && sudo apt install gh`.
2. Run `gh auth login` to authenticate.

## Install compiler and CS341 tools

Here is the script used to provision the VMs this semester:

```sh
# update sources and install basic tools
sudo apt-get update && \
    apt-get install -y \
      software-properties-common \
      wget \
      bzip2 && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt-get update

# install python3.6
sudo apt-get install -y python3.10 python3-pip python2-dev python3.10-dev cmake iproute2 && \
    rm /usr/bin/python3 && \
    ln -s python3.10 /usr/bin/python3 && \
    ln -s -f /usr/lib/x86_64-linux-gnu/libc.a /usr/lib/x86_64-linux-gnu/liblibc.a

# install bulid-related tools
sudo apt-get install -y \
        clang=1:14.0-55~exp2 \
        libncurses5-dev=6.3-2ubuntu0.1 \
        rpcbind=1.2.6-2build1 \
        git=1:2.34.1-1ubuntu1.10 \
        strace=5.16-0ubuntu3 && \
    rm -rf /var/lib/apt/lists/*

# install the latest version of valgrind
wget https://sourceware.org/pub/valgrind/valgrind-3.21.0.tar.bz2 && \
  echo "b8b89b327732c12191306c3d31cfd4b1 *./valgrind-3.21.0.tar.bz2" | md5sum -c - && \
  bunzip2 valgrind-3.21.0.tar.bz2 && \
  tar xf valgrind-3.21.0.tar
cd ./valgrind-3.21.0
./configure && \
  make && \
  make install
cd ..
rm -rf valgrind-3.21.0

# valgrind fix: install debug symbols for libc
sudo apt-get install -y libc6-dbg
```

## Installing Other Stuff

This is your VM! You can sudo and install whatever you want on it (given that it is school appropriate and [VM Farm policies](https://answers.uillinois.edu/illinois.engineering/page.php?id=104597)

You can install `vim` or `emacs`. If you've ever wanted to become terminal-savvy, this is definitely the course to do it!

If anything is unclear, either post on the course forums or ask your TAs/CAs/fellow students! **Be careful about messing up your VM.** If your VM ever gets into an unusable state, please make a private post in the course forums **with your VM number**, and we will try to resolve it.


You may find ssh-copy-id useful (A web search using Google/Duck Duck Go is useful). You can also configure MS Code and other GUI editors to work remotely. However some people still use 'out of the box' terminal-based editors like vi/vim that you can find (or install) on even the smallest of Linux distributions, and work even on low-bandwidth connections.

Have fun! In the worst case we can reset your VM back to its initial state.

## Can't login?

If you can't connect -

1. Not on the campus network? You will need to use the University VPN, [Cisco AnyConnect](https://answers.uillinois.edu/illinois/page.php?id=47507)

2. Check the status of your VM on the [vsphere console](https://vc.cs.illinois.edu/) and start/restart it if necessary. The VMs are shutdown daily at 5am, or perhaps you created a fork-bomb while working on the Shell MP. Additional Power on/reset instructions are at this IT page](https://answers.uillinois.edu/illinois.engineering/page.php?id=108475)

3. Check [Engrit Annoucements](https://status.engineering.illinois.edu/announcements.asp) and slow loading [Status Page](https://status.engineering.illinois.edu/) and the class forum

4. Contact IT by emailling [cs-vmfarm-help@illinois.edu](mail:cs-vmfarm-help@illinois.edu). Include all relevant details (your VM hostname and your netid, and description of what you've tried.)


## Provisioning a local VM using Vagrant

If you are taking the course remotely and have slow internet when connected to the Campus VPN, you can set up a VM locally (on your own computer) using Vagrant. [This page]({% link _tutorials/development_vagrant.md %}) has instructions on how to do that.

**Note: Your EngrIT-provisioned VM is still the authoritive place for final testing. Your local Vagrant VM is just a way to help remote students with development.**
