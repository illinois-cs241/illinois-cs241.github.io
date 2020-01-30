---
layout: doc
title: VS Code Tutorial
---

## Disclaimer
Although using VS Code can be helpful and possibly more intuitive than vim, we do not officially support it. This means that any problems you run into by using VS Code are up to you to solve.

## Introduction

Most of you have noticed that you must develop in your VMs for CS 241. This requires editing and writing code within the VM, which is usually done via the vim text editor. Vim is a great tool, and we highly encourage you to at least pick up the basics of vim so that you can be comfortable using it throughout your careers as software engineers.

That being said, we understand that it can be frustrating to use vim when you are working with large files and projects, and many of you would feel more comfortable using your traditional text editor of choice. We'll provide a series of steps here that will help you set up a development environment that lets you edit your code locally in VS Code (you can modify this process to use Atom or Sublime) and run the code in the VM.

To be clear, you will not be running your code locally. You will still need to ssh into the VM to run your code (e.g. make, make test, running binaries, etc). You will be editing your code in VS code, which will then be synced to the VM.

## Steps

1. Set up a VPN if you aren't on IllinoisNet. This is essential if you want to develop outside of IllinoisNet's network. Instructions for setting up a VPN are [here](https://techservices.illinois.edu/services/virtual-private-networking-vpn/download-and-set-up-the-vpn-client).

2. Open up a terminal or an ssh client (Putty, example) and ssh into your VM using the command: 
```console
ssh <netid>@<your vm address here>
```
Ensure that this successfully logs you into your VM, and navigate to an assignment directory. If this doesn't log in correctly, the following steps will not work.

3. Download and install VS code from [this website](https://code.visualstudio.com).

4. Type Cmd + O (Ctrl + O on Windows) and open up the folder where you want your CS 241 code to live on your local machine.

5. Go to Code -> Preferences -> Extensions. In the search bar, type "sftp". Install the first extension (the author should be liximomo).

6. After the extension is installed, hit Cmd + Shift + P (Ctrl on windows). This should pull up a command window. Type "SFTP: Config" and hit enter when you find that command.

7. A config file should pop up. Edit the value corresponding to the "host" key to be your VM address. This is the \<semester\>-cs241-\<vm number\>.cs.illinois.edu address.

8. Set your username as your netid. Add a field in the JSON called "password" and map the value to be a string containing your password. Save the file, you should be good to go now!

9. Once again hit Cmd + Shift + P and type in "SFTP: List". Click enter on the top, and then navigate to your CS 241 directory. You'll need to go in home/ and your netid and navigate from there. Once you're in your directory, click the dot at the top that says current folder. Your files should start slowly showing up in the left column of VS code.

10. Try editing a file. On your VM that you've ssh'd into in your terminal from Step #2, cat the file you just edited. You should see that your changes have shown up on your VM! You can now edit your code in VS code and then run it in your VM while you are on the VPN or on IllinoisNet.