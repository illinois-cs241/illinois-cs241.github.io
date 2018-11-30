---
layout: slide
title: Virtual Memory
author: Bhuvan
---

## Virtual Memory Visualization

<vertical />

![](/resources/slides/virtual/mmu_pic.png)

<vertical />

![](/resources/slides/virtual/indirection.gif)

<horizontal />

## How many pages are there in a 32bit machine (assume frame size of 4KB)?

<vertical />

Answer: 2^32 address / 2^12 = 2^20 pages.

Remember that 2^10 is 1024, so 2^20 is a bit more than one million.

For a 64 bit machine, 2^64 / 2^12 = 2^52, which is roughly 10^15 pages.

<vertical />

### On a 32 bit machine with 2KB pages and 4 Byte entries, how big would a single layered Page Table have to be to address all of the physical memory? Explain?

<horizontal />

## Multi Leveled Page Table

<vertical />

![](/resources/slides/virtual/division.gif)

<horizontal />

## Faults in our Page Tables

## What is the difference between a page fault and a seg. fault?

## What is a TLB? What is an MMU?

<vertical />

![](/resources/slides/virtual/mmu_pic.png)

<vertical />

![](/resources/slides/virtual/tlb.gif)

<horizontal />

## Be Careful About Your Bitshifting!

<vertical />

![](/resources/slides/virtual/byte-extend.png)
