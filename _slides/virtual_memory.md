% CS241
% Virtual Memory

# Virtual Memory Visualization

---

![](/resources/slides/virtual/mmu_pic.png)

---

![](/resources/slides/virtual/indirection.gif)

# How many pages are there in a 32bit machine (assume frame size of 4KB)?

---

Answer: 2^32 address / 2^12 = 2^20 pages.

Remember that 2^10 is 1024, so 2^20 is a bit more than one million.

For a 64 bit machine, 2^64 / 2^12 = 2^52, which is roughly 10^15 pages.

---

### On a 32 bit machine with 2KB pages and 4 Byte entries, how big would a single layered Page Table have to be to address all of the physical memory? Explain?

# Multi Leveled Page Table

---

![](/resources/slides/virtual/division.gif)

# Faults in our Page Tables

## What is the difference between a page fault and a seg. fault?

## What is a TLB? What is an MMU?

---

![](/resources/slides/virtual/mmu_pic.png)

---

![](/resources/slides/virtual/tlb.gif)

# Be Careful About Your Bitshifting!

---

![](/resources/slides/virtual/byte-extend.png)
