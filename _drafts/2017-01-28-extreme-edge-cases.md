---
layout: doc
title: "Extreme Edge Cases"
permalink: extreme_edge_cases
---

## Backstory


What makes code good? Is it camelCase? Lots of comments? Descriptive variable names, perhaps?

One thing we know is that good code is generally modular--it consists of discrete "units" of functionality that are only responsible for certain behavior. In our case, where we're working with C, these units are primarily functions.

For example, the C string function strlen is responsible solely for determining the length of a string; it doesn't do any I/O or networking. A function that knows all and tries to do all would be bad design, and testing whether that kind of function adheres to expectations would be nontrivial.

A programmer might ask, "Do my units of work behave the way I expect? If my function expects a string, how does it behave when given NULL?". These are crucial questions, since ensuring that units of code work exactly the way one would expect makes it easy to build reliable and robust software. An unreliable unit in a large system can affect the entire system significantly. Imagine if strcpy, for example, did not behave properly on all inputs; all of the higher-level units that use strcpy, and all of the units that interact with those units, would in-turn have unpredictable behavior, and so the unreliablity would propagate through the whole system.

Enter unit testing.

## Unit Testing

Unit testing is a ubiquitous and crucial software development method used heavily in industry. According to artofunittesting.com, a unit test is an automated piece of code that invokes a unit of work in the system and then checks a single assumption about the behavior of that unit of work. This sounds like testing--leave it to the QAs, right? Actually, developers, much to their chagrin, are expected to write their own unit tests.

In order to write effective unit tests, all possible cases of input to a unit (mainly functions, in C), including edge cases, should be tested. Good unit tests test (extreme) edge cases, making sure that the discrete unit of functionality performs as specified with unexpected inputs.

In this Lab, your goal is to create and test the behavior of an arbitrary string manipulation function to determine if it is reliable and predictable. While writing your functions, try and write modular code--this will make your life easier when you test it. You'll learn how to write effective test cases--an incredibly helpful skill for the rest of the course. Finally, you'll be able to take these skills to Facenovel for your next internship and impress your coworkers.

## Camel Caser

We have chosen

{% highlight c %}
char ** camel_caser(const char* input)
{% endhighlight %}

as your arbitrary string manipulation function.

Your manager, to celebrate Hump Day, has asked all of the interns to implement a brand new camelCaser to convert sentences into camelCase. To give you a chance to earn your return offer, he also assigned you to write test cases for all the other interns' implementations of camelCaser, with the implementation hidden from you.

Let's say I want to get a sequence of sentences in camelCase. This is the string passed into your method:

{% highlight text %}
"The Heisenbug is an incredible creature. Facenovel servers get their power from its indeterminism. Code smell can be ignored with INCREDIBLE use of air freshener. God objects are the new religion."
{% endhighlight %}

Your method should return the following:

{% highlight text %}
["theHeisenbugIsAnIncredibleCreature",
"facenovelServersGetTheirPowerFromItsIndeterminism",
"codeSmellCanBeIgnoredWithIncredibleUseOfAirFreshener",
"godObjectsAreTheNewReligion",
NULL]
{% endhighlight %}

The brackets denote that the above is an array of those strings. (More details in this [section](#memory))

*   A NULL pointer is undefined for camelCaser, so you should just return a NULL pointer.
*   A input sentence, `input_s`, is defined as any MAXIMAL substring of the input string that ends with a punctuation mark and does not contain a punctuation mark.
    *   This means that “Hello.World.” gets split into 2 sentences “Hello.” and “World.” and NOT “Hello.World.”.
*   Let the camelCasing of `input_s` be called `output_s`
*   `output_s` is the the concatenation of all words `w` in `input_s` after `w` has been camelcased
    *   The puncation from `input_s` is not added to `output_s`

*   `w` is camelCased iff

    *   it is first lowercased and if it is not the first word in the sentence, then it has its first letter uppercased.
*   words are

    *   delimited by the MAXIMAL amount of whitespace
        *   This means that “hello world” is split into “hello” and world" and NOT "hello ", " “, " world” or any other combination of whitespaces
    *   considered uppercased words if all of its letters are uppercased.
    *   considered lowercased words if all of its letters are lowercased.
*   punctuation marks, whitespace, and letters are defined by `ispunct()`, `isspace()`, and `isalpha()` respectively.

    *   These are parts of the C standard, so you can `man ispunct` for more information.
*   Finally, you return an array of `output_s` for every `input_s` in the input string terminated by a NULL pointer.

We have also included a reference implementation in the folder named “reference”. In the reference folder you can find the main file, which will let you interact with the reference implementation. This means that if you have a question like “what should be the result of inputting <blah> into camel_caser()”, then you should try it out in the reference main file.

Your implementation goes in camelCaser.c and you may not leak any memory.


## Camel Caser Result In Memory

camelCaser takes in a C string, which represents an arbitrary amount of sentences and returns a pointer to a NULL terminated array of C strings where each sentence has been camelCased. Note that all the C strings must be in their own buffers (1 malloc per camelCased sentence).

For those who like pictures I will explain what the return value of camelCaser looks like in memory.

![](./images/char_double_pointer.jpg)

In the above picture you can see that we have a char double pointer called 'array'. Now in this scenario the char double pointer is a character pointer that points to the beginning of a NULL terminated array of character pointers. Each of the character pointers in the array point to the beginning of a NULL terminated char array that can be anywhere in memory in a separate buffer. The reason why these arrays are NULL terminated is because your user will need to know when these arrays end so they do not start reading garbage values. This means that

{% highlight c %}
array[0]
{% endhighlight %}

will return a character pointer. Dereferencing that character pointer gets me an actual character. For demonstration purposes I am going to show you how to grab the character "s" in "as".

{% highlight c %}
// Take array and move it over by 3 times the size of a char pointer.
char **ptr = array + 3;
// Deference ptr to get back a character pointer pointing to the beginning of "as".
char *as = *ptr;
// Take that pointer and move it over by 1 times the size of a char.
char *ptr2 = as + 1;
// Now dereference that to get an actual char.
char s = *ptr2;
{% endhighlight %}

## Writing Unit Tests

Your goal is to show that the other interns’ implementations of camelCaser–which, of course, you can’t see directly–fail on some extreme test cases, and, in the meantime, demonstrate to the head honcho at Facenovel exactly how robust your own function is.

Facenovel promises to pass in C-strings. Likewise, you promise to return a dynamically allocated NULL terminated array of strings (the array and the strings both on the heap and each string in separate buffers).

What kinds of edge cases might come up?

Run make camelCaser to test. You will have to fill in tests in camelCaser_tests.c.

Because Facenovel values their testing server time you may not try more than 16 different inputs and each input must be less than 128 characters (only characters). This does NOT mean your implementation can assume input of 128 characters or less.

Also it is not in the spirit of unit testing to diff your implementation with the one you are testing. So for this lab you may not call on your own camel_caser when implementing the tester.

## Files

*   camelCaser_main.c - Calls your unit tester
*   reference - Contains the reference implementation of camelCaser

*   camelCaser.c - Contains your implementation of camelCaser
*   camelCaser_tests.c - Contains your unit tester for a camelCaser implementation
