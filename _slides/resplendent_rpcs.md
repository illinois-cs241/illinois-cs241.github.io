---
layout: slide
title: "Remote Procedure Calls"
authors: "Ishan & Bhuvan"
---

## Remote Procedure Calls

Remote procedure calls are a way to execute a procedure (ex. function) that exists in a different context. 

<vertical />

<table class="reveal" >
<tr>
<td>
POST /say HTTP/1.1
HOST: api.example.com
Content-Type: application/json

{"name": "Racey McRacerson"}
</td>
<td>
/* Signature */
function sayHello(name) {
  // ...
}

/* Usage */
sayHello("Racey McRacerson");          |
</td>
</tr>
</table>

<vertical />

<table class="reveal" >
<tr>
<td>
POST /say HTTP/1.1
HOST: api.example.com
Content-Type: application/json

{"name": "Racey McRacerson"}
</td>
<td>
/* Signature */
function clientContact(name) {
// ...
}

/* Usage */
if(request == “/ping}
clientContact(request.data);

</td>
</tr>
</table>

<vertical />

![UDP Communication](/images/udp_communication.png)

<horizontal />

## DNS Resolution

<vertical />

![DNS Resolution](/images/dns.png)

## UDP Code

```c
int sockfd = socket(AF_INET, SOCK_DGRAM, 0);
if (sockfd < 0) {
perror("socket");
}
int optval = 1;
// Let them reuse
setsockopt(sockfd, SOL_SOCKET, SO_REUSEPORT, &optval, sizeof(optval));
```

<vertical />

```c
struct sockaddr_in addr;
memset(&addr, 0, sizeof(addr));
addr.sin_family = AF_INET;
addr.sin_port = htons((uint16_t)port);
struct hostent *serv = gethostbyname(hostname);
```

<vertical />

```c
// Timeouts for resending acks and whatnot
struct timeval tv;
tv.tv_sec = 0;
tv.tv_usec = SOCKET_TIMEOUT;
setsockopt(sockfd, SOL_SOCKET, SO_RCVTIMEO, &tv, sizeof(tv));
```
