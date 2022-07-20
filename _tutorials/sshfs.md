---
layout: doc
title: SSHFS Workflow Tutorial
---

## SSHFS?

SSHFS is a tool that allows you to mount any directory from a remote machine on your local machine, and consequently use your favorite text editor/IDE/code editing environment and still be able to compile and run your code on the remote machine.

Using SSHFS means that you don't have to include a `git commit -A -m "asdf"` and `git pull origin master` in between every small change, ad your machine can cache the files so you don't have to deal with network lag. Essentially, SSHFS will allow you to directly edit any files that exist on a remote machine.

## Installation

You need to install SSHFS on your own machine (Windows, Linux, or MacOS).

### Ubuntu/Debian

You can easily install SSHFS using apt-get as follows:

```
sudo apt-get install sshfs
```

### MacOS

On MacOS, you can install SSHFS via FUSE and SSHFS from the [osxfuse site.](https://osxfuse.github.io). You will want to download both packages.

Alternativey, if you have [Homebrew](http://brew.sh) installed, you can also install it using these two commands:

```
brew cask install osxfuse           # installs osxfuse
brew install sshfs                  # installs sshfs
```

### Windows

For Windows, you can either install it in the Ubuntu subsystem using apt-get, or download the win-sshfs package.

## Using SSHFS

If you are trying to mount your CS341 virtual machine, you **do** need to be on the campus network or VPN to be able to connect. These instructions apply to Linux and MacOS. Windows will be later.

### Mounting the Remote Filesystem

You'll want to make a directory to mount the remote file system on. Basically, sshfs will make it a "portal" from your machine to the remote machine. The directory you make will be used in the next step.

```
mkdir ~/remote
```

Then, you can use sshfs to mount the file system locally. You can also specify what the entry point is on the remote machine, rather than just starting at the root of the drive (/), you can have it start in your home folder (~) or any folder, really. replace <MOUNT_POINT> with the entry point you would like, or leave it empty to mount the root of the drive.

Mount point? The mount point is the directory that sshfs will give you access to. You can use the whole machine as that directory, or just your CS241 directory that contains all of your code.

```
sudo sshfs NETID@{{site.semester}}-{{cs241}}-???.cs.illinois.edu:/<MOUNT_POINT> ~/remote
```

After running this command, you will be asked for your password, and then the filesystem will be mounted locally. You can test this by doing `ls ~/remote` to see the contents of the remote filesystem.

Now, you can open any file that exists on the remote machine with any program you have installed on your own machine (Atom/Sublime Text/etc). Enjoy!

### Unmounting the Filesystem

Once you're done, you can unmount it with

```
sudo umount ~/remote
```

(Note: depending on where you made the mount point, you may not need sudo to unmount the remote filesystem.)

**WARNING**: When you unmount, your changes will no longer be saved, so make sure you have closed any remote files *before* unmounting the remote machine. In fact, if you have a file open in Sublime Text, and then unmount, the open file will become red, because Sublime will notice that it no longer has access to that file. You also do need to unmount before logging out or shutting down your machine, or potentially disconnecting from the Internet.

### Windows

On Windows, after sucessful installation of win-sshfs, you can open it to configure the remote filesystem. You will need to be on the campus network or VPN for this to work as well.

You'll want to add a new remote, and you can name it whatever you would like. Then, you enter the IP of the remote (for the VM's, it is `{{site.semester}}-cs241-???.cs.illinois.edu`). Then, enter your NETID and password in their respective boxes, and fill out the mount point you would like. You can specify / to mount at the root of the drive, and you can specify any other directory you would like. Select the drive letter, and click mount to finish the process of mounting the remote filesystem.

To unmount, you can right-click the drive letter you chose earlier in My Computer and click eject.

## Other Useful Links
I recommend that you set up SSH keys so that you don't have to type in your password everytime you want to mount the remote filesystem or simply ssh into the remote machine. Read more [setting up SSH keys](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2). DigitalOcean also has a lot more community tutorials that cover a wide range of useful topics when using Linux-based machines.
