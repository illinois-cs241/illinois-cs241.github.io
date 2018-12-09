---
layout: slide
title: Memory
author: Bhuvan
---

## Why am I doing this lab?

* Learn how Valgrind works
* Learn memory layout and how malloc/free works
* How does free know how many bytes it has to free?

<horizontal />

## Memory Offsets \ in C

<vertical />

```C
typedef struct{
	int n1;
	float n2;
	char st[10];
} contact;

int main(){
	contact fred;
	printf("Contact address:\t%p\n", &fred);
	printf("Contact n1 location:\t%p\n", &fred.n1);
	printf("Contact n2 location:\t%p\n", &fred.n2);
	printf("Contact nst location:\t%p\n", &fred.st);
	return 0;
}
```

<vertical />

```console
$ gcc main.c -o stack
$ ./stack
	Contact address:		0x7ffcc8568b40
	Contact n1 location:	0x7ffcc8568b40
	Contact n2 location:	0x7ffcc8568b44
	Contact nst location:	0x7ffcc8568b48
```

## What does this mean?
* Your compiler calculates offsets from the base address of your contact (in this case, `fred`)
* It knows that the first element is at offset 0, the second element is at offset +4, the third element is at offset +8, and so on

<horizontal />

## Cool, So What does this have to do with Malloc?

<vertical />

malloc does the same thing, but on the heap

<vertical />

```C
typedef struct{
	int n1;
	float n2;
	char st[10];
} contact;

int main(){
	contact* fred = malloc(sizeof(*fred));
	printf("Contact address:\t%p\n", fred);
	printf("Contact n1 location:\t%p\n", &fred->n1);
	printf("Contact n2 location:\t%p\n", &fred->n2);
	printf("Contact nst location:\t%p\n", &fred->st);
	free(fred);
	return 0;
}
```

<vertical />

```console
$ gcc malloc-main.c -o malloc-main
$ ./malloc-main
	Contact address:		0x1bcd010
	Contact n1 location:	0x1bcd010
	Contact n2 location:	0x1bcd014
	Contact nst location:	0x1bcd018
```

<horizontal />

## Right But What Does this have to do with _our_ Malloc?

* As you'll encounter in this lab, one way of keeping track of memory is via metadata tags
* To accomplish this, we allocate more memory than the user requests
* We'll use pointer arithmetic to make sure that we return the right pointer to the user

## What's in the #tags?

Information about the current block of memory:

* Pointer to next link, if using a linked list
* Size of block
* Whatever else you want...

## Splitting and coalescing

* Reduce memory wastage!
* How can we use tags to split a block?
* How can we use tags to merge adjacent blocks?

Understanding how to do this will be useful when you implement malloc!

<horizontal />

## The Big Picture

<vertical />

![Map one](/images/slides/memory/val1.png)

<vertical />

![Map two](/images/slides/memory/val2.png)


<horizontal />

## Hints

<vertical />

* `meta_data * head` : head for linked-list
* `total_memory_requested`: keep track of bytes used
* `total_memory_freed`: keep track of bytes freed
* Think about how to create a linked-list and insert/remove
* Insert has to be constant time, but free doesn't
* Have to catch bad calls to free and increment `invalid_addresses`

## Hey! Shouldn't we not be able to do arithmetic with void pointers?

* Technically yeah, but gcc and clang treats it as a `char*`
* In short, don't do it because the standard doesn't guarantee it

<horizontal />

## Questions?
