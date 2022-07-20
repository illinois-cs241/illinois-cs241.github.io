---
layout: doc
title: "Decentralized Network"
learning_objectives:
  - Understanding network topology
  - Understanding high-level network protocols
  - Exploring common algorithms in distributed systems
---

# Overview

This section of the doc will introduce you to some fundamental concepts in networking and distributed systems, such as network protocol and decentralization. If you already feel *very* comfortable with these ideas, feel free to skip it and jump directly to the "Requirements" section. 

### What is a network?

A network is a set of processes (usually running on multiple machines, but not always) that communicate with each other over some communication channel (LAN, WiFi, Bluetooth, etc). Networks are incredibly useful because they can leverage the power of resource-sharing.

Here are some examples of networks: fax machines (*what's a fax machine?*), a city's traffic control system, an email system, a virtual private network, a website and its visitors, the iPhones of Uber drivers and riders, and--very generally--the internet.

### What is a network protocol?

The definition of a network protocol, according to Wikipedia, is this: *"A system of rules that allow two or more entities of a communications system to transmit information via any kind of variation of a physical quantity."* 

In layman's term, a network protocol is just an agreement made by all the nodes in a network on how to communicate with one another. It is like a blueprint: *You sent me a bunch of bytes over the network, how do I reconstruct your message and understand it?*

Here are some examples of network protocols:

- TCP (Transmission Control Protocol)
	- TCP is a protocol at the *transport layer*, which delivers streams of bytes between hosts communicating via an IP network.
	- The main purpose of TCP as a protocol is to make sure that packages are delivered reliably in the correct order and without error.

- HTTP (Hypertext Transfer Protocol)
	- HTTP is a protocol at the *application layer*. It is built on top of TCP, which guarantees that packages are sent and received in the right orders, and is used by browsers. So HTTP does not concern itself with low-level implementations of the network layer, but focuses more on higher-level functionalities like sessions, request methods (GET, POST, etc.), and status code.
	- Here is an example of what a HTTP request looks like:

			GET / HTTP/1.1
			Host: developer.mozilla.org
			Accept-Language: fr
	
	- Notice how HTTP includes headers that communicate informations such as what language is accepted. This is often the level of abstraction that most distributed systems deal with.

In this assignment, you will learn to develop your own protocol. Your protocol does not need to be as complicated as HTTP, but it needs to contain enough information to satisfy what your network tries to achieve. 

For example, if I'm designing a protocol for a chat service, my protocol might look something like this:

`[sender ID (4 bytes)][timestamp (8 bytes)][message size (4 bytes)][text message]`

In this protocol, the `sender ID` informs other nodes who is sending the message, `timestamp` can be used to order messages, `message size` helps nodes to verify that they've received the whole uncorrupted message, and `message` will contain the actual string message.

This is a minimalistic protocol that meets the requirement of the system. When designing your own protocol, think about: 

- What are the needs of your system?
- What information need to be communicated between nodes?

### What is a network topology?

Network topology is the structure, either graphically or logically, of a network. It essentially describes how nodes in a network are connected.

The simplest example of a network topology is the **client-server model**, where one computer (or ***node*** as often referred to in distributed systems) is a dedicated server, passively listening for incoming connections and serving requests. The rest of the network consists of clients, which actively make requests to the server and make requests.

<img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Client-server-model.svg" alt="client-server" width="400"/>

The underlying topology of a **client-server model** is the **star topology**, where every node is connected to a central hub. Note how none of the clients are directly communicating with each other, and every message needs to go through the server.

- *In distributed systems, however, the notion of client and server is often blurred. Since a node often needs to talk to multiple other nodes at the same time, both listening for new messages and sending out its own messages, it is often both a client and a server. In practice, this is very easy to implement: just create a long-running thread for server, and spawn as many client threads as needed on-demand.*

Another network topology you sometimes see in distributed systems is the **fully-connected network**, where every node is connected to each other:

<img src="https://vignette.wikia.nocookie.net/itlaw/images/7/78/454px-True_Mesh_Diagram.svg.png" alt="fully-connected" width="300"/>

A **fully-connected network** is extremely resilient, since:

- The cost of routing a message to a node is O(1) (by just sending the message directly).
- It can tolerates as many node failure as possible. In other word, if one node fails, all other nodes can still talk to each other.

However, **fully-connected networks** do not scale very well. The number of connections in the system grows quadratically (O(n^2)) with the number of nodes, which can easily over-flood a network. So in reality, this topology is only used for small networks with a relatively small number of nodes.

The most common topology in distributed systems is the **partially-connected network**, which broadly covers all networks in which the nodes are partially connected. Here are some common examples of **partially-connected** topologies (ignore the top right one):

<img src="https://upload.wikimedia.org/wikipedia/commons/9/97/NetworkTopologies.svg" alt="partially-connected" width="500"/>

Each topology has its own pros and cons. For example, a **ring network** performs really well under heavy network load; it can easily achieve mutual exclusion (by passing a token along the ring); and it is easy to configure. But a **ring network** is not fault-tolerant, and its communication delay is bottlenecked by the slowest connection between two nodes.

In this MP, you will implement a decentralized network topology that looks like a hybrid between a **star network** and a **fully-connected network**. But first, let's talk about what a decentralized network means.

### Decentralization

A decentralized system, described in one sentence, is a network in which no one node can control every other nodes. 

Formally, a decentralized system has two properties:

- It uses local computation to achieve global goal.
	- For example, averaging all values across a network can be done locally by each node averaging with its neighbor's averages, which eventually converges to a global average (sometimes called *average consensus*).
- It stores data locally. 
	- In other word, no single node has all the information in a network.

Examples of decentralized systems include:

- P2P applications like the original Skype, BitTorrent, and Napster.
- Blockchain applications like BitCoin and friends.
- Many techniques used in cloud applications are decentralized by nature.
	- For example, the distributed database *Apache Cassandra* uses a ring topology under the hood for fast querying.

##### Pros Of Decentralized Systems:

- Scalability:
	- Decentralized networks ***tend**** to scale really well, since instead of global computation they favor local communications, which means that the system is not limited by the resource (bandwidth, CPU, disk, etc) of a single node. 
		- *\*Note that, this is a generalization. In many cases, decentralization scales well, but there are very valid reasons why the majority of large scale systems (think Google or Facebook) are not truly decentralized. As you will read later, scalability is a very ambiguous metric.*

- Fault-Tolerance: 
	- Since there is no central node, there is no single point of failure. A well designed decentralized system can tolerate a portion of its nodes failing. In contrast, if a "super-node" fails in a centralized system, the whole system is at risk of failing.

- Trustless:
	- One of the main reasons why there has been so much hyper over decentralization is that a decentralized system doesn't require trust in a central authority. Now, the motivation for wanting a trust-less system often ties into politics and business incentives. But regardless, from a purely technical standpoint, achieving consensus without a central authority is quite impressive by itself.

##### Cons of Decentralized Systems:

- Security: 
	- In a decentralized network, *everyone* needs to maintain the network's integrity and security, which is very hard to do. Usually, a decentralized system tries to make sure that as long as the majority of the nodes are not compromised, the system will still function properly.
- Scalability:
	- Wait, didn't you just say that scalability is a pro for decentralized systems? Yes, but turns out, scalability does not grow in a single direction. As the network becomes larger and larger, it becomes harder and harder to **synchronize** the system. Sometimes, the cost to synchronize data and coordinate nodes can out-weight the benefit of decentralization.
		- So, in reality, scalability in decentralized system often becomes a trade-off between global computation cost and synchronization cost. 

# Requirements

For this MP, your goal is to design a network protocol for a decentralized network, and implement it using any language you want. 

### Topology

The network topology you will implement is a hybrid between a star network and a fully-connected network: 

<img src="graph.png" alt="topology" width="300"/>

In this network, the nodes in the middle (labeled **0**, **1**, and **2**) are fully-connected. They function as routers. Each router is at the center of a sub-graph that is star-shaped; there are 3 such sub-graphs: (**0**, **A**, **B**), (**1**, **C**, **D**), and (**2**, **E**, **F**). 

Notice that in order for the peripheral nodes (A, B, C, D, E, F) to talk to each other, they must send their message to a router node (0, 1, 2) first, then the router node will forward the message until it reaches the destination.

You will implement such a network consisting of 9 nodes. Node A, B, C, D, E, and F are peripheral nodes that can send message to each other through routers. Node 0, 1, 2 are router nodes that only forward messages but do not create any new message.

### Implementation

##### Features:

1. Design a simple network protocol for this MP and describe it in words.
2. Implement a program that can be run on multiple nodes and have the following features:
	- On a router:
		- Listen for incoming messages, and deliver the message to the correct destination node.
		- Print out all messages it receives for easy visualization.
	- On a peripheral node:
		- Get inputs from user that include: a message and a destination node ID. (You can use any format you want.)
		- Send the message to a router using your network protocol.
		- Listen for any incoming messages and print them out.

##### Network Configuration Files:

*You can test your code on localhost by using different ports. You can have the following setups:*

- Node A run on 107.0.0.1, port 4000.
- Node B run on 107.0.0.1, port 4001.
- Node 0 run on 107.0.0.1, port 4002.
- ... and so on ...

To make sure that the correct nodes are connected to each other according to the topology, you can hardcode the IP addresses and ports of all the connections a node has in a set of configuration files.

For example, node A will have the following configuration file:

	A 107.0.0.1:[port number for node A]
	0 107.0.0.1:[port number for node 0]

where the first line is the address and port node A itself will listen on, and the lines following are the connections to other nodes it will make.

Using the same example, node 0 will have the following configuration file:

	0 107.0.0.1:[port number for node 0]
	A 107.0.0.1:[port number for node A]
	B 107.0.0.1:[port number for node B]
	1 107.0.0.1:[port number for node 1]
	2 107.0.0.1:[port number for node 2]

where node 0 will listen on the address and port specified on the first line, and the other 4 lines specify connections to node A, B, 1, and 2.

This way, to run your code, you can simply open up 9 terminals and run the same program with 9 different configuration files to achieve the desired network topology!

##### Suggested Implementations:

- Router node:
	1. Load the network configuration file for the node into a lookup table.
	2. If it receives a message, try to find the destination node in the lookup table.
		- If the node is in the lookup table, which means the router is connected to it, simply send the message to the corresponding address and port.
		- If the node is not in the lookup table, forward the message to another router. 
			- **You must find a way to avoid having the same message forwarded back to yourself, creating an infinite forwarding loop. (hint: what information do you need to put into your network protocol to achieve this?)**

- Peripheral node:
	1. Load the network configuration file.
	2. Spawn a thread to listen for any incoming message.
		- If it receives any incoming message, print it out to the screen.
	3. Have the main thread read in user input in a while loop.
		- Parse the user input into a message and a destination node ID (which should be A, B, C, D, E, or F).
		- Send the message to the router that the node is connected to.

# Grading

- The MP will be hand-graded.
	- Different from CS 341 MPs, in this MP, you do not need to worry about design details. If there is something unclear about the requirement, feel free to use your own interpretation. We will not knock off points for small inconsistencies.
	- That being said, you must demonstrate a good understanding of the concepts. Your network protocol and your code must reflect what you learned from this doc.

- **In your repository, you must update the file `README.md` to include the following:**
	- Text description of the network protocol you designed.
	- Instructions on how to run your program.

- If you do not have a fully functioning program, don't worry--you will still get partial credits.
	- We don't expect you be become network-programming masters in three weeks! The points you get will largely reflect your understanding and effort.

# FAQs

- Can I use any language I want?
	- Yes.

- I don't know how to write networking code, how do I learn?
	- There are many great resources online:
		- For Python: https://realpython.com/python-sockets/
		- For C: https://beej.us/guide/bgnet/
		- CS341 WikiBook: 
			- C client: http://cs341.cs.illinois.edu/wikibook/networking-part-3-building-a-simple-tcp-client.html
			- C server: http://cs341.cs.illinois.edu/wikibook/networking-part-4-building-a-simple-tcp-server.html
		- When in doubt, Google!

- I don't understand a concept, what do I do?
	- Post a question on Piazza! We will try to answer them as fast as possible.
	- Email me at `shang9@illinois.edu` to set up an office hour.

- I'm worried that I can't finish this MP even though I have put in the effort.
	- We understand that this MP may be hard for someone who doesn't have any experience writing network code. Simply do your best, and document your ideas. We will grade fairly!
