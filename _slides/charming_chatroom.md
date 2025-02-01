---
layout: slide
title: Networking
---

## Networking Overview

![OSI Model](/images/assignment-docs/lab/slides/networking/osi.png)

## TCP vs UDP

![Differences](https://www.bestvpnserver.com/wp-content/uploads/2013/09/UDP_vs_TCP.jpg)

We focus on TCP in this class.

## TCP Handshakes

![SYN SYN-ACK ACK](https://upload.wikimedia.org/wikipedia/commons/8/8c/Tcp_normal.png)

## TCP Packet Layout

![TCP Packets](https://web.archive.org/web/20210520052048if_/https://tr1.cbsistatic.com/hub/i/2015/06/03/596ecee7-0987-11e5-940f-14feb5cc3d2a/r00220010702mul01_02.gif)

<horizontal />

## Networking Functions

## Socket

`socket` creates an endpoint for communication and returns a file descriptor that refers to that endpoint.

![image](https://user-images.githubusercontent.com/3259988/139183617-24a3226d-9bae-42fa-a651-d9fd58030102.png)

## Bind

`bind` associates an abstract network socket created with `socket` to an actual networking interface/address.

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

## Byte Ordering

- Convert your data to/from the "network byte order" to be architecture-agnostic.
- See `man 3 htonl` for more info.

<img src="https://web.archive.org/web/20191222042521im_/http://orca.st.usm.edu/~seyfarth/network_pgm/byte_ordering.png" width="50%" />

## Socket Options

- Use `setsockopt` to set `SO_REUSEADDR` on your socket.
- Otherwise the system won't immediately reallow you to use a socket after it's been closed.

## Signal Handler Safety

- Most server applications are interupted through a signal.
- Don't do cleanup in the signal handler! Not every function is signal handler safe.
- Do this instead:
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

<horizontal />

## Fun Facts: Latency

![Latency numbers you should know](http://i.imgur.com/k0t1e.png)
