---
layout: slide
title: File Systems
---

## What do filesystems look like?

* inodes, they store metadata about the node
* data blocks/nodes, they store the actual data
* double indirect blocks (data)

## What our file system looks like

![File System](/images/slides/filesystem/map.png)

## Traditional NTFS file systems

![NTFS File System](/images/slides/filesystem/ntfs.png)

## Typical file systems nowadays

![Now Files](/images/slides/filesystem/inode_with_signatures.jpg)

## Inode

```C
typedef struct {
	uint8_t 	owner;				/* Owner ID */
	uint8_t 	group;				/* Group ID */
	uint16_t 	permissions;		/* <d,f,c,p>rwxrwxrwx */
	uint32_t 	hard_link_count;	/* reference count, when hit 0 */
	time_t 		last_access;		/* read(2) change */
	time_t 		last_modification;	/* write(2) change */
	time_t 		last_change;		/* any time metadata changes */
	uint64_t 	size;				/* size of the file in bytes */
	data_block_number direct_nodes[NUM_DIRECT_INODES]; /* data_blocks */
	data_block_number single_indirect; /* points to a singly indirect block */
} inode;
```

## Indirect Blocks

![Indirect Blocks](/images/slides/filesystem/IndirectBlocks1.png)

## Read the docs!

There are a few intricacies with dealing with the inodes.

