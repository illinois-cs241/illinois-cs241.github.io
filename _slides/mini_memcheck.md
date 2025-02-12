---
layout: slide
title: Memory
---

## Why am I doing this lab?

* Learn how to make a basic memory checker
* Learn memory layout and how malloc/free works
* How does free know how many bytes it has to free?

<horizontal />

## How does malloc() manage allocated memory?

* As you'll encounter in this lab, one way of keeping track of memory is via metadata tags
* To accomplish this, we allocate more memory than the user requests
* We'll use pointer arithmetic to make sure that we return the right pointer to the user

## What's in the #tags?

Information about the current block of memory:

* Pointer to next link, if using a linked list
* Size of block
* Whatever else you want...

<vertical />

```C
typedef struct {
	struct metadata *next;
	size_t size;
} metadata;

int main(void)
{
	metadata* md = malloc(sizeof(metadata) + 64);
	
	printf("metadata address:\t%p\n", md);
	printf("start of allocation:\t%p\n", md + 1);

	free(md);
	return 0;
}
```

<vertical />

```C
$ gcc malloc-main.c -o malloc-main
$ ./malloc-main
	metadata address:	0x563eaaa8f2a0
	start of allocation:	0x563eaaa8f2b0
```


<horizontal />

## The Big Picture

<vertical />

![Map one](/images/assignment-docs/lab/slides/memory/val1.png)

<vertical />

![Map two](/images/assignment-docs/lab/slides/memory/val2.png)


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

## Splitting and coalescing

* Reduce memory wastage!
* How can we use tags to split a block?
* How can we use tags to merge adjacent blocks?

Understanding how to do this will be useful when you implement malloc!

<vertical />

![Malloc split](/images/assignment-docs/lab/slides/memory/malloc_split.png)

<vertical />

![Malloc merge](/images/assignment-docs/lab/slides/memory/malloc_double_coalesce.png)


<horizontal />

## Questions?
