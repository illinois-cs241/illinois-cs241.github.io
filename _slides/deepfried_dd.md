---
layout: slide
title: Deepfried_DD
---

## The Real dd

* A highly configurable command-line utility used to convert and copy files
* Performs block level I/O, as opposed to filesystem-level I/O for increased performance

## What is a Block?

* A sequence of bytes with a predefined size
* Hard drives / SSDs typically have a sector (block) size of 4 kB
* This means read/write operations to the disk can only address 4 kB portions at a time. 
* If you write a 64 kB file to the disk, it will be broken down into 16 writes of 4 kB each

<horizontal/>

## Real dd Usage

Some notable parameters:
* `if=FILE`: read from `FILE` instead of `stdin`
* `of=FILE`: write to `FILE` instead of `stdout`
* `bs=BYTES`: `bs` is the block size; read and write up to `BYTES` bytes at a time (default: 512);
* `count=N`: copy only N input blocks
* `seek=N`: skip `N` obs-sized blocks at start of output
* `skip=N`: skip `N` ibs-sized blocks at start of input

<horizontal/>

## Applications of `dd`

* Data transfer, and in-place modification of files
* Wiping disks for security (e.g. prior to recycling hardware)
  - Contents of a file are not necessarily overwritten on regular deletion
* Generating files with random data (will be useful for testing in upcoming Networking MP)
* "Flashing" / installing custom ROMs (enhanced versions of vanilla OS) on Android devices

## Advanced Applications

* Kernel profiling (measure the speed of `dd if=/dev/zero of=/dev/null`)
* Obtaining a finite data subsection of an infinite data stream
* Implementing conversion/analysis tools (e.g. `hexdump`)

<horizontal/>

## Warnings

`dd` configurability and power can lead to some interesting errors:
* `bs` and `count` definition errors can lead to *infinite size files*
    * This can break password login on your machine!
* `of` definition errors can overwrite endpoints: 
    * Worst case: it can corrupt your hard disk/SSD
* `if` defintion errors can lead to infinitely running `dd`

In short, define each parameter carefully, especially if running as root!

<horizontal/>

## Our Implementation of dd

You will use:
* File-level I/O (`fread`, `fwrite`, etc.) to copy data
* Interrupts (`signal` on `SIGUSR1`) to get status reports

## Our dd's parameters

* `-i <file>`: input file (defaults to stdin)
* `-o <file>`: output file (defaults to stdout)
* `-b <size>`: block size, the number of bytes copied at a time (defaults to 512)
* `-c <count>`: total number of **blocks** copied (defaults to the entire file)
* `-p <count>`: number of **blocks** to skip at the start of the input file (defaults to 0)
* `-k <count>`: number of **blocks** to skip at the start of the output file (defaults to 0)

## Argument Parsing: `getopt()`

* getopt parses function arguments passed through the command line. 
* Specify and handle all special case function parameters.

`getopt(argc, argv, "i:o:b:c:p:k:")`

<horizontal />

## Example Usage 

`./dd -i input_file -o output_file -b 256 -c 1`
* Defines block size to be 256 bytes
* Copies 1 block from offset 0 of `input_file` to offset 0 of `output_file`

<horizontal/>

## Questions?
