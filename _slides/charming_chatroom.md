---
layout: slide
title: Networking
---

## TCP

![image](https://user-images.githubusercontent.com/3259988/139184799-efe5eae4-b92c-439f-9143-ba8d3901e734.png)

## SYN/ACK Dance

In order to establish a TCP connection, one party must send a SYN packet to the other, receive a SYN-ACK packet back, and finally send an ACK packet.

![SYN SYN-ACK ACK](https://upload.wikimedia.org/wikipedia/commons/8/8c/Tcp_normal.png)

## TCP Packet Layout

![Size of Packet](https://web.archive.org/web/20210520052048if_/https://tr1.cbsistatic.com/hub/i/2015/06/03/596ecee7-0987-11e5-940f-14feb5cc3d2a/r00220010702mul01_02.gif)


## TCP vs UDP

In this class, we focus on TCP. Where might UDP be used?

![Drfferences](https://www.bestvpnserver.com/wp-content/uploads/2013/09/UDP_vs_TCP.jpg)

<horizontal />

## Networking Functions

## Socket

`socket` creates an endpoint for communication and returns a file descriptor that refers to that endpoint.

![image](https://user-images.githubusercontent.com/3259988/139183617-24a3226d-9bae-42fa-a651-d9fd58030102.png)

## Bind

`bind` associates an abstract network socket created with `socket` to an actual networking interface/address.

![image](https://user-images.githubusercontent.com/3259988/139183780-8ac6fec6-dd93-4c0a-8239-c08c287b5091.png)

## Listen

`listen` marks a socket as "passive", or ready to accept incoming connections. 


## Accept

`accept` accepts an incoming connection on a socket that has been listening.


## Connect


`connect` is used to connect a socket to a given address (which might have a socket listening for connections).


## Error checking

Make sure to check errors for *every* call, networking can fail at any point! All networking functions specify in their manpages what types of errors you might have to deal with.

<horizontal />

## A few gotchas

## Network vs Host Byte Ordering

![Byte Ordering](https://web.archive.org/web/20191222042521im_/http://orca.st.usm.edu/~seyfarth/network_pgm/byte_ordering.png)

## Socket Options

Make sure to set socket options to reuse to enable effective debugging of the server - otherwise, the system won't immediately reallow you to use a socket once it's been closed by your program. 

## Signal Handler Safety

Most server applications are interupted through a signal, but you shouldn't do all of the cleanup in the signal handler because not every function is signal handler safe (think back to CS233 interrupts). This pattern avoids this issue:

<vertical />

```
int is_running = 1;
int handler(){
	is_running = 0;
}
int main(){
	while(is_running){ /*...*/};

	close(...);
}
```

## Style

Try to modularize your functions so that everything is not in the main method. This is ideally because we **need** to tell the system that we are done using shared resources like sockets, and we need to determine when a socket goes "out of scope" -- we don't have RAII like in C++ so we have to determine that ourselves, and modularizing your code makes it easy to see when things are in/out of scope.

<horizontal />

## Fun facts

## Latency

![Latency numbers you should know](http://i.imgur.com/k0t1e.png)

## Dropped Packets

![Why packets get dropped](https://web.archive.org/web/20191222042522if_/https://www.isa.org/uploadedImages/Content/Standards_and_Publications/ISA_Publications/InTech_Magazine/2014/Sep-Oct/SO-2014-System-Int-figure1.jpg)
