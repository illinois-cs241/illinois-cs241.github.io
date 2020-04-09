---
layout: slide
title: Deepfried_DD
---

## The Real dd

* dd is a command-line utility used to convert and copy files (highly configurable)
* You might recognize 'dd if=/dev/zero of=/dev/null'
* The real `dd` performs block level I/O, as opposed to filesystem-level I/O for increased performance
* As a result, if misused, it can corrupt your hard disk/SSD (be very careful running this as root)
* You will be implementing this tool using file-level I/O (`fread`, `fwrite`, etc.)

## Applications of `dd`

* Data transfer, and in-place modification of files
* Wiping disks for security (e.g. prior to recycling hardware)
  - Contents of a file are not necessarily overwritten on regular deletion
* Generating files with random data (will be useful for testing in upcoming Networking MP)
* "Flashing" / installing custom ROMs (enhanced versions of vanilla OS) on Android devices

## Notable dd parameters

* `if=FILE`: read from FILE instead of stdin
* `of=FILE`: write to FILE instead of stdout
* `bs=BYTES`: read and write up to BYTES bytes at a time (default: 512);
* `count=N`: copy only N input blocks
* `seek=N`: skip N obs-sized blocks at start of output
* `skip=N`: skip N ibs-sized blocks at start of input

<horizontal/>

## What our dd will look like

* `-i <file>`: input file (defaults to stdin)
* `-o <file>`: output file (defaults to stdout)
* `-b <size>`: block size, the number of bytes copied at a time (defaults to 512)
* `-c <count>`: total number of **blocks** copied (defaults to the entire file)
* `-p <count>`: number of **blocks** to skip at the start of the input file (defaults to 0)
* `-k <count>`: number of **blocks** to skip at the start of the output file (defaults to 0)

## Use `getopt()`

* getopt parses function arguments passed through the command line. 
* Specify and handle all special case function parameters.
`getopt(argc, argv, "i:o:b:c:p:k:")`

<horizontal />

## Blocks

* A block is a unit measuring the number of bytes that are read or written at one time. 
* Hard drives / SSDs have a sector (block) size of 4 kB
* This means read/write operations to the disk can only address 4 kB portions at a time. 
* If you write a 64 kB file to the disk, it will be broken down into 16 writes of 4 kB each

`./dd -i input_file -o output_file -b 256` -> specifies a block size of 256 bytes
