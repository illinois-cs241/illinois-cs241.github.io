---
layout: doc
title: "Development Guide"
learning_objectives:
  - Using the tools needed for CS 341
---

## Development in CS 341

In this course, we use Virtual Machines (VMs) for all our development. We will not support development in any other environment (e.g. EWS). We would like to stress that no matter what method you use to develop code for CS 341, test all your final code on your VM. The autograding environment is similar to your VM. Thus even though your code "works" on your machine, it may not work on the VMs and thus for the autograder.

### Connecting to your VM

For all registered students in the course, you will receive a VM in the CS Department’s VM Farm provisioned by EngrIT. When your VM is provisioned you should receive an email about your VM. If you registered late, please email the CS 341 Admin (you can find the email on our [staff page]({% link _pages/staff.html %})).

Approximately 12-24 hours aftering registering for the course your VM host name should also be on this [page](https://csid-basic-apps.cs.illinois.edu/) - so that's another way to lookup your VM name.(VPN needed).

Once you have received your VM, you can connect to your VM via SSH. 
If you are not on the campus network you will need to install and use the campus VPN.

The VM number will be included in the email you received.

On Linux / Mac, you can do something like
```console
$ ssh <NETID>@{{site.data.constants.semester }}-{{ site.data.constants.department_code }}{{ site.data.constants.course_number }}-<NUM>.cs.illinois.edu
```

On Windows, you can use an SSH client like [PuTTY](https://www.putty.org/).

Note that if you are not connected to on-campus internet, you will need to use a Virtual Private Network (VPN) to connect to your VM. Instructions on downloading and using the UIUC VPN can be found [here](https://answers.uillinois.edu/illinois/98773).

An alternative to using the UIUC VPN is to SSH twice. You can first SSH into your EWS account and then into your personal VM. Just remember that this causes potentially double the network lag!

Additionally, make sure your VM is on and running, which can be done [at the VM dashboard](https://vc.cs.illinois.edu/). Use this [page](https://csid-basic-apps.cs.illinois.edu/) to lookup your VM name if needed.  
**Note: Both of the above links also require campus wifi or a VPN**


## Setting Up Git

You will be using `git` to submit all your assignments in this course. 

First go to [the repository creator](https://edu.cs.illinois.edu/create-gh-repo/{{site.data.constants.semester}}_{{site.data.constants.department_code}}{{site.data.constants.course_number}}/).

### Configuring Git

**Once you are in your VM**, you'll need to set up some global defaults. The name and email you input here will be used to mark your commits.

```console
git config --global user.name "FIRST_NAME LAST_NAME"
git config --global user.email NETID@example.com
```

Make sure to replace `FIRST_NAME` and `LAST_NAME` and `NETID@example.com` with your information. For example:

```console
git config --global user.name "Lawrence Angrave"
git config --global user.email "angrave@illinois.edu"
```

### Cloning your course repository

Checkout your repository as follows:

```console
git clone https://github.com/illinois-cs-coursework/{{site.data.constants.semester }}_{{ site.data.constants.department_code }}{{site.data.constants.course_number}}_NETID.git
```

Unfortunately, cloning a repository is not so easy. If you follow git's prompt and submit your username and password, you will likely see an error message like the following. If so, continue to the instructions in [Authenticating with GitHub](#authenticating-with-github).

```console
remote: Support for password authentication was removed on August 13, 2021.
remote: Please see https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication.
fatal: Authentication failed for 'https://github.com/illinois-cs-coursework/{{site.data.constants.semester }}_{{ site.data.constants.department_code }}{{site.data.constants.course_number}}_NETID.git'
```

### Authenticating with GitHub

There are three ways that we recommend for authenticating with GitHub

#### Option 1: Using [SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

1. Create an SSH key on your VM. Currently, we recommend the EdDSA key algorithm. You can create an EdDSA key with the command `ssh-keygen -t ed25519 -a 100`. This command generates a private and public key in the directory `~/.ssh`, where `~` denotes your home directory. It will prompt you to enter a name for the file storing your private key, and will generate a .pub file for your public key. It's not necessary to enter a password for the key.
2. Copy the ***public*** key to your clipboard. This is usually stored at a path like `~/.ssh/*.pub`, where `~` denotes your home directory. You can print out the public key to the terminal with the `cat` command.
3. Log into your GitHub account, navigate to Settings->SSH Keys, and follow the prompts to add a new SSH key by pasting in the ***public*** key on your clipboard.

_Please keep in mind that, when using this method, you will need to use SSH protocol URLs (e.g. `git@github.com:<repo>`), not HTTPS protocol URLs (e.g. `https://github.com/<repo>`)_.

#### Option 2: Using the GH Auth tool

GitHub provides their own command line tool for automating tasks, including authentication. The relevant documentation for the tool can be found [here](https://cli.github.com/manual/gh_auth_login).

In summary:

1. Install the `gh` tool using `sudo apt update && sudo apt install gh`.
2. Run `gh auth login` to authenticate.

#### Option 3: Using a Personal Access Token

You can think of a personal access token as a password with limited privileges and an expiration date. To create a token, go to [Github settings](https://github.com/settings/tokens), and click **Generate new token (classic)**.

We recommend only giving your new token **repo** scope, as that is all you need to push and pull from your repo.

Once the token is generated (be sure to save it somewhere), you must authorize the token for use with Illinois Single Sign-On (SSO). See GitHub's docs [here](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on).

Finally, you can run `git clone` again and use your newly generated token in place of your password. If you're using VSCode, you may need to log out of Github in VSCode (Using **Accounts** button at bottom left) and login again.

### Fetching from `_release`

Change your directory into your repo folder:

```console
cd {{site.data.constants.semester}}_{{ site.data.constants.department_code }}{{site.data.constants.course_number}}_NETID
```

You've probably noticed the repository is empty! In order to access the assignments, complete the following steps. This adds the `_release` repository as an extra remote, and this step must be completed every time you want to initialize your repository on a new machine.

```console
git remote add release https://github.com/illinois-cs-coursework/{{site.data.constants.semester }}_{{ site.data.constants.department_code }}{{site.data.constants.course_number}}_.release.git
git pull release main --allow-unrelated-histories --no-rebase
git push origin main
```

Whenever you start an assignment, you will need to run `git pull release main` to retrieve the starter code for the assignment.

## Install compiler and CS341 tools

_Your VM should already be provisioned with the required tools. This section is for reference in case you need to reinstall specific tools, e.g. in the case where your VM must be reset_

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

This is your VM! You can `sudo` and install whatever you want on it (given that it is school appropriate and compliant with [VM Farm policies](https://answers.uillinois.edu/illinois.engineering/page.php?id=104597))

You can install `vim` or `emacs`. If you've ever wanted to become terminal-savvy, this is definitely the course to do it! If you don't feel like learning a new language and want to stick to GUIs, you can also `ssh` into your machine and work on your code through VSCode, which is covered in greater detail in [this guide](https://cs341.cs.illinois.edu/tutorials/vscode).

If anything is unclear, either post on the course forums or ask your TAs/CAs/fellow students! **Be careful about messing up your VM.** If your VM ever gets into an unusable state, please make a private post in the course forums **with your VM number**, and we will try to resolve it.

You may find ssh-copy-id useful (A web search using Google/Duck Duck Go is useful). You can also configure MS Code and other GUI editors to work remotely. However some people still use 'out of the box' terminal-based editors like vi/vim that you can find (or install) on even the smallest of Linux distributions, and work even on low-bandwidth connections.

Have fun! In the worst case we can reset your VM back to its initial state.

## Can't login?

If you can't connect -

1. Not on the campus network? You will need to use the University VPN, [Cisco AnyConnect](https://answers.uillinois.edu/illinois/page.php?id=47507)

2. Check the status of your VM on the [VSphere console](https://vc.cs.illinois.edu/) and start/restart it if necessary. The VMs are shutdown daily at 5am, or perhaps you created a fork-bomb while working on the Shell MP. Additional Power on/reset instructions are at [this IT page](https://answers.uillinois.edu/illinois.engineering/page.php?id=108475)

3. Check [EngrIT Annoucements](https://status.engineering.illinois.edu/announcements.asp) and slow loading [Status Page](https://status.engineering.illinois.edu/) and the class forum


## Still have VM issues?

If you are sure that you follow the setup guidance correctly and you are on either the Campus VPN or the IllinoisNet WiFi but you still have VM issues (e.g. cannot access vc.cs.illinois.edu, cannot ssh into VM), then the fastest resolution will come from directly contacting EngrIT with your issue using their [form](https://go.illinois.edu/ewshelp). In the form, under the “Which lab(s) or remote resource(s) is your request about?”, you can type "CS VM Farm".

You can contact IT by directly emailing  [cs-vmfarm-help@illinois.edu](mail:cs-vmfarm-help@illinois.edu). This a  bit faster than the known 'standard' emails, [ews@illinois.edu](mail:ews@illinois.edu), and [engrit-help@illinois.edu](mail:engrit-help@illinois.edu) because these last two need an extra manual step to get your request to the right support people. 

<strong>Include as many details as possible (Course number, your VM hostname, time of error, type of error, and description of what you've tried.</strong>


## Provisioning a local VM using Vagrant (optional)

If you are taking the course remotely and have a slow internet connection when using the Campus VPN, you can set up a VM locally (on your own computer) using Vagrant. [This page]({% link _tutorials/development_vagrant.md %}) has instructions on how to do that.

**Note: Your EngrIT-provisioned VM is still the authoritative place for final testing. Your local Vagrant VM is just a way to help remote students with development.**
