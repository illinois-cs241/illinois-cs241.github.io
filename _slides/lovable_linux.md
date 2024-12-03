---
layout: slide
title: Review
---

## C

<vertical />

How are C strings represented in memory? 

What is wrong with malloc(strlen(s)) when copying strings?

<vertical />

```"hello" = [h][e][l][l][o][```**\0**```]```

A C string is just an array of characters with a null terminator (\0) at the end.

<vertical />

```strlen("hello") == 5```

```strlen()``` **does not** count the null terminator.

If used with malloc, there won't be enough memory allocated for the null terminator!

<horizontal />

## Virtual Memory

<vertical />

Explain how a virtual address is converted into a physical address using a multi-level page table. You may use a concrete example e.g. a 64bit machine with 4KB pages.


<vertical />

### How long is the offset?

* How many addresses do you need? One per Byte in the page

Page size: ```4 KB = 2^12 B```

* How many bits do you need to define 2^12 addresses?

```log_2⁡ (2^12⁡)```  = 12 bits

* You take the rest of the bits and split it up evenly among the level of page tables.
  
<vertical />

```|-VPN1-|-VPN2-|-VPN3-|-Offset-|```

> level_1 = top_level[VPN1]

> level_2 = level_1[VPN2]

> level_3 = level_2[VPN3]

> physical_address = level_3 + Offset

<vertical />

What is a page fault? When is it an error? When is it not an error?

<vertical />

Page fault – program attempts access to virtual memory that is not mapped to physical memory. 

There are three types

* Major - The page is on disk and needs to be loaded into memory (disk I/O)
* Minor – No mapping for the page, but valid address (no disk I/O)
* Invalid - Memory being accessed is not part of the virtual address space. There cannot be a page corresponding to it. 

<vertical />

When it’s an Error - Invalid (The operating system usually segfaults)

When it’s not an Error - Major or Minor

<vertical />

What is Spatial and Temporal Locality? Swapping? Swap file? Demand Paging? 

<vertical />

Spatial Locality - Objects in adjacent memory addresses get used (think arrays). That is why a page table is a certain size.

Temporal Locality - Objects used more recently get used. The TLB takes advantage of that

<vertical />

Swapping - Taking a page in memory and burning to disk.

Swap File - specific file on disk that the pages get written to. Another solution is a swap space partition.

Demand Paging - Only allocate pages as the process requests them

