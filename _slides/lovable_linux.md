---
layout: slide
title: Review
author: "Sarah, Chen, and Bhuvan"
---

## Virtual Memory

<vertical />

2.1 Explain how a virtual address is converted into a physical address using a multi-level page table. You may use a concrete example e.g. a 64bit machine with 4KB pages.


<vertical />

* How long is the offset?
* Page size: 4KB = 2^12B -> offset bits points to each Byte -> need 2^12 different address from offset bits -> offset is log_2⁡〖2^12〗  = 12 bits
* You take the rest of the bits and split it up evenly among the level of page tables.
  |--------VPN1--------|--------VPN2--------|--------VPN3--------|--------Offset--------|
  
<vertical />

> top_level = top_levels[process]
> level1 = top_level[VPN1]
> level2 = level1[VPN2]
> level3 = level2[VPN3]
> address = level3 + Offset

<vertical />

2.5 What is a page fault? When is it an error? When is it not an error?

<vertical />

* Page fault – When a running program tries to access some virtual memory in its address space that is not mapped to physical memory. There are three types
* Major - The page is on disk and needs to be loaded into memory (disk I/O)
* Minor – No mapping for the page, but valid address (no disk I/O)
* Invalid - If the memory that is trying to be accessed is not part of the memory mapping (virtual address space), meaning there cannot be a page in memory corresponding to it, then this kind of error is generated. The operating system usually segfault
* When it’s an Error - Invalid
* When it’s not an Error - Major or Minor

<vertical />

2.6 What is Spatial and Temporal Locality? Swapping? Swap file? Demand Paging? 

* Spatial Locality - Objects in adjacent memory addresses get used (think arrays). That is why a page table is a certain size.
* Temporal Locality - Objects get used over time the TLB is where takes advantage of that
* Swapping - Taking a page in memory and burns to disk.
* Swap File - It is a specific file on disk that the pages get written to. Another solution is to have swap space partition.
* Demand Paging - Only allocate pages as the process requests them
* 
