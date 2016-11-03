---
layout: doc
title: "Finding Filesystems"
dueDates: "11/09 11:59pm"
permalink: finding_filesystems
---

## Learning Objectives

*   Learn How Inodes are Represented in the Kernel
*   How to write commands like ls and cat.
*   Traversing through singly indirected blocks.

## Overview

Your friendly neighborhood 241 course staff asked themselves, what's the best way to learn filesystems? Write One!

In this lab, you will be implementing two utilites: `ls` and `cat` on the filesystem level. Normally, these commands call system calls to do work for them, but now they are going under the hood. You will be exploring how the metadata is stored in the inode and how the data is stored in the datablocks.

## minixy-fs

Although EXT2 is very good filesystem, it had some constraints that made it difficult to turn it into a file filesystem. Your TAs took a predecessor of the file system (the [Minix Filesystem](https://en.wikipedia.org/wiki/MINIX_file_system)) and edited it to make it a good in file filesystem. As such, you will have to learn our filesystem in addition, ours is simplier though!

## Superblock

{% highlight c %}

typedef struct {

	uint64_t size;
	uint64_t inode_count;
	uint64_t dblock_count;
	char data_map[0];

} superblock;

{% endhighlight %}

The superblock is a block that all file systems have, it stores information like the size, the number of inodes, data blocks, and whether those datablocks are being used or not. Remember from class that inodes stop being used when their hard links reach zero, but data blocks need some kind of bitmap or sentinel to tell if they are being used. `data_map` is a variable sized array that holds this information **You don't need to worry about these abstractions, they are taken care of you**.

## Inodes

{% highlight c %}

typedef struct {
	uint8_t 	owner;				/* Owner ID */
	uint8_t 	group;				/* Group ID */
	uint16_t 	permissions;		/* <d,f,c,p>rwxrwxrwx */
	uint32_t 	hard_link_count;	/* reference count, when hit 0 */
	time_t 		last_access;		/* read(2) change */
	time_t 		last_modification;	/* any time metadata changes */
	time_t 		last_change;		/* write(2) change */
	uint64_t 	size;				/* size of the file in bytes */
	data_block_number direct_nodes[NUM_DIRECT_INODES]; /* data_blocks */
	inode_number single_indirect;		/* points to a singly indirect block */
} inode;

{% endhighlight %}

This is the famous inode struct that you have been learning about! Here are a breakdown of the variables
- `owner` is the id of the inode owner
- `group` is the id of the inode group, does not have to include the owner
- `permissions` is a bitmask where the bottom 9 bits are read-write-execute for owner-group-everyone. Bits 11-10 are a type. (permissions >> 9) equals one of a bunch of file types. ***You don't need to worry about this we have given you two functions `is_file` and `is_directory` that tells you whether or not the file is a directory or inode. You don't need to worry about any other type.***
- `hard_link_count` is the number of directories that the file is linked to (directories can't be hard linked)
- `last_access` is the last time a file was `read(2)`. **You don't need to worry about the changing them.**
- `last_modification` is the last metadata change
- `last_change` is last time the file was changed with `write(2)`
- `direct_nodes` is an array where the direct_node[i] represents an offset from the data_root 
- `single_indirect` is a node that points to another inode. ***The inode at this number is only going to be used for its direct nodes, none of the metadata at this inode is going to be valid***

{% highlight c %}

typedef struct {
	char data[16 * KILOBYTE];
} data_block;

{% endhighlight %}

Datablocks are currently defined to be 16 kilobytes. Nothing fancy here.

{% highlight c %}

typedef struct {
	superblock* meta;
	inode* inode_root;
	data_block* data_root;
} file_system;

{% endhighlight %}

![](http://cs241.cs.illinois.edu/images/map.png)

* The Metadata pointer points to the start of the file system includes the superblock and the data_map
* The inode_root points to the start of the inodes as in the picture, right after the data_map
* The data_root points to the start of the data_blocks as in the picture, right after the inodes

File system is an object that keeps track of the metadata, the root of the inode (where `fs->inode_root[0]` is the root `/` inode), and the root of all the data_blocks. The inodes and data blocks are laid sequentially out so you can just use them like an array. Think about how you could get a pointer to the nth data_block.

## Helper Functions/Macros

There are some functions that you are going to need to know in order to finish this lab.

### `get_inode`

This function takes a string name like '/path/to/file' and returns the inode that is at the end of that path. `get_inode` returns NULL when the intended file does not exist or the file is invalid.

### format: `print_no_file_or_directory`

Only call this when there is no file or directory, ie when `get_inode` returns null.

### format: `print_file`/`print_directory`

You are going to pass in the filename (not the entire path). These methods will format the output for a terminal and put a forward slash for if it is a directory.

### `is_file`/`is_directory`

Call `is_file` or `is_directory` on an inode to tell whether it is a directory or a file. You don't need to worry about other inode types.

### `NUM_DIRECT_INODES`

`NUM_DIRECT_INODES` is the number of directly connected data_block nodes to a single inode. The single_indirect array is this long.

### `UNASSIGNED_NODE`

You may not need to use this macro, but if you choose to then any `data_block` or `inode` that is not currently being used will have this number.

## `cat`

So, each inode block has datablocks attatched. Each data block's address can be addressed like `file_system->data_root[inode->direct_blocks[0]]` for example for the 0th data_block. The data_blocks run for sizeof(data_block) bytes. Your job is to write a function that loops through all of the datablocks in the node (possibly indirect nodes) and prints out all of the bytes to standard out, check out a simple, complex, and very complex example in the testing section.


If in your get_inode, the inode doesn't exist -- call `print_no_file_or_directory` and return.

## `ls`

**For files/directories that don't exist:**

Call `print_no_file_or_directory` and return.

**For files:**

Print out the filename using `print_file(char*)`

**For directories:**

Our directorie data_blocks look like the following

{% highlight c %}

|--248 Bytes Name String--||-8 Bytes Inode Number-|
|--248 Bytes Name String--||-8 Bytes Inode Number-|
...

{% endhighlight %}

The filesystem gaurentees that size of a directory is a multiple of 256. You need to loop through all of the directory entries and get the name of the entry, and print it out to standard out. You are going to need to call two different flavors of printing based on whether the inode that you are pointing to is a directory or a file (which means you have to get the inode number and check that inode...).

Use `make_dirent_from_string`

It accepts a `char* ptr` to the start of a dirent block like this.

{% highlight c %}

|--248 Bytes Name String--||-8 Bytes Inode Number-|
^ -- Points here
{% endhighlight %}

The function then fills out the a reference to the passed in struct include the name and the inode number as an inode_num

Again if your inode doesn't exist, just use the format function to print no file or directory and return.

## Testing

**Testing is ungraded, but highly recommended**

You can grab the test file using `make testfs`. **Do not commit this file, if you overwrite it for any reason just `rm test.fs` and do `make testfs` again**

Here are some sample testcases!

{% highlight console %}
$ ./minixfs test.fs ls /
you
got
ls!
congrats
[more stuff]
$
{% endhighlight %}

{% highlight console %}
$ ./minixfs test.fs ls /directory
recursion
nice
$
{% endhighlight %}


{% highlight console %}

$ ./minixfs test.fs ls /directory_alot
file1
file2
...
file70
$
{% endhighlight %}

{% highlight console %}
$ ./minixfs test.fs ls /directory_alot_alot
file1
file2
...
file710
$
{% endhighlight %}


{% highlight console %}
$ ./minixfs test.fs cat /goodies/hello.txt
Hello World!
$
{% endhighlight %}

You can even cat directories!

{% highlight console %}
$ ./minixfs test.fs cat /
you00000001got00000002ls!00000003congrats00000004 [...]
$
{% endhighlight %}

So that's what really is going on under the hood?

Want something fun?

{% highlight console %}

$ ./minixfs test.fs cat /goodies/dog.png > dog.png
$ xdg-open dog.png

{% endhighlight %}

You can store anything on filesystems. See what we hid around the filesystem for you...

## Other Edge Cases you don't need to worry about

*	You don't need to update the `last_access` and the `last_change`
*	You don't need to worry about data corruption or checksums or anything fancy, the filesystem will be valid.
*	Make sure you can ls the `/directory_alot` and the `/directory_alot_alot`, these test if you go over multiple data blocks
*	Make sure all the files you cat out in `/goodies` look correct when you `xdg-open` them. Make sure you can get the pngs and the pdfs to print out correctly

## Helpful Hints and Notes

*   Handle the edge conditions, you can assume that size will be valid. What is the code supposed to do when you get to a singly indirected block?
*   Draw pictures! Understand what each of the things in the struct mean
*   Review your pointer arithmatic
*   You cannot change any file but fs.c

## Files to be graded

*   `fs.c`

**ANYTHING not specified in these docs is considered undefined behavior and we will not test it**
