---
layout: doc
title: "Epoll Demo"
permalink: epoll_demo
dueDates: "None"
---

# Introduction

## Epoll
Epoll is an API that allows monitoring multiple file descriptors to see if I/O is possible on any of them. So it basically waits for some event on a file descriptor. If it is "ready", say for a read operation, then it can be performed without blocking. It can be used as an edge-triggered or level-triggered interface and scales well to large number of file descriptors.
Note that edge-triggered API notifies the application only when changes occur on the monitored file descriptor. So there is a risk of blocking indefinitely if you read partial data from read file descriptor and the file descriptor was blocking. So you should be careful with using edge-triggered mode for epoll. Read the man pages to know more.

## Select
The select operator also has the same functionality as epoll, but uses a polling mechanism which iterates through the descriptors to find which one triggered an event (complexity here would be?). So this version is less scalable than epoll.

## Differences between select and epoll
- As mentioned earlier, epoll returns only the list of descriptors which triggered the events, unlike select operator. So we do not need to iterate through the descriptors, making it scalable.
- epoll does not have a limitation on number of file descriptors that can be monitored.
- epoll can attach meaningful context to the monitored event instead of socket file descriptors saving an additional lookup.
- You can have multiple threads waiting on the same epoll queue with epoll_wait(), unlike select operator.
- epoll however requires each socket to be added to the set, by calling epoll_ctl. This means there are two system calls required per new connection socket. So it may not be good for too many short lived connections.
- Edge triggering is prone to deadlocks which the developer needs to be careful about in epoll.

Note that we have given you another implementation of the server that just uses pthreads. This involves a new thread being spawned for each I/O operation from the client, thus making it potentially less efficient. The pthreads implementation is very similar to the chatroom server you worked on for the lab sections.

## Think about
What happens if a file descriptor that is being monitored is closed by another thread?

## What do you need to do?
Make sure to understand the different monitoring mechanisms available to you using man pages!

Run the server code as:
```
 /server <port number>
```

Then run the client as:
```
./simulator ./client <server IP> <port number> <number of clients>
```

The simulator will create _<number of clients>_ clients and all these clients will try to connect to server and send/read message. After creating processes, it will wait until all the children finish their read/write and return.

So an example would be:
- ./server 1025
- ./simulator ./client localhost 1025 1000

Above example assumes the server is running on the same host as the clients. If you use different machine to test this, change localhost to the address of that machine. For example, if you run server on vm 002, then clients can connect by
- ./simulator ./client fa16-cs241-002 1025 1000.

You can use the time function to determine the time it takes for the simulator to complete. Compare the runtimes for the different server implementations that use: epoll, select and pthreads.

Look at the code to see how the server and client processes work. There is a non-blocking read connection established on the server side, and monitors are created for the file descriptors corresponding to clients that have established a connection. A simple protocol is implemented between server and client, wherein a single message is transmitted between the two processes.

Peek into the files you have for more details on how the server and clients work. Also make sure to understand how you can use file description monitors so you can use them when writing high scale servers.
