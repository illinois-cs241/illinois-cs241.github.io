---
layout: doc
title: "Tsan Tutorial"
---

## ThreadSanitizer Overview

[ThreadSanitizer](http://clang.llvm.org/docs/ThreadSanitizer.html) is a tool
from [Google](http://google.com), built into clang (and gcc), to help you detect
race conditions in your code. For more information about the tool, see the
[Github wiki](https://github.com/google/sanitizers/wiki).

Note that running with tsan will slow your code down a bit.

## Example
```
#include <pthread.h>
#include <stdio.h>

int Global;

void *Thread1(void *x) {
    Global++;
    return NULL;
}

int main() {
    pthread_t t[2];
    pthread_create(&t[0], NULL, Thread1, NULL);
    Global = 100;
    pthread_join(t[0], NULL);
}
// compile with gcc -fsanitize=thread -pie -fPIC -ltsan -g simple_race.c
```

We can see that there is a race condition on the variable `Global`.
Both the main thread and the thread created with `pthread_create` will try to changethe value at the same time.
But, does ThreadSantizer catch it?

```
$ ./a.out
==================
WARNING: ThreadSanitizer: data race (pid=28888)
  Read of size 4 at 0x7f73ed91c078 by thread T1:
    #0 Thread1 /home/zmick2/simple_race.c:7 (exe+0x000000000a50)
    #1  :0 (libtsan.so.0+0x00000001b459)

  Previous write of size 4 at 0x7f73ed91c078 by main thread:
    #0 main /home/zmick2/simple_race.c:14 (exe+0x000000000ac8)

  Thread T1 (tid=28889, running) created by main thread at:
    #0  :0 (libtsan.so.0+0x00000001f6ab)
    #1 main /home/zmick2/simple_race.c:13 (exe+0x000000000ab8)

SUMMARY: ThreadSanitizer: data race /home/zmick2/simple_race.c:7 Thread1
==================
ThreadSanitizer: reported 1 warnings
```

Yes! The ThreadSantizer report indicates that a thread T1 (created by the main
thread on line 13) read from the address 0x7f73ed91c078 on line 7. TSan thinks
this read is probably a data race, because it detected a write to the same
address, by the main thread, on line 14, and there is no synchronization in the
code. Suppose we add some locks:

```
#include <pthread.h>
#include <stdio.h>

int Global;
pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;

void *Thread1(void *x) {
    pthread_mutex_lock(&lock);
    Global++;
    pthread_mutex_unlock(&lock);
    return NULL;
}

int main() {
    pthread_t t[2];
    pthread_create(&t[0], NULL, Thread1, NULL);

    pthread_mutex_lock(&lock);
    Global = 100;
    pthread_mutex_unlock(&lock);

    pthread_join(t[0], NULL);
}
// compile with gcc -fsanitize=thread -pie -fPIC -ltsan -g simple_race.c
```

And run it:

```
$ ./a.out
```

TSan does not report any errors!


## Troubleshooting/FAQ

### Why GCC? We normally use clang
The verison of clang on the student vms ships with a buggy tsan.
GCC recently added support for tsan and the versions of gcc and libtsan available in the repos for the linux distribution we have on the vms does not have the same bugs.

### `/usr/bin/ld: cannot find /usr/lib64/libtsan.so.0.0.0`

Everyone should have the required libtsan installed, but there's a chance you do not.

If you don't run this:

```
sudo yum install libtsan
```
