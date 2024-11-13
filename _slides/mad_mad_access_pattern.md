---
layout: slide
title: Memory Mapped IO
---

## Learning Objectives 

- Review of the C file interface
- Introduction to `mmap`

<horizontal />

## C File Manipulation

- A higher level, more portable interface for interacting with file operations than syscalls.
- Some familiar functions: `fopen` and `fwrite`

## Fseek and Ftell

- Lets us move around the position of a `FILE*`
- New position specified via an `offset` and a `whence` origin
- Syscall analog for working with file descriptors: `lseek`

## Fseek Juggle

![Fseek Map](https://web.archive.org/web/20210427234631if_/http://forum.falinux.com/_clibimages/073_fseek.png)
## MMAP

## What is it?

- Syscall- can define a new memory mapping.
- This can apply to files or devices, letting us emulate writing through standard memory writes. 
- Files are loaded lazily into memory page by page and writes can be reflected to the underlying file.
	 
<vertical />

- On the kernel end, only a memory mapping is created.
- The kernel/CPU is free to do whatever under the hood as long as when a process asks for a memory address a page is available.
- If any writes happen, they are eventually flushed to disk.

How do we implement this? Page faults!

## Remember this?

<img src="https://www.oreilly.com/api/v2/epubs/0596009585/files/httpatomoreillycomsourceoreillyimages47949.png" height="80%" width="80%">

Now, the pages can be tied to file pages, instead of pages backed by physical RAM.

## MMAP for IPC
![Virtual Memory Pics](http://www.tldp.org/LDP/tlk/mm/vm.gif)

## Lazy MMAP

- Laziness in this context means entire files may not be mmapped.
- Parts of files are assigned to memory pages as they are needed.
- When `mmap` is called, it's possible that *none* of the file is loaded into memory yet.

## Usage

`mmap` is complicated! Here are some common options:

`void *mmap(void *addr, size_t length, int prot, int flags, int fd, off_t offset);`
- `addr`: Page aligned address to start the mapping at or `NULL` to let `mmap` choose
- `length`: Len of mapping
- `prot`: Memory protection (r/w/x/none)
- `flags`: Update visibility to other processes (ex. `MAP_SHARED` / `MAP_PRIVATE`) or define a non-file mapping (`MAP_ANONYMOUS`)
- `fd`: File descriptor used in a file mapping
- `offset`: Page-aligined offset in a file to begin a mapping at

See the man page for more!

<horizontal />

## Mad Mad Access Patterns

- A file search problem: given a query and a formatted file, implement a search to either find the value or report that no such value exists.
- The file size can exceed memory.
- You will solve this problem twice:
  - Once with the C file interface (`lookup1.c`)
  - Once with `mmap` (`lookup2.c`)

<horizontal />

## Background

## Efficient File Navigation

- If we want to quickly navigate a file's data, we can encode its contents using a data structure, in our case a tree.
- We translate the tree to a flat array/file by providing a *serialization scheme* or an encoding.

<vertical />

Here's a serialization using an inorder traversal:

![Binary Tree](https://2.bp.blogspot.com/-SKDmvFFeO4k/V_0pb7xvuSI/AAAAAAAABTo/UlEmSIX29Qg3eZBFcHaq3SETawISEYewwCLcB/s1600/deserialized-binary-tree.png)

<vertical />

Another example with a level-ordered traversal:

![Serializing Them In Arrays](http://d2vlcm61l7u1fs.cloudfront.net/media%2F858%2F858e0ee4-80a8-4837-8e97-c1925cdbb231%2FphppObXfG.png)

## Our Trees

We will use *file offsets*:
- The root will always be at offset `4` in a correct file.
- Each node will hold the file offsets of their children.
- Offset `0` is analogous to a `NULL` ptr.

## Tree Node Structure

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

Recall `malloc`!
```C
// allocate 12 bytes for word
BinaryTreeNode* node1 = malloc(sizeof(BinaryTreeNode) + 12);
// allocate 20 bytes for word
BinaryTreeNode* node2 = malloc(sizeof(BinaryTreeNode) + 20);
```

<horizontal />

## Implementation Notes

- Use `strcmp` on the `word` field of each node to traverse the tree.
- You will have to handle certain errors, each with their own specific exit codes -- check the docs.

## Testing

- `create_data` for making your own BTRE files
- `lookup1-reference` / `lookup2-reference` for comparison
