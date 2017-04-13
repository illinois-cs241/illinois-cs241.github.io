---
layout: doc
title: "Finding Filesystems"
submissions:
- title: Entire Assignment
  due_date: 04/19/2016 11:59pm
  graded_files:
  - fs.c
learning_objectives:
  - Learn how inodes are represented in the kernel
  - How to write commands like `ls` and `cat`
  - Traverse singly indirect blocks
wikibook:
  - "File System, Part 1: Introduction"
  - "File System, Part 2: Files are inodes (everything else is just data...)"
  - "File System, Part 3: Permissions"
  - "File System, Part 4: Working with directories"
---

## Overview

Your friendly neighborhood 241 course staff asked themselves, _"What's the best way to learn filesystems?"_ Write one!

In this lab, you will be implementing two utilities, `ls` and `cat`, on the filesystem level. Normally, these commands make system calls to do work for them, but now they are going under the hood. You will be exploring how metadata is stored in the inode and how data is stored in the data blocks.

## minixfs

ext2 is good filesystem, but to keep things simple, we will be using a modified version of its predecessor (the [MINIX filesystem](https://en.wikipedia.org/wiki/MINIX_file_system)) in this lab.

### Superblock

```

typedef struct {
	uint64_t size;
	uint64_t inode_count;
	uint64_t dblock_count;
	char data_map[0];
} superblock;

```

The superblock stores information like the size of the filesystem, the number of inodes and data blocks, and whether those data blocks are being used. Remember from class that inodes become free when their hard link count reaches zero, but data blocks need some kind of bitmap or sentinel to indicate if they are being used. `data_map` is a variable-sized array that holds this information. **You don't need to worry about these abstractions, they are taken care of for you**.

### Inodes

```

typedef struct {
	uint16_t 	mode;				/* <d,f,c,p>rwxrwxrwx */
	uint32_t 	nlink;				/* number of hard links, reference count, when hit 0 */
	uint8_t 	uid;				/* user ID of owner */
	uint8_t 	gid;				/* group ID of owner */
	uint64_t 	size;				/* total size, in bytes */
	time_t 		atim;				/* time of last access */
	time_t 		mtim;				/* time of last modification */
	time_t 		ctim;				/* time of last status change */
	data_block_number direct[NUM_DIRECT_INODES]; /* data_blocks */
	data_block indirect;		/* points to a singly indirect block */
} inode;

```

This is the famous inode struct that you have been learning about! Here are a breakdown of the variables:

- `mode` is a bitmask. The bottom 9 bits are read-write-execute for owner-group-others. Bits 11-10 are the type of the file. `(mode >> 9)` corresponds to a particular type. We have given you two functions, `is_file` and `is_directory`, that tell you whether or not the inode represents a directory or file. There are no other types in our filesystem.
- `nlink` is the hard link count which is the number of directories that the file is linked to from (directories can't be hard linked).
- `uid` is the user ID of the inode owner.
- `gid` is the ID of the inode group (does not have to include the owner).
- `size` is the size of the file in bytes
- `atim` is access time, which is the time of last access or the last time a file was `read(2)`. You don't need to worry about changing this.
- `mtim` is the last modification time, or in other words, the last time the file's metadata was changed.
- `ctim` is the last change time, or in other words, the last time the file was changed with `write(2)`.
- `direct` is an array where the `direct[i]` is the `i`th data block's offset from the `data_root`.
- `indirect` points to an indirect data block that contains additional data blocks for this file.

### Data blocks

```
typedef struct {
	char data[4 * KILOBYTE];
} data_block;

```

Data blocks are currently defined to be 4 kilobytes. Nothing fancy here.

### file_system struct

```

typedef struct {
	superblock* meta;
	inode* inode_root;
	data_block* data_root;
} file_system;

```

![](http://cs241.cs.illinois.edu/images/map.png)

The `file_system` struct keeps track of the metadata, the root inode (where `fs->inode_root[0]` is the root `"/"` inode), and the root of the `data_block`s.

* The `meta` pointer points to the start of the file system, which includes the superblock and the `data_map`.
* The `inode_root` points to the start of the inodes as in the picture, right after the `data_map`.
* The `data_root` points to the start of the `data_blocks` as in the picture, right after the inodes.

The inodes and data blocks are laid sequentially out so you can treat them like an array. Think about how you could get a pointer to the nth `data_block`.

## Helper Functions/Macros

There are some functions that you are going to need to know in order to finish this lab.

### `get_inode`

This function takes a string name like `/path/to/file` and returns the inode corresponding to the file at end of that path. `get_inode` returns NULL when the intended file does not exist or the file is invalid.

### `print_no_file_or_directory`&nbsp;(format)

Only call this when there is no file or directory, i.e. when `get_inode` returns NULL.

### `print_file` / `print_directory `&nbsp;(format)

You should pass in the filename (not the entire path). These methods will format the output for a terminal and add a forward slash if it is a directory.

### `is_file` / `is_directory`

Call `is_file` or `is_directory` on an inode to tell whether it is a directory or a file. You don't need to consider other inode types.

### `NUM_DIRECT_INODES`

`NUM_DIRECT_INODES` is the number of direct `data_block` nodes in a single inode. The `indirect` array has this many entries.

### `UNASSIGNED_NODE`

You may not need to use this macro, but if you choose to, then any `data_block` or `inode` that is not currently being used will have this number.

## `cat`

Each inode block has data blocks attached. Each data block's address can be addressed like `file_system->data_root[inode->direct[0]]`, for example, for the 0th `data_block` of that inode. The `data_block`s run for `sizeof(data_block)` bytes. Your job is to write a function that loops through all of the data blocks in the node (possibly including indirect blocks) and prints out all of the bytes to standard out. Check out a simple, complex, and very complex example in the testing section.

If `get_inode` indicates the inode doesn't exist, then call `print_no_file_or_directory` and return.

## `ls`

**For files/directories that don't exist:**

Call `print_no_file_or_directory` and return.

**For files:**

Print out the filename using `print_file(char*)`

**For directories:**

Our directory `data_blocks` look like the following:

```

|--248 Byte Name String--||-8 Byte Inode Number-|
|--248 Byte Name String--||-8 Byte Inode Number-|
...

```

The filesystem guarantees that size of a directory is a multiple of 256. You need to loop through all of the directory entries and get the name of the entry, and print it out to standard out. You are going to need to call two different print functions based on whether the inode that you are pointing to is a directory or a file, which means you have to get the inode number and check that inode.

Use `make_dirent_from_string`: it accepts a `char* ptr` to the start of a dirent block like this.

```

|--248 Byte Name String--||-8 Byte Inode Number-|
^ -- Points here
```

The function then fills out a reference to the passed in struct with the name and the inode number as an `inode_num`.

Again, if your inode doesn't exist, just use the format function to print no file or directory and return.

## Testing

**Testing is ungraded, but highly recommended**

You can grab the test filesystem using `make testfs`. **Do _not_ commit this file. If you overwrite it for any reason just `rm test.fs` and do `make testfs` again**

Here are some sample (and not comprehensive) testcases:

```
$ ./minixfs test.fs ls /
you
got
ls!
congrats
[more stuff]
$
```

```
$ ./minixfs test.fs ls /directory
nice
recursion
$
```


```

$ ./minixfs test.fs ls /directory_alot
file1
file2
...
file70
$
```

```
$ ./minixfs test.fs ls /directory_alot_alot
file1
file2
...
file710
$
```


```
$ ./minixfs test.fs cat /goodies/hello.txt
Hello World!
$
```

You can even cat directories!

```
$ ./minixfs test.fs cat /
you00000001got00000002ls!00000003congrats00000004 [...]
$
```

So that's what really is going on under the hood?

Want something fun?

```

$ ./minixfs test.fs cat /goodies/dog.png > dog.png
$ xdg-open dog.png

```

You can store anything on filesystems. See what we hid around the filesystem for you...

## Other Edge Cases

*	You don't need to update `atim` and the `ctim`.
*	You don't need to worry about data corruption or checksums or anything fancy, the filesystem will be valid.
*	Make sure you can `ls` the `/directory_alot` and the `/directory_alot_alot`; these test if you go over multiple data blocks.
*	Make sure all the files you cat out in `/goodies` look correct when you `xdg-open` them. Make sure you can get the PNGs and the PDFs to print out correctly.

## Helpful Hints and Notes

*   Handle the edge conditions. You can assume that size will be valid. What is the code supposed to do when you get to a singly indirect block?
*   Draw pictures! Understand what each of the things in the structs mean.
*   Review your pointer arithmetic.
*   **Only** change`fs.c`.

## Graded Files

*   `fs.c`

**Anything not specified in these docs is considered undefined behavior, and we will not test it.**
