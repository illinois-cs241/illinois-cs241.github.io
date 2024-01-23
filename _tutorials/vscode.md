---
layout: doc
title: VS Code Tutorial
---

## Disclaimer
Although using VS Code can be helpful and possibly more intuitive than vim, we do not officially support it. This means that any problems you run into by using VS Code are up to you to solve.

## Introduction

Most of you have noticed that you must develop in your VMs for CS 341. This requires editing and writing code within the VM, which is usually done via the vim text editor. Vim is a great tool, and we highly encourage you to at least pick up the basics of vim so that you can be comfortable using it throughout your careers as software engineers. Some good resources are [https://learnvimscriptthehardway.stevelosh.com/](url), [https://vim-adventures.com/](url), and, for those who just want a basic cheat sheet, [https://vimsheet.com/](url).

All that said, we understand that it can be frustrating to use vim when you are working with large files and projects, and many of you would feel more comfortable using your traditional text editor of choice. We'll provide a series of steps here that will help you set up a development environment that lets you edit your code locally in VS Code (you can modify this process to use Atom or Sublime) and run the code in the VM.

To be clear, you will not be running your code locally. You will still need to ssh into the VM to run your code (e.g. make, make test, running binaries, etc). You will be editing your code in VS code, which will then be synced to the VM.

## Steps

1. Set up a VPN if you aren't on IllinoisNet. This is essential if you want to develop outside of IllinoisNet's network. Instructions for setting up a VPN are [here](https://techservices.illinois.edu/services/virtual-private-networking-vpn/download-and-set-up-the-vpn-client).

2. Open up a terminal or an ssh client (Putty, example) and ssh into your VM using the command: 
```console
ssh <netid>@<your vm address here>
```
Ensure that this successfully logs you into your VM, and navigate to an assignment directory. If this doesn't log in correctly, the following steps will not work. If you are unable to ssh into your VM, make a post on EdStem. You may also need to contact EngrIT.

3. Download and install VS code from [this website](https://code.visualstudio.com).

4. Follow the steps in the section "Getting Started" from [this website](https://code.visualstudio.com/docs/remote/ssh).

In particular, you should read the "Installation", "SSH host setup", and "Connect to a remote host" sections. The other sections might prove useful, but these three are the sections that dictate how to set up your remote client.

5. Try editing a file. On your VM that you've ssh'd into in your terminal from Step #2, cat the file you just edited, or click on the file in the file explorer. You should see that your changes have shown up on your VM! You can now edit your code in VS code and then run it in your VM while you are on the VPN or on IllinoisNet.
