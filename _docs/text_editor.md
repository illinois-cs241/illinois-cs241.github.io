---
layout: doc
title: "Text Editor"
submissions:
- title: Entire Assignment
  due_date: 02/13/2017, 11:59 PM
  graded_files:
  - editor.c
learning_objectives:
  - Writing a C program
  - File I/O
  - String Manipulation
  - Leveraging a Datastructure
  - Writing an Event Driven Program
wikibook:
  - "C Programming, Part 1: Introduction"
  - "C Programming, Part 2: Text Input And Output"
  - "C Programming, Part 3: Common Gotchas"
  - "Memory, Part 1: Heap Memory Introduction"
---


## Backstory
You have just finished implementing a `Document` library, and now your mentor
wants you to implement a text editor using it. Since you've already turned your
`Document` over to the QA team, who have run a
<span style="text-decoration:line-through;">brutal</span> comprehensive set of tests
(and fixed any bugs they found), your mentor has decided to provide you with a
compiled version of the post-QA `Document` and `Vector` (as an "archive file")
for use in your text editor.

## Overview
Your editor can be run like any other editor with:

```
$ ./editor <filename> [window_size=20]
```

The filename provided will be loaded into the `Document` for manipulation using
`Document_create_from_file()`. Then, `editor_main.c` reads any keyboard stroke
into the text user interface (TUI) and the appropriate function in 
`editor.c` is called. You will need to fill in the functions in `editor.c`.

You can optionally provide a window size (default = 20 lines) for the TUI (so long as it's greater than or equal to 20).

**Important:** Lines will be 1-indexed for this assignment! Character indicies are still 0-indexed.

**Important:** Send all your debug printing to `stderr` instead of `stdout`.

Please keep the following in mind when implementing your text editor:

* Lines are 1-indexed (are they 1-indexed in the document? Be careful!)
* There is no limit on the number of lines
* There is no limit on the number of characters per line
* Some lines may be empty (you should treat these as "")
* Only when the user gives the save command will the contents of the file on
  disk be modified.
* All your editor operations should use the `Document` library to modify the
  document. Don't write directly to the file!

## Valid documents and inputs?
For opening documents, assume that the document will always be a document
created from this text editor. That means it will always have valid characters.

Remember! An empty or non-existant file can be a valid document!

## Format library
We have provided a format library that handles all printing to `stdout` or `stderr`.  This is to ensure that you do not lose points for not matching the format that the autograder expects.

Please take a look at `format.c` and `format.h`. These files include all the
error messages and printouts that you need. (There's not a whole lot for this mp)

## Features
Make sure your editor can perform the following basic tasks:

*   Display the contents of a file.
*   Insert text to a file at a specified line number and character index.
*   Delete `n` characters of text from a file at a specified line number and character index.
*   Delete a line of text from a file
*   Find the next occurance of text in a file and return the location of the match.
*   Merge and split lines
*   Save the file to disk.
*   Quit the editor

## Text User Interface (TUI)

Because you want to really impress your mentor, you've gone ahead and decided to use a text user interface (or TUI for short). Don't worry though, we've already done this part for you. All you have to do is make sure that the callbacks for the TUI (defined in `editor.c`) work perfectly.

The TUI supports the following interaction:

*    Inserting text (just type in those characters)
*    Splitting a line (Press `enter` while in the middle of a line)
*    Merging a line (Press `delete` at the end of a line or `backspace` at the starting of one)
*    Deleting text (`delete` or `backspace`)
*    Deleteing a line (`ctrl+w`)
*    Finding text in the file (`ctrl+f` to search, read below to see how search should work)
*    Saving the file (`ctrl+x`)
*    Exiting (`ctrl+a`)

note: You may be wondering why we use `ctrl+x` instead of `ctrl+s` to save. By default, `ctrl+s` locks the terminal and `ctrl+q` unlocks it.

**Important:** The TUI isn't capable of using all of your editor's features! For example, the TUI does not support deleting multiple characters at once. You still need to implement everything. We WILL be testing for ALL features.

**Important:** The TUI isn't compatible with MacOS's Terminal.App. Try downloading iterm2 instead! Alternatively, use the EWS machines to try the TUI. You can still test your editor by defining test cases in `editor_test.c`.


## Location

In order to keep track of the cursor position, we have provided a struct typedef'ed to `location` defined in editor.h as:

```C
typedef struct {
  size_t line_no;
  size_t idx;
} location;
```

Some functions which you will have to implement will take in a `location` argument to know where to edit the file.

## Display contents
Your text editor should be able to print out the contents of the file that is loaded.

Suppose we had a file `things_on_my_table.txt` which contained the following:

```
mug
salt
T.V. remote
```

Now calling `handle_display_command()` with `start_line` and `max_lines` as 1 
would print out the following if `things_on_my_table.txt` was loaded as a document.

```
1    mug
```

However, calling `handle_display_command()` with `start_line` as 1 and `max_lines` as 5 would print out

```
1    mug
2    salt
3    T.V. remote
```

Since there were less than 5 lines of text.

Again, make sure to use `format.{c,h}` to print these lines out.

### Errors
If the user asks you to print a document which is empty,
 call `print_document_empty_error()`in `format.{c,h}` to tell the user
that they can't do that. You can assume that all of your functions which depend on cursor locations are always given valid locations. 

## Inserting text
Now using the same things_on_my_table.txt file

If a user were to call `handle_insert_command()` with
`line = "peanuts "` and `loc.line_no = 1` and `loc.idx = 1` 


The result of the file would be

```
1    mpeanuts ug
2    salt
3    T.V. remote
```



Note: If the line a user is inserting to is currently empty, that's fine!

Note: If your editor is asked to insert to a line that does not exist
yet, then it should fill in the gap with empty lines. (How can you use
`Document` to make this easy?). You must handle inserts at the end
of a line (so that appending text is possible), but you do not need
to handle inserts past the end of line.


## Deleting text

There are two types of deletes. Deleting characters and deleting lines.

### Deleting Characers

This function is to be implemented in `handle_delete_command`. The current location of the cursor is defined by the `location` argument `loc`. The function will delete `num_chars` characters at the specified line number from the specified character index till the end of the line.

### Deleting Lines

This function is to be implemented in `handle_delete_line`. This function takes in a `size_t` argument called `line_no` to specify the line number which should be deleted. 


## Finding text
Your text editor should be able to find the next occurrence of a string from the current cursor location. You will implement this in the function `handle_search_command`. The current location of the cursor is defined by the `location` argument `loc`. This function will return a `location` to inform the TUI of the location of the results.

Suppose we had the following file (already loaded into the editor):

```
1    According to all known laws of aviation, 
2    there is no [w]ay that a bee should be 
3    bees beEs Bees bees
```

Assume that `[]` represents the position of your cursor

If your user searches for the string "bee" then your cursor should move to the next instance of the string bee including and after the current character as shown below:

```
1    According to all known laws of aviation, 
2    there is no way that a [b]ee should be 
3    bees beEs Bees bees
```

note: the tui automatically increments the character index by one so that the search function doesn't match the same result twice. If you're writing your own test cases and want it to act the same way as the tui, you should handle this increment on your own. Your function in `editor.c` should NOT account for this. 

Searching for bee again:

```
1    According to all known laws of aviation, 
2    there is no way that a bee should be 
3    [b]ees beEs Bees bees
```

Note that the string only has to contain the search string. It's okay if there are characters before or after the found position.

Additionally, the search IS case-sensitive, so searching for bee again:

```
1    According to all known laws of aviation, 
2    there is no way that a bee should be 
3    bees beEs Bees [b]ees
```

will skip the two instances of bee with captial letters. 

Finally, the search wraps around the file. So if we search for bee one more time:

```
1    According to all known laws of aviation, 
2    there is no way that a [b]ee should be 
3    bees beEs Bees bees
```

We're back to the first instance of bee.

If the search string is empty or not present in the file, return a `location` with `line_no` set to 0.

The search string does not have to be a word by itself! For example if I was to search for the string `ana` in the following file:

```
1    B[a]nana
```

will have the above result. Searching for `ana` again:

```
1    Ban[a]na
```

Will just find the second instance of `ana`.

hint: `man strstr`

## Merging Lines
When a user enters a backspace at the beginning of a line or delete at the end of a line, then the previous line and the current line should merge (if you used backspace, vice versa for delete).  

You must implement the function `handle_merge_line`. This function has a `location` as an argument and requires you to merge the line located at `line_no` with the line located at `line_no + 1`. (We will ALWAYS call this function with a valid line number such that `line_no` and `line_no + 1` both exist)

An example using the same lines as in the first example:

```
1    mpeanutsug
2    [s]alt
3    T.V. remote
```

Pressing backspace from the position specified by `[]` will merge the line:

```
1    mpeanutsug[s]alt
2    T.V. remote
```



## Splitting Lines
When a user enters an enter key anywhere in a line, then the line 
should split.

You must implement the function `handle_split_line`. This function has a `location` as an argument and requires you to split the line located at `loc.line_no` at the character index `loc.idx`.

An example:

```
1    mpeanutsug[s]alt
2    T.V. remote
```

Pressing enter from the position specified by `[]` will split the line:

```
1    mpeanutsug
2    [s]alt
3    T.V. remote
```


## Saving text
This should simply write the text to the file.

Implement this in the function `handle_save_command`

## (Optional) Extending the TUI's functionality

This part will NOT be graded.

Take a look at `exts/Instructions.md` for more information on how to make your own extension.

For example, you could implement a copy/paste function for lines or words.

Share your extensions on Piazza if you come up with a cool feature!


## Testing

We have provided a file `editor_test.c` where you can programmatically test
your editor. This compiles to `editor_test` and `editor_test-debug`. We STRONGLY reccomend testing by adding test cases to `editor_test.c` and running `editor_test` instead of testing using `editor` as the tui may overwrite any print statements you wanted to see.
