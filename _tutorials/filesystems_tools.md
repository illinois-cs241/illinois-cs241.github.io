---
layout: doc
title: "Finding Filesystems Tools and Tips"
learning_objectives:
  - Introducing some tools students may find useful for Finding Filesystems
---

Provided below are some tools that can come in handy when writing and debugging the Finding Filesystems MP. You won't need to understand these to complete the MP, but they can streamline your workflow.

## cat

cat is generally used to view contents of a file e.g. cat 'filename'. As you might've seen in lecture, cat can also be used to create files from the commandline, with ctrl+D (EOF) sent to end.

```console
$ cat >file.txt
Perched on the very precipice of oblivion...teetering on the brink, facing the abyss...dazed, reeling, about to break...
```

cat can also be used to write (>) which can overwrite, and append (>>) to files. The below example produces a file named other_file.txt that contains two copies of the contents of file.txt.

```console
$ cat file.txt > other_file.txt
$ cat file.txt >> other_file.txt
```

## cp

cp copies a file from a source destination and creates a copy at a target destination. 

```console
$ cp file.txt corrupted_file.txt
```

The above command creates a copy of the file file.txt, called corrupted_file.txt, in the current directory.

You can also use cp with directories. For example, to copy the contents of one directory to a target directory.

```console
$ cp -R source_dir dest_dir
```

## cmp

cmp compares two different files byte-by-byte and outputs the difference. Say for example that we modified the following file at the words "teetering", "facing", and "reeling".

```console
$ cat file.txt
Perched on the very precipice of oblivion...teetering on the brink, facing the abyss...dazed, reeling, about to break...
$ cat corrupted_file.txt
Perched on the very precipice of oblivion...teete>>ng on the brink, faCing the abyss...dazed, 7~eling, about to break..
```

Running cmp on these two files would inform us of the first conflict relative to the first file, which we can see in detail with -b.

```console
$ cmp file.txt corrupted_file.txt
file.txt corrupted_file.txt differ: byte 50, line 1 is 162 r  76 >
```

However, there are multiple conflicts in this case, and to see them all, we use the -l flag for verbosity. It may help to limit the range by over which we compare via -n 'LIMIT', and specify a better starting point by skipping over a number of bytes via -i 'SKIP'. 

```console
$ cmp file.txt corrupted_file.txt -b -l -n 75
20 162 r     67 7
21 145 e    176 ~
```

## diff

diff operates similar to cmp in that it compares the differences in files, but has the addition of informing which lines have to be modified and in which way to make the files identical (a problem of edit distance). 

## hexdump

hexdump dumps the content of a file in hexadecimal (or a base of your choosing).
 
```console
$ cat file.txt
Perched on the very precipice of oblivion...teetering on the brink, facing the abyss...dazed, reeling, about to break...
$ ./hexdump file.txt
0000000 6550 6372 6568 2064 6e6f 7420 6568 7620
0000010 7265 2079 7270 6365 7069 6369 2065 666f
0000020 6f20 6c62 7669 6f69 2e6e 2e2e 6574 7465
0000030 7265 6e69 2067 6e6f 7420 6568 6220 6972
0000040 6b6e 202c 6166 6963 676e 7420 6568 6120
0000050 7962 7373 2e2e 642e 7a61 6465 202c 6572
0000060 6c65 6e69 2c67 6120 6f62 7475 7420 206f
0000070 7262 6165 2e6b 2e2e 000a
0000079
```

The leftmost column of numbers index the output in hex, while the values themselves are on the right. 

This can be useful, especially when debugging large files where indirect block behavior needs to be observed. For example, if you copy a file out the fs and see that is corrupted via cmp, you can use the --skip 'offset' flag to ignore the first 'offset' bytes of input advance you to where the difference occurs. The --length 'length' flag may also be useful for limiting and surpressing output beyond 'length' bytes.

