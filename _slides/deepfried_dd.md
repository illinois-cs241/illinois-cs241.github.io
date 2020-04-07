---
layout: slide
title: Deepfried_DD
---

## The Real dd

* dd is a command-line utility used to convert and copy files.
* You might recognize 'dd if=/dev/zero of=/dev/null'
* Allows a few dozen different parameters

<vertical />

## Notable dd parameters

* `if=FILE`: read from FILE instead of stdin
* `of=FILE`: write to FILE instead of stdout
* `bs=BYTES`: read and write up to BYTES bytes at a time (default: 512);
* `count=N`: copy only N input blocks
* `seek=N`: skip N obs-sized blocks at start of output
* `skip=N`: skip N ibs-sized blocks at start of input

<horizontal />

## What our dd will look like

* `-i <file>`: input file (defaults to stdin)
* `-o <file>`: output file (defaults to stdout)
* `-b <size>`: block size, the number of bytes copied at a time (defaults to 512)
* `-c <count>`: total number of **blocks** copied (defaults to the entire file)
* `-p <count>`: number of **blocks** to skip at the start of the input file (defaults to 0)
* `-k <count>`: number of **blocks** to skip at the start of the output file (defaults to 0)

<vertical />

## `getopt()` will save your time

* getopt parses function arguments passed through the command line. 
* Specify and handle all special case funtion parameters.
[getopt](https://linux.die.net/man/3/getopt)(argc, argv, "i:o:b:c:p:k:")

<horizontal />

## Blocks

A block is a unit measuring the number of bytes that are read or written at one time. For example, modern hard drives have a sector (block) size of 4 kB - reads or writes to the disk can only address 4 kB portions at a time. If you write a 64 kB file to the disk, it will be broken down into 16 writes of 4 kB each

`./dd -i input_file -o output_file -b 256` -> specifies a block size of 256 bytes
