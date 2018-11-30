---
layout: slide
title: Memory
author: Bhuvan
---

## Worksheet Time!

<vertical />

## Question 1

```C
int a = 0;
size_t a_size = sizeof(a++);
printf("size: %zu, a: %d\n", a_size, a);
```

## Question 2

```C
#define swap(a, b) temp = a; \
    a = b; \
    b = temp;

void selection_sort(int* a, size_t len){
    size_t temp = len - 1;
    for(size_t i = 0; i < temp; ++i){
        size_t min_index = i;
        for(size_t j = i+1; j < len; ++i){
			if(a[j] < a[i]) min_index = j;
        }
        if(i != min_index)
			swap(a[i], a[min_index]);
    }
}
```

## Question 3

```C
short mystery_bits(short input){
	short max_set = ~0;
	short masked = input & (0xFF00 ^ max_set);
	short shifted = masked << 16;
	short ret = (shifted | 0xCC);
	return ret;
}
```

## Question 4

```C
void positive_under_ten(int input){
	if(0 < input < 10){
		printf("Input is in the range\n");
	}else{
		printf("Input is not in the range\n");
	}
}
```

## Question 5

```C
int print_error(int err_num){
	switch(err_num){
	case ENOENT:
		printf("No such file or entry\n");
	case EINTR:
		printf("Interrupted\n");
	default:
		break;
	}
}
```


<horizontal />

## Lab Time!

<vertical />

## Using pointers

Where can a pointer point to?

<vertical />

Heap

Stack

Global

Text

...Anywhere!

## What is a function pointer?

A pointer that stores the address of a function's code

<vertical />

With this, we can pass a function as an argument

This allows us to reuse code

E.g., sorting an array of arbitrary objects could use a function pointer as the comparison function

## Part 1

<vertical />

You will be debugging several functions that all use pointers incorrectly

## Part 2

<vertical />-

We've given you a set of functions as tools

Your job is to use these tools in the right order to print "Illinois"

## Part 3

<vertical />-

You will be implementing map and reduce. You can think of map as apply a function to a list of values. Reduce takes a bunch of values and combines them into one values. The intuition for these can be seen as below.

```
map([1, 2, 3], double) = [2, 4, 6]
reduce([1, 2, 3], sum) = 6  
```


<horizontal />

## Hints about the MP

<vertical />

## What is this NULL-terminated array?

Maybe, we don't want to pass around the size of the array everywhere

We know that NULL is not a valid string (but this doesn't work for every type)

```C
char *ptr[] = ...;// vs
int arr[] = ...;
arr[len] = NULL; // NULL = 0, meaning we have a valid element
```

## Useful Functions

* `strdup`: return a string copy
* `strcpy`,`strncpy`: copy a string to another string
* `toupper`, `tolower`: uppercases/lowercases an input character
* `ispunct`,`isspace`,`isalpha`: decide whether a character is punctuation/alphabetical/whitespace

* **Not so useful: `strtok`**

<horizontal />

## Questions?
