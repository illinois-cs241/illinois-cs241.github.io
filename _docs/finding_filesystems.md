---
layout: doc
title: "Finding Filesystems"
submissions:
- title: Entire Assignment
  due_date: 04/04/2018 11:59pm
  graded_files:
  - minixfs.c
learning_objectives:
  - Learn how inodes are represented in the kernel
  - How to write callbacks for filesystem operations
  - Traverse singly indirect blocks
  - Modifing permissions on files
wikibook:
  - "File System, Part 1: Introduction"
  - "File System, Part 2: Files are inodes (everything else is just data...)"
  - "File System, Part 3: Permissions"
  - "File System, Part 4: Working with directories"
---

## QuizzIz

For this week's lab attendance grade, please fill out the google form at this link: [https://docs.google.com/forms/d/e/1FAIpQLSc9tDTBZ62p2zcZq6AaYKrq4q1A6zYzWCFzdnJGHYwwvxtWDw/viewform](https://docs.google.com/forms/d/e/1FAIpQLSc9tDTBZ62p2zcZq6AaYKrq4q1A6zYzWCFzdnJGHYwwvxtWDw/viewform)

## Overview

Your friendly neighborhood 241 course staff asked themselves, _"What's the best way to learn filesystems?"_ Write one!

In this lab, you will be implementing several callbacks to file system operations, namely, `chmod`, `chown`, `read`, and `write`. To do this you will be exploring how metadata is stored in the inode and how data is stored in the data blocks.

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
  uid_t uid; 
  gid_t gid; 
  uint16_t mode; 
  uint32_t nlink; 
  struct timespec atim;
  struct timespec mtim;
  struct timespec ctim;
  uint64_t size; 
  data_block_number direct[NUM_DIRECT_INODES];
  data_block_number indirect;
} inode;
```

This is the famous inode struct that you have been learning about! Here are a breakdown of the variables:

- `uid` is the user ID of the inode owner.
- `gid` is the ID of the inode group (does not have to include the owner).
- `mode` is a bitmask. The bottom 9 bits are read-write-execute for owner-group-others. Bits 11-10 are the type of the file. `(mode >> 9)` corresponds to a particular type. We have given you two functions, `is_file` and `is_directory`, that tell you whether or not the inode represents a directory or file. There are no other types in our filesystem.
- `nlink` is the hard link count which is the number of directories that the file is linked to from (directories can't be hard linked).
- `atim` is access time, which is the time of last access or the last time a file was `read(2)`. 
- `mtim` is the last modification time, or in other words, the last time the file's metadata was changed.
- `ctim` is the last change time, or in other words, the last time the file was changed with `write(2)`.
- `size` is the size of the file in bytes
- `direct` is an array where the `direct[i]` is the `i`th data block's offset from the `data_root`.
- `indirect` is the offset number (`data_block_number`) of a data block, which contains `NUM_INDIRECT_INODES` number of `data_block_number`'s.

### Data blocks

```
typedef struct {
	char data[16 * KILOBYTE];
} data_block;

```

Data blocks are currently defined to be 16 kilobytes. Nothing fancy here.

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

## fakefs interface

To make this lab possible, we've developed our own userspace filesystem interface which we're calling fakefs. Normally, filesystem are a piece of code which you load into your kernel and must provide a few things. It needs a constructor, destructor, callbacks for all system calls involving files and file descriptors within your filesystem. However, writing kernel code is a bit more cumbersome than writing normal code (since you need additional security checks among other things), and can even lead to instability in your operating system. To avoid this, there are various ways to implment a filesystem in userspace. The most common (and preffered) method is to use a library called FUSE (Filesystems in USErspace). However, FUSE alllows you to implement your file operations in userspace, but still interacts with th ekernel to provide it's functionality. While this allows you to mount  the filesystem and use it like any other filesystem, there a few reasons why we chose not to use it for this lab. A major reason is that if a FUSE callback crashes while it is mounted, it renders the mounted partition unsuable and in some cases, you won't be able to even unmount the parition without rebooting the machine. To prevent this, and make this lab not annoying and tedious, we've made ourn own way of implementing filesystems in userspace by `hooking` filesystem operations. 

If you take a look at `fakefs.c` you'll see that we've overridden most of `glibc`'s filesystem operations. Note that this only hooks functions from code or programs that were either written in `C` or in something that compiles to `C`. Running a program written in assembly will not be affected by these hooks.

Note that not all programs will work with fakefs. At the least, we guarantee that `ls`, `cat`, `mkdir`, `unlink` and `cp` work. `vim` and `neovim` seem to work although you might run into some weird bugs using these programs within fakefs.

## Helper Functions/Macros

There are some functions that you are going to need to know in order to finish this lab.

### `get_inode`

This function takes a string name like `/path/to/file` and returns the inode corresponding to the file at end of that path. `get_inode` returns NULL when the intended file does not exist or the file is invalid.

### `is_file` / `is_directory`

Call `is_file` or `is_directory` on an inode to tell whether it is a directory or a file. You don't need to consider other inode types.

### `NUM_DIRECT_INODES`

`NUM_DIRECT_INODES` is the number of direct `data_block` nodes in a single inode. The `indirect` array has only this many entries (for the sake of simplicity).

### `UNASSIGNED_NODE`

You may not need to use this macro, but if you choose to, then any `data_block` or `inode` that is not currently being used will have this number.

## Directory Structure

Our directory `data_blocks` looks like the following:

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

## So what do I need to do?

You will need to implement the following 4 functions

* `int minixfs_chmod(file_system *fs, char *path, int new_permissions)`
* `int minixfs_chown(file_system *fs, char *path, uid_t owner, gid_t group)`
* `ssize_t minixfs_read(file_system *fs, const char *path, void *buf, size_t req, off_t *off)`
* `ssize_t minixfs_write(file_system *fs, const char *path, const void *buf, size_t count, off_t *off)`

You can find more information about these functions in `minixfs.h`. Remember to set `errno` on errors in your code!

Note that for all functions where you need to update times, you should use `clock_gettime(CLOCK_REALTIME, variable_to_update);`.

## Testing

**Testing is ungraded, but highly recommended**

You can grab the test filesystem using `make testfs`. **Do not commit this file. If you overwrite it and want the original version just `rm test.fs` and do `make testfs` again**

You will probably want to reset your `test.fs` file frequently while testing your write functionality.

Note: There's a small chance that `make testfs` can fail - in this case `rm test.fs` and `make testfs` again.

make will generate the minixfs_test executable that you can use for testing. We strongly reccomend writing your own testcases in `minixfs_test.c` and not just on the output of commands like `ls` and `cat` (which we describe how to test with below). This is because subtle bugs in your code can make the output look right, but have random unprintable characters as well.

The `goodies` directory is also included and can also be used to check against the /goodies directory in test.fs.
For example, the output of:
`./fakefs test.fs cat test.fs/goodies/hello.txt` should be the same as `cat ./goodies/hello.txt`

Here are some sample (and not comprehensive) testcases!

```
$ ./fakefs test.fs cat /goodies/hello.txt
Hello World!
$
```

You can even cat directories!

```
$ ./fakefs test.fs cat /
you00000001got00000002ls!00000003congrats00000004 [...]
$
```

So that's what really is going on under the hood?

Want something fun?

```

$ ./fakefs test.fs cat test.fs/goodies/dog.png > dog.png
$ xdg-open dog.png

```

You can store anything on filesystems. See what we hid around the testfs filesystem for you...

You can also test by generating your own filesystems. Simply run ./fakefs mkfs _filename_ to generate a filesystem with the filename _filename_. If you've implemented the write functionality, you can use commands like ./fakefs cp _file1_ _filename_/ to copy files over. programs like `mkdir` should work as well. 

## Other Edge Cases

*	You do need to update `atim` and the `ctim`!
*	You don't need to worry about data corruption or checksums or anything fancy, the filesystem will be valid. (Unless your write has bugs in it)
*	Make sure all the files you cat out in `/goodies` look correct when you `xdg-open` them. Make sure you can get the PNGs and the PDFs to print out correctly.
* Make sure your output is the same size as the files inside the filesystem. You can check this by running stat on the files inside the filesystem(`./fakefs test.fs stat test.fs/FILE_PATH`), and wc -c on the on output of running cat on the file (`./fakefs test.fs cat test.fs/FILE_PATH | wc -c`) to check that the number of bytes is the same.


## Helpful Hints and Notes

*   Handle the edge conditions. You can assume that size will be valid. What is the code supposed to do when you get to a singly indirect block?
*   Draw pictures! Understand what each of the things in the structs mean.
*   Review your pointer arithmetic.
*   **Only** change`minixfs.c`.

## Graded Files

*   `minixfs.c`

**Anything not specified in these docs is considered undefined behavior, and we will not test it.**
