---
layout: slide
title: Networking
---

## TCP/UDP

![TCP vs UDP](http://ithare.com/wp-content/uploads/BB_part41_v1a.png)

## TCP

![TCP Rabbit](http://ithare.com/wp-content/uploads/BB_part43_v3.png)

## ACK-Dance

![SYN SYN-ACK ACK](https://upload.wikimedia.org/wikipedia/commons/8/8c/Tcp_normal.png)

## Packet Size

![Size of Packet](https://web.archive.org/web/20210520052048if_/https://tr1.cbsistatic.com/hub/i/2015/06/03/596ecee7-0987-11e5-940f-14feb5cc3d2a/r00220010702mul01_02.gif)


## Diff

![Drfferences](https://www.bestvpnserver.com/wp-content/uploads/2013/09/UDP_vs_TCP.jpg)

<horizontal />

## The 4 Calls

## Socket

![socket](https://openclipart.org/image/2400px/svg_to_png/212249/rodentia-icons_preferences-system-network.png)

## Bind

![bind](https://web.archive.org/web/20170424145552/http://995642590.r.lightningbase-cdn.com/wp-content/uploads/2015/12/2015-12-15-Double-Bind-425x282px.jpg)

## Listen

![listen](http://calvaryfullerton.org/RichBlog/wp-content/uploads/2015/04/Listen.jpg)

## Accept

![accept](https://www.wikihow.com/images/thumb/c/c4/Accept-a-Diploma-Step-3-Version-3.jpg/aid346607-v4-728px-Accept-a-Diploma-Step-3-Version-3.jpg.webp)

## Connect

![connect](http://www.linkedintraining.net/wp-content/uploads/connecting-people.jpg)

## Important

Make sure to check errors for *every* call, networking can fail at any point.

<horizontal />

## The Gotchas

## Network Order

![Byte Ordering](https://web.archive.org/web/20191222042521im_/http://orca.st.usm.edu/~seyfarth/network_pgm/byte_ordering.png)

## Sock Options

Make sure to set socket options to reuse to enable effective debugging of the server. Why does linux do this for sockets?

## Signal Handler Safety

Most server applications are interupted through a signal, but you shouldn't do all of the cleanup in the signal handler because not every function is signal handler safe (think back to CS233). That means the often pattern we see is like below.

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

Try to modularize your functions so that everything is not in the main method. This is ideally because we **need** to tell the system that we are done using shared resources like sockets, and we need to determine when a socket goes "out of scope" -- we don't have RAII like in C++ so we have to determine that ourselves.

<horizontal />

## Nice to Knows

## Latency

![Latency numbers you should know](http://i.imgur.com/k0t1e.png)

## Dropped Packets

![Why packets get dropped](https://web.archive.org/web/20191222042522if_/https://www.isa.org/uploadedImages/Content/Standards_and_Publications/ISA_Publications/InTech_Magazine/2014/Sep-Oct/SO-2014-System-Int-figure1.jpg)

## UDP Example

```C
#include <errno.h>
#include <string.h>
#include <unistd.h>
#include <netdb.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char** argv) {
    while(1) {
        printf("Listening on port %s\n", portname);

        ssize_t bytes_recd=recvfrom(fd,buffer,sizeof(buffer),0,(struct sockaddr*)&source,&source_len);
        if (bytes_recd==-1) quit("recvfrom");
        if(bytes_recd == source_len)
            printf("Datagram > buffer - message truncated\n");

        // Print buffer contents
        write(1, buffer, bytes_recd);
        write(1, "\n",1);

        // Encrypt the message
        for(int i=0; i < bytes_recd; i++) {
            if( buffer[i] >= 64) buffer[i] ^= 1;
        }

        int flags = 0;

        size_t bytes_sent = sendto(fd, buffer, bytes_recd, flags, (struct sockaddr*) &source, source_len);
        if(bytes_sent==-1) {
            quit("sendto");
        }

        if(bytes_sent == bytes_recd ) printf("Replied\n");
        else  quit("write");
    }
    return 0;
}
```

