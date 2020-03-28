---
layout: doc
title: "Deepfried dd"
learning_objectives:
  - Working with files
  - fseek() and fread()
wikibook:
  - "Files, Part 1: Working with files"
---

## Introduction

`dd` is a command-line utility used to copy data to and from files. Since Linux treats many external devices (including USB drives) as files, this makes `dd` very powerful. For example, the tool can be used to create a backup image of your hard drive and store it as a file which can be uploaded to cloud storage. `dd` could also be used to directly clone one drive to another, write a bootable iso image to a USB drive, and much more. 

For example, the following command would write an .img file (`if`) to a USB drive represented as /dev/disk4 (`of`), in chunks of 4 MB blocks (`bs`).

```
dd if=/path/to/bootable.img of=/dev/disk4 bs=4M
```

See the man pages for dd [here](http://man7.org/linux/man-pages/man1/dd.1.html), and example usage [here](https://linoxide.com/linux-command/linux-dd-command-create-1gb-file/). We suggest you get a feel of `dd` by using it to copy a file from one folder to another. Be careful, however! dd can easily be used to (accidentally or on purpose) to corrupt and entirely wipe disk drives and partitions, so make sure you know exactly what a `dd` command is going to do before running it! We recommend you make a testing folder on your VM and only use `dd` with paths pointing to that folder, so there's virtually no chance of overwriting something you don't want to.

Note that Linux will automatically prevent you (usually) from writing to physical devices unless you run `dd` as root (i.e. via sudo).

## Implementing dd
For this assignment, you will be implementing the `dd` utility in C. Your `dd` implementation will copy data from an input file to an output file in a manner specified by its arguments.

### Background: Blocks

Though "blocks" are a fundamental filesystem concept, this assignment does not rely on heavy filesystems knowledge. For the purposes of this assignment, a *block* is simply a single unit of data. For example, if we run `./dd -i input_file -o output_file -b 128`, we are telling `dd` to copy `input_file` to `output_file`, 128 bytes at a time. Your code should write the first 128 bytes of `input_file` to `output_file`, then the next 128, and so on and so forth in a loop until the `input_file` is exhausted (as opposed to copying the entire file in one go). The arguments of `dd` along with more example usage can be found below.

### Arguments

You must implement the following arguments from the real `dd`. Since it is $CURRENT_YEAR, we won't be using `dd`'s style of arguments (`if=file`, etc), and instead use the standard style (`-i file`, etc). You **should** use `getopt` to parse these arguments, just as you did in the Shell MP.

* `-i <file>`: input file (defaults to stdin)
* `-o <file>`: output file (defaults to stdout)
  * You should create this file if does not already exist.
* `-b <size>`: block size, the number of bytes copied at a time (defaults to 512)
* `-c <count>`: total number of blocks copied (defaults to the entire file)
* `-p <count>`: number of blocks to skip at the start of the input file (defaults to 0)
* `-k <count>`: number of blocks to skip at the start of the output file (defaults to 0)
  * The [documentation](https://pubs.opengroup.org/onlinepubs/009695399/functions/fopen.html) on the `mode` parameter of `fopen` may be useful here.
* For any other arguments, you should exit with code 1. `getopt` will automatically print an error message for you.

Your code will be compiled into an executable and run via the command line.

:bangbang: WARNING: Note that some of these arguments refer to **blocks**, not **bytes**.

### Reading from `stdin`

If implemented optimally, there is no need to specially handle the case where the input file defaults to `stdin`, instead of a "real" file. Keep in mind that you **don't** need to know the size of the entire input file in order to copy the full thing: [`feof`](https://linux.die.net/man/3/feof) is a useful function. When copying from `stdin`, `dd` should write bytes until the user enters Control+D (i.e. end of file) into their terminal. You can see this functionality by running the real `dd`: simply run `dd of=my_file` in your terminal, write some text, and press Control+D. `my_file` will then contain the text you typed into the terminal.

### Status Reports

You must print a status report after dd finishes, similar to the real dd. An example is below:
```
$ ./dd [...parameters]
1182465+1 records in
1182465+1 records out
605422080 bytes copied, 4.354 s, 139034.891 kB/s
```

In addition, your dd should be able to give a “live” status report. You should catch SIGUSR1 and print a status report when the signal is triggered:

```
$ ./dd -i my_file.txt -o my_file2.txt & # start as a background process
$ kill -n SIGUSR1 <pid of dd> # send SIGUSR1 to dd
1182465+0 records in
1182465+0 records out
605422080 bytes copied, 4.354 s, 139034.891 kB/s
```

Use the functions provided in `format.h` to print these reports.

:bangbang: WARNING: `printf` (among other functions) is not safe to call in a signal handler, since it is not reentrant. Ensure your signal handler does not call these functions, **including** any function in `format.h`, and instead indicates to your program to print this status report elsewhere.

### Example Usage

The following command should copy 32 blocks of size 4 kB  (a total of 128 kB) from `input.dat` to `output.dat`, skipping 2 blocks from the start of `input.dat` and 10 blocks from the start of `output.dat`

```
$ ./dd -i input.dat -o output.dat -b 4096 -c 32 -p 2 -k 10
32+0 records in
32+0 records out
131072 bytes copied, 0.000 s, 919441.220 kB/s
```

This command should dump the output of `echo "Hello, World!"` into a file called `output.dat`:

```
$ echo "Hello World" | ./dd -o output.dat
0+1 records in
0+1 records out
12 bytes copied, 0.000 s, 1861.039 kB/s
```

This command should write about 2 GB of random data (from `/dev/urandom`) into a file called `random.bin`, in chunks of 1000 bytes:

```
$ ./dd -i /dev/urandom -o random.bin -b 1000 -c 200000
200000+0 records in
200000+0 records out
200000000 bytes copied, 1.459 s, 137094.439 kB/s
```

### Errors

If the input or output file given to your `dd` is invalid, use the functions in `format.h` to print the corresponding error and exit with return code `1`.

## Testing
Though it is helpful to write tests that call any functions you write in `dd.c`, because your code will be run as a command line utility, we recommend testing in the command line as well. You can assemble a series of calls to your `dd`  executable in a bash script, and use `diff`/`md5sum` along with spot checks to ensure correct functionality. For example, the following shell script would print nothing if your dd implementation is correct:

```
# create a random 32 MB file using the real dd
dd if=/dev/urandom of=test_file.img bs=4M count=8
# copy to my_test_file using my own implementation of dd
./dd -i test_file.img -o my_test_file.img
# print the differences between the two files, if any
diff test_file.img my_test_file.img
```

We included a script `generate_data.sh` to automatically generate a few files of different sizes in the `test_files` directory. You can run it by entering `sh generate_data.sh` inside the assignment directory on your VM.

## Grading
Your code will be auto-graded on all of the parameters listed above. We will also be testing your status reports, both while dd is running (via `SIGUSR1`) and after it completes.
