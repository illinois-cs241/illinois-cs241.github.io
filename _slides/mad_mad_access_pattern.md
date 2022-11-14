---
layout: slide
title: Memory Mapped IO
---

## Background

<vertical />

Binary Trees:

![Binary Tree](https://2.bp.blogspot.com/-SKDmvFFeO4k/V_0pb7xvuSI/AAAAAAAABTo/UlEmSIX29Qg3eZBFcHaq3SETawISEYewwCLcB/s1600/deserialized-binary-tree.png)

<vertical />

This is how we store them in arrays:

![Serializing Them In Arrays](http://d2vlcm61l7u1fs.cloudfront.net/media%2F858%2F858e0ee4-80a8-4837-8e97-c1925cdbb231%2FphppObXfG.png)

## Tree node structure

```C
typedef struct {
	uint32_t left_child;  // offset of node containing left child
	uint32_t right_child; // offset of node containing right child

	// Offsets are relative to the beginning of the file.
	// An offset of zero means the child does not exist.

	uint32_t count;  // number of times the word occurs in the data set
	float price;     // price of the word

	char word[0];    // contents of the word, null-terminated
} BinaryTreeNode;
```

## How does word[0] work?

```
// allocate 12 bytes for word
BinaryTreeNode* node1 = malloc(sizeof(BinaryTreeNode) + 12);
// allocate 20 bytes for word
BinaryTreeNode* node2 = malloc(sizeof(BinaryTreeNode) + 20);
```

<horizontal />

## C File Manipulation

## Fseek Juggle

![Fseek Map](https://web.archive.org/web/20210427234631if_/http://forum.falinux.com/_clibimages/073_fseek.png)

## What to do in this lab

Read in the file provided. Skip the first 4 header bytes and then treat the next bytes as the metadata for the binary tree node. After that is the word - a C-string delimited by a null byte.

<horizontal />

## MMAP

## What is it?

mmap is a really cool function call. It uses memory mapped IO to emulate writing to files. This means that the file is loaded lazily into memory page by page and any writes write back to the original file. We can effectively treat files as memory, just like stack and heap memory.

## Remember this?

![Virtual Memory Pics](http://www.tldp.org/LDP/tlk/mm/vm.gif)

Now, the pages can be tied to file pages, instead of pages backed by physical RAM.


## Address Space

<img src="https://www.oreilly.com/api/v2/epubs/0596009585/files/httpatomoreillycomsourceoreillyimages47949.png" height="80%" width="80%">

## MMAP for IPC
![BTRE](../images/assignment-docs/lab/mad_mad_access_patterns/MMAP_for_IPC.drawio.png)

## Lazy MMAP

Mmapping is lazy! Entire files may not be mmapped, you may just use parts of files and assign them to memory pages as they are needed because you don't need a file until the first time you need it. When `mmap` is called, it is possible that *none* of the file is loaded into memory yet.

<vertical />

Just like the function name says, mmap creates a memory mapping in the kernel and the kernel/CPU is free to do whatever under the hood so long as when a process asks for a memory address it will get the correct bytes and when the write happens, the write eventually goes through to the actual disk.

## How do I use it?

Read the man page!
