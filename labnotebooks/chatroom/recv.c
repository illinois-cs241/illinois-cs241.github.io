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

