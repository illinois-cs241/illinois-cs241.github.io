---
layout: slide
title: Memory Mapped IO
author: Bhuvan
---

## Preliminaries

<vertical />

Binary Trees!

![](https://2.bp.blogspot.com/-SKDmvFFeO4k/V_0pb7xvuSI/AAAAAAAABTo/UlEmSIX29Qg3eZBFcHaq3SETawISEYewwCLcB/s1600/deserialized-binary-tree.png)

<vertical />

This is how we store them in arrays!

![](http://d2vlcm61l7u1fs.cloudfront.net/media%2F858%2F858e0ee4-80a8-4837-8e97-c1925cdbb231%2FphppObXfG.png)

## Our Old Friend: Pointer Arithmetic

```C
typedef struct {
	uint32_t left_child;
	uint32_t count;
	float price;
	char word[0];
} BinaryTreeNode;
```

## What is word[0]?

<horizontal />

## C-Files

## Fseek Juggle

![](http://forum.falinux.com/_clibimages/073_fseek.png)

## More Juggling

![](http://image.slidesharecdn.com/14-fiileio-130524022237-phpapp01/95/14-fiile-io-31-638.jpg)

Where is the end pointer?

## What to do

Read in the `FILE*`, skip the first 4 bytes and then treat the next few bytes as the meta data for the binary tree node, then after that is the string. The string will be a valid c-string delimited by a null byte.

<horizontal />

## MMAP

## Lol what?

mmap is a really cool function call. it uses memory mapped IO to emulate writing to files. This means that the file is loaded lazily into memory page by page and any writes write back to the original file.

## Remember This?

![](http://www.tldp.org/LDP/tlk/mm/vm.gif)

Now, the pages can be tied to file pages.


## Address Space

<img src="https://www.safaribooksonline.com/library/view/linux-system-programming/0596009585/httpatomoreillycomsourceoreillyimages47949.png" height="80%" width="80%">

## MMAP read-many

![](http://www.linuxidc.com/upload/2011_08/110819060295692.gif)

## MMAP

Mmapping is lazy! Entire files may not be mmapped, you may just use parts of files and assign them to memory pages as they are needed because you don't need a file until the first time you need it.

<vertical />

Just like the function name says, mmap creates a memory mapping in the kernel and the kernel/CPU is free to do whatever under the hood so long as when a process asks for a memory address it will get the correct bytes and when the write happens, the write eventually goes through to the actual disk.

## How Do I Use It?

Read the man page!
