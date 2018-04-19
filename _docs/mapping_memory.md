
---
layout: doc
title: "Mapping Memory"
submissions:
- title: Entire Assignment
  due_date: 4/25 11:59pm
  graded_files:
  - page_fault_helpers.c
  - syscalls.c
learning_objectives:
  - Memory Mapped Files
  - Shared/Private Pages
  - Virtual Memory
wikibook:
  - "File System, Part 6: Memory mapped files and Shared memory"

## Quizizz

Please fill out the google form at this link [https://docs.google.com/forms/d/e/1FAIpQLSddx4mIZDyv7ECJPtzbagtqZ8rt-JY-FhSdnLH5bIK26OEPVA/viewform](https://docs.google.com/forms/d/e/1FAIpQLSddx4mIZDyv7ECJPtzbagtqZ8rt-JY-FhSdnLH5bIK26OEPVA/viewform) for lab attendance credit this week.


## Required Reading

Read this in the wikibook before starting the lab.

* [Introduction to Virtual Memory](https://github.com/angrave/SystemProgramming/wiki/Virtual-Memory%2C-Part-1%3A-Introduction-to-Virtual-Memory)


## Overview

In this lab you will be implementing a simplified version of the memory management system used by an older Linux kernel. This lab relates to the same virtual memory simulator from `Ideal Indirection`, but with major modifications. You will be implementing some subset of the following functions: 

In `syscalls.c`

`addr32 syscall_mmap(uint32_t length, int prot_flags, int flags, char const *pathname, uint32_t offset)`

`addr32 syscall_sbrk(uint32_t shift)`


In `page_fault_helpers.c`

`int sync_shared_page(struct page *)`

`int page_out_shared_page(struct page *)`

`int swap_out_private_page(struct page *)`

`enum FaultResult swap_in_private_page(struct vm_area *, addr32, struct page **)`
`enum FaultResult load_shared_page(struct vm_area *, addr32, struct page **)`

Before starting, you should go through all the provided header files and make sure that you understand what functions are available to you. You should also understand the structure and significance of the various structs, particularly `struct vm_area`, `struct page`, and `struct process`.

Good luck!


# Virtual Memory and Processes

The virtual address space of a process consists of several Virtual Memory Areas. These are contiguous, non-overlapping intervals of virtual addresses that share the same properties. The process' address space is represented by a struct simplified to the following: 

```
struct process {
  uint32_t pid;
  struct vm_area *area_list;   // sorted linked list of all virtual memory areas
  page_directory *paging_directory;  // process global page directory 
  vm_area *text_section;   // text segment region
  vm_area *data_section;   // data segment region
  vm_area *heap_section;   // heap segment region
  vm_area *stack_section;  // stack segment region
}
```

As the process struct shows above, the stack, heap, text segment, and data segment have their own virtual memory areas. Every virtual memory area in a process is stored in the sorted linked list `area_list`. The virtual memory area struct in turn looks like this:

```
struct vm_area{
  struct process *proc;     // pointer to the process address space containing this VMA

  uint32_t start_addr;      // beginning address of this virtual memory area
  uint32_t end_addr;        // ending address of this virtual memory area

  /* linked list pointer to next vm_area in the process; see proc->area_list */
  struct vm_area *area_next;
  struct vm_area **area_prev; 

  /* linked list pointers that connect all vm_areas in all processes that are
     shared mappings to the same file; see file->shared_vma_list */
  struct vm_area *vm_next_mapped; 
  struct vm_area **vm_previous_mapped;

  /* page aligned offset within a memory mapped file */
  uint32_t page_offset;

  /* struct containing information about the mapped file; NULL if vm_area is
     not mapped to any file */ 
  struct mapped_file *file;
  
  /* access permission flags */
  uint32_t prot_read : 1;
  uint32_t prot_write : 1;
  uint32_t prot_exec : 1;
  
  /* mapping description flags */
  uint32_t map_private : 1;
  uint32_t map_anonymous : 1; 
}
```

Note that `area_prev` is a pointer to a pointer. It points to the `area_next` of the previous VMA. So essentially, the linked list looks like this:

![vma-linked-list](/images/vma-linked-list.png)

We provide you with macros to handle the addition and deletion of a node from this linked list. These can be found in `list.h`. You are strongly encouraged to read the usage examples provided in the comments.

Virtual memory also allows the kernel to map other resources to a region of a process' address space, like a memory-mapped file. The `file` pointer in the vm_area struct points to a `struct mapped_file`, if any. The `page_offset` will represent the page aligned offset within a file, i.e., the start of the region in a file which this VMA represents. The following illustration depicts this. 

![vma-file-mapping](/images/file-offset-length)

The `mapped_file` struct looks like this:

```
struct mapped_file{
  /* Name of file */
  char *pathname;
  /* Linked list of all VMAs that have shared mappings to this file; */
  struct vm_area *shared_vma_list;
  /* Reference count of all VMAs, shared and private, that map this file */
  uint32_t reference_count;
};
```

One file can be mapped by different VMAs across different processes. The `shared_vma_list` contains a list of all the shared (not private) VMAs that point to a file. This list is used to perform [object-based reverse-mapping](https://lwn.net/Articles/23732/), a space-inexpensive method of finding all page table entries that reference the same file-backed page frame. This will be discussed later.


## PDE and PTES

We use Page Table Directories and Page Table Entries as they were used in Ideal Indirection. The fields in these structs that might be important for your implementation this lab are: `dirty`, `present`, `available`, and of course `base_addr`. Our infrastructure abstracts away page table and directory setup, traversal, and teardown, so your primary interest should be in the page table entries. 

## Physical Memory 

![physical-memory](/images/physical-memory.png)

As seen in the figure above, physical memory (i.e RAM) is represented by an array of pages and page frames. The pages are represented as a struct as shown below, and are used as a way of storing meta-data for the corresponding page frame. For example, the `struct page` contains fields indicating whether a page frame is dirty, reserved for a page table or page directory, or corresponds to a page in a file on disk.

The struct page looks like this:

``` 
struct page {
  /* counts number of processes using this page frame; if this hits 0, it is 
   * free (unless the reserved bit is set)
   */
  uint32_t reference_count;

  
  /* flags */
  uint32_t reserved : 1;     // page used for page table / directory -> unswappable
  uint32_t dirty: 1;         // page is dirty
  uint32_t private : 1;      // page is private
  uint32_t unused: 29;       // not important

  /* For private pages, this will reference the unique PTE that maps to this 
   * page, and is essential for swapping them out */
  pte_t *rmap;

  /* depicts file resource used by this page; NULL if page frame is not 
   * backed by a file */
  struct mapped_file *mapping;

  /* represents page-aligned offset within file, denoting which portion of the
   * file backs this page frame; this is only meaningful if the page frame is
   * backed by a file */
  uint32_t file_offset;

  /* linked list pointers for use in page cache hash table; NULL if page
   * frame isn't backed by a file */
  struct page *hash_next;
  struct page **hash_prev;
};

```
"But where is the physical address of the page frame represented by this struct stored?", you may ask. In the actual kernel, this can be computed in a straightforward way because of how the kernel's virtual address space is mapped to physical memory. In particular, the `n`th `struct page` corresponds to the `n*4096`th to `(n+1)*4096`th physical addresses. So simply by subtracting the `struct page` pointer by the address of the `mem_map` array, we get the value of `n` and the hence the corresponding page frame.

Due to the limitations of our simulation, we must rely on the "system pointer" abstraction to make sense of things. Physical memory is some small array in the simulator's much larger virtual address space, with "physical address 0" corresponding to the `0`th byte in the array. We provide the functions `uint32_t page_to_phys(struct page *)` and `struct page *phys_to_page(add32)` to abstract away the translation between physical addresses and `struct page` "system pointers". As in Ideal Indirection, `get_system_pointer` can be used to convert valid physical addresses to system pointers, though you should not need to use this.

A "file backed page" is one which has a `mapping` field set to some `struct mapped_file`.  Pages which are not backed by a file are called "anonymous" pages. Pages can also be shared or private (but not both), so the `private` field identifies which category applies to a given page. 

## Page Cache

The page cache is a data structure that exists to improve the speed of disk IO. Whenever a process attempts to access a page from a file at a given page offset, either through the `read`/`write` system calls or through page faults on mapped pages, the kernel first looks up this file-offset combination in the page cache to see if this page is already present in main memory. If the page is not present, then the kernel allocates a page frame, fills it completely with the file's contents at the proper offset, and puts it in the page cache.

Not only does this speed up IO enormously on files that are accessed often by different processes, but it also allows the `mmap` system call to locate resident page frames associated with shared, mapped files, and appropriately map process PTEs to these pages. Thus, processes with shared mappings to `mmap`'d' files actually share the same physical page frames! This is one of the many benefits of virtual memory.

The page cache itself is a hash table that maps pathnames and offsets to linked list hash buckets containing `page` structs of the same hash value.
We have provided the `void page_cache_add(char const *pathname, addr32 offset, struct page *)` function to add a page to the page cache and `struct page *page_cache_get_page(char const *pathname, uint32_t offset)` function to get the actual matching `page` struct, if it is present in the page cache. 

## sbrk

`int32_t syscall_sbrk(uint32_t shift){`

The sbrk system call shifts the program break (i.e. the end of the heap) by the given positive offset. As part of implementing this system call, check that the given offset is page-aligned. Note that the size of each page in the simulator (can be found in `types.h`) is 4096, which is `1 << 12`.

While implemnting `syscall_mmap`, also make sure that shifting the end of the heap doesn't lead to overlaps with newly mapped VMAs. If your MMAP implementation places all VMAs right next to the heap, you will fail this test.

## MMAP

We discussed how memory mapped files can be associated with a VMA (process-local book-keeping for virtual memory) and with page structs (global book-keeping for physical memory). In this lab one of the things you will implement is system call `mmap` which used to associate part of a file with a range of virtual addresses.

The actual system call wrapper `mmap` has the following signature
```
void *mmap(void *addr, size_t length, int prot, int flags, int fd, 
           off_t offset);
```

It attempts to associate `length` bytes of a file represented by `fd`, starting at page-aligned `offset` within the file, with `length` bytes of virtual memory, preferably starting at virtual address `addr`.

Our version looks like this.
```
addr32 syscall_mmap(size_t length, int prot_flags, int flags, 
                    char const *pathname, uint32_t offset);
```

Unlike the real MMAP, we do not allow the user to specify where the new VMA is created (equivalent to setting `addr` to `NULL` in the true system call). We also take in a pathname rather than a file descriptor.

MMAP by itself only sets up a VMA to _describe_ the mapping. Note that the new VMA should be placed as close as possible to the stack to prevent the heap from colliding with mapped memory regions (we assume the stack is of fixed size). The following illustration depicts this:

![physical-memory](images/mmap.png)

The real data transfer occurs when a userspace application first attempts to access virtual memory mapped to a file, causing a page fault to occur. When a page fault occurs, the kernel finds out which VMA contains the virtual address that caused the fault. If none is found, then the kernel raises a segmentation fault. Otherwise, if it discovers that the `vm_area` has a shared mapping to a file, it first checks the page cache to see if this page in this file is already present in main memory. If not, it must allocate a fresh page frame, copy over file data from the file to this frame, add this new page to the page cache. In either case, it must modify the process page table to map the faulting virtual address to the correctly populated page frame. Much of the work of populating the page cache and the rest of main memory is therefore done by the page fault handler.

So, as part of memory management, you might need to load and page out (to disk) pages. This handling is different for private, anonymous and shared file back pages. In addition to implementing MMAP, you will also need to implement some of these page fault handlers. 

## Handling Faults

When handling a major fault, the kernel determines if the faulting page is shared or private before trying to restore its data. It then calls the respective handler code, simplified here to `enum FaultResult load_shared_page(struct vm_area *, addr32, struct page **out)`, `enum FaultResult load_private_file_page(struct vm_area *, addr32, struct page **out)`, and `enum FaultResult swap_in_private__page(struct vm_area *, addr32, struct page **out)` which are declared and described in `page_fault_helpers.h`. 

`load_private_file_page` and `swap_in_private_page` are already defined, so you need to implement `load_shared_page`.

You need to follow the following steps:
1. Try to load the page from the page cache.
2. If it is not found in the cache, find an unused page frame (Look at `physical_memory.h`) and add it to the cache.
3. Copy over data from to the new page frame (see `disk.h`).

Incrementing the reference count of the page and setting the `base_addr` in the PTE is handled by the main page fault handler, so you don't have to do that explicitly. 

## Swapping/ Paging Out 

When the system runs low on physical memory, it might have to start storing data in backing storage, i.e. the disk. There are two ways in which it may do this:
1. Flush shared, file-backed pages from the page cache, first writing those 
   pages back to disk if dirty, and remove them from the page cache linked
   list.
2. Swap out anonymous (i.e. not file-backed) pages and private file-mapped 
   pages to the swap partition.

Note that shared, anonymous memory also exists, but this is outside the scope of the assignment. So we shall hereafter refer generally to "shared" pages, which must be file-backed, and "private" pages, which may be file-backed or anonymous. 

As part of the lab, you are required to implement `int page_out_shared_page(struct page *)` and `int swap_out_private_page(struct page *)` in `page_fault_helpers.c` to enable moving data to disk. Furthermore, to prevent power failures from erasing changes to files in main memory, shared file mappings must also sync their changes back to disk periodically, regardless of main memory usage. `int sync_shared_page(struct page *)` will accomplish this much in the same way as `int page_out_shared_page(struct page *)`, and you are tasked with implementing this as well.

### Paging out Shared Pages 

Shared, file-backed pages are easier to page back to disk, in principle if not in terms of lines of code. These pages already have dedicated backing on disk and so can be discarded without remorse. All that must be done is:
1. Find all page table entries that map to the shared page using object-based reverse-mapping (this is the hard part)
2. Clear the Present bit on all these page table entries
3. Write back the `page` struct to the file that it maps, if the page is dirty
4. Remove the `page` struct from the page cache
5. Mark the `page` struct as unused by decrementing its reference count to 0.

Once a process tries to read that page again, the page fault handler can simply use information from the associated `vm_area` struct to load that page back from the disk or from the page cache, just like the first time the process ever faulted on that page. 


### Paging out Private Pages

For simplicity, we will treat all swap space as a contiguous array of disk memory and provide the means for writing pages to and reading page from swap slots based on indices.
```
uint32_t get_free_swap_index(void);

int write_page_to_swap(uint32_t index, struct page *page);

int read_page_from_swap(uint32_t index, struct page *pg);
```

Unlike shared, file-backed pages that get paged out, a private page isn't guaranteed to be found in a predefined location on disk when it gets swapped out. Note that private file-backed pages are not saved to disk (i.e. any changes you made to a private file-backed page will never be seen in the filesystem), so even they must be stored in swap space when memory runs low.

So how does the kernel know where in swap a private page was stored? The answer is that it stores the swap index in the PTE's `base_addr` field, which now references the page location in swap rather than in main memory, before swapping it out.

The general recipe is as follows:
1. Find the one PTE that maps to this page
2. Get the index of an unused swap slot
3. Store the swap index in the `base_addr` section of the PTE
4. Clear the PTE's Present bit
5. Copy over the `page` struct data to the free swap slot
6. Mark the page as unused


## Reverse Mapping

Note that, in order to swap out a page (in order to reuse the page frame for something else), we must find all PTEs that map to the page. This is essential because the processes using that frame must be "notified" that their virtual addresses no longer map to a valid frame in main memory. How can this be done? For private pages, we will rely on the `struct page->rmap` struct member, since there is only one PTE per private page. But for shared pages, we will employ a technique known as [object-based reverse-mapping](https://lwn.net/Articles/23732/).


![physical-memory](/images/reverse-mapping.png)


In essense, a shared `page` struct holds a reference to a `mapped_file` struct, which in turn holds a linked list to all `vm_area` structs from all processes that having shared mappings to the file. When scanning through these VMAs, we can check to see if a given VMA actually maps to the given page. In particular, not every VMA that maps a file will map a given page in that file. If the VMA does indeed map the given page, we can compute the virtual address of that page in said VMA (which contains a reference to the process that owns it) and use it to obtain the right PTE from the process' page tables. Doing this for every VMA will give all the PTEs for all processes that need their Present and Dirty bits cleared.


## Virtual Address Translation

For the purposes of this assignment, we will provide you the function needed to compute a page table entry from a virtual address and process address space struct. You will need this function to handle some of the different paging helper functions.

```
pte *get_pte(process *proc, uint32_t virt_addr, bool allocate_page_table);
```

The `allocate_page_table` parameter is used to transparently generate a page table for the virtual address if it doesn't already exist, to abstract away page table walk code. But for your purposes, you should never have to set parameter to true.


## Testing

We’ve provided you with all the unit test cases in `mman_tests.c`. You can test other functionalities of your code by writing your own test cases in this file. Running `make` will generate a `./mman_tests` executable, and each test can be run as `./mman_tests-debug`. As usual, you also have the option of running `make debug` to make GDB and Valgrind work more nicely.

Here is an example of how you would define your own testcase in `mman_tests.c`.

```
DECLARE_TESTCASE(9, my_custom_testcase);

static int my_custom_testcase(void){
  int x = 5;
  int y = 2;
  testcase_assert(x == y, "Error: x != y: x = %d, but y = %d", x, y);
  return SUCCESS;
}
```

Running `./mman_tests 9` would then run your custom testcase.

You can earn a maximum of 5 points for this lab, which means that you will need to pass only 5 out of the 8 test cases that are given to you (no extra credit). A fully functional `syscall_mmap` is necessary to pass most of them. `syscall_sbrk` is by far the simplest function to implement by itself. `sync_shared_page` and `page_out_shared_page` are the hardest, due to the need for reverse-mapping. That should give an idea of what you should prioritize for this lab.
