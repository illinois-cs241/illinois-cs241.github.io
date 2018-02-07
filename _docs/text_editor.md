---
layout: doc
title: "Text Editor"
submissions:
- title: Entire Assignment
  due_date: 02/05/2018, 11:59 PM
  graded_files:
  - editor.c
  - document.c
  - sstream.c
learning_objectives:
  - Writing a C program
  - File I/O, serializing/deserializing
  - String manipulation
  - Leveraging a datastructure
  - Writing an event-driven program
wikibook:
  - "C Programming, Part 1: Introduction"
  - "C Programming, Part 2: Text Input And Output"
  - "C Programming, Part 3: Common Gotchas"
  - "Memory, Part 1: Heap Memory Introduction"
---


## Backstory

It's time to end the feud between vim, emacs and nano users (although everyone knows vim is the best). We're going to be implementing a text editor that blows them all out of the water! Of course, a full-fledged text editor is a substantial project that's usually open source, so you've got some "contributions" from the "open source community" (yours truly) and have been provided some of the components: namely, a vector library, an incomplete abstraction of a document, and a few different input methods (we'll talk about those later).

It's your job to finish up the document abstraction and write the callbacks that actually edit the file.

## Overview

Your editor has two modes: a line editor mode (like `ed`) and a text user interface (TUI) mode (like `vim` or `nano`). These are described in more detail below. Both of these modes make use of the same text-editing functions that you will be implementing. You should use the line editor for initial testing, and you can try the TUI once you have completed some work on the code.

Your basic line editor can be run with:

```
$ ./editor <filename>
```

For the TUI, add the `-n` flag:

```
$ ./editor -n <filename>
```

The file will be loaded into a `document` object for manipulation using `document_create_from_file()`. Then, `editor_main.c` will get input from the user in a loop and call the appropriate functions in `editor.c`. You will need to fill in the functions in `editor.c`.

**Important:** Lines will be 1-indexed for this assignment! Characters within a line are still 0-indexed.

**Important:** Send all your debug printing to `stderr` instead of `stdout`.

Please keep the following in mind when implementing your text editor:

* There is no limit on the number of lines.
* There is no limit on the number of characters per line.
* Some lines may be empty (you should treat these as empty strings, "").
* _Only_ when the user gives the save command will the contents of the file on disk be modified.
* All your editor operations should use the `document` library to modify the document. Don't write directly to the file!

## Features

Make sure your editor can perform the following basic tasks:

*   Display the contents of a file.
*   Insert text into a file at a specified line number and character index.
*   Delete _n_ characters of text from a file at a specified line number and character index.
*   Delete a line of text from a file.
*   Search: find the next occurrence of text in a file and return the location of the match.
*   Merge and split lines.
*   Save the file to disk.
*   Quit the editor.

## Format Library

We have provided a format library that handles all printing to `stdout` or `stderr`.  This is to ensure that you do not lose points for not matching the format that the autograder expects.

Please take a look at `format.c` and `format.h`. These files include all the error messages and printouts that you need. (There aren't many for this MP, but later ones will have more.)

## Document

We have provided an incomplete abstraction of a document that uses the vector API from the Perilous Pointers.

You only need to implement the functions `document_write_to_file`, `document_create_from_file`, and `document_insert_line`.

Since you're working with files, you should have basic notions of serialization and deserialization. _Serialization_ is the process of converting the state of a data structure or object into a representation that can be stored (in this case, in a file) or transmitted. _Deserialization_ is the reverse process, where a serialized representation is converted into the original data structure or object. These two processes are equal and opposite, and will cancel each other out if sequentially applied on something. That is, `deserialize(serialize(x)) == x`.

Make sure you're completely clear on the difference between a vector and a document! Your document uses an _underlying_ vector to represent the state of a file, and each entry in the vector corresponds to a single line in the file. This makes it much easier to manipulate individual lines.

Recall that [POSIX defines a line](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_206) as "A sequence of zero or more non-`<newline>` characters plus a terminating `<newline>` character". When you're working with the document, be careful how you handle newlines in the files you're opening. Remember, serialization and deserialization are equal and opposite. Your document already provides an abstraction for lines of text. Do you need to add the newline characters to the strings you store?

### Valid Documents and Inputs?

When opening documents, assume that the document will always be a document created by this text editor. That means it will always have valid characters.

Note that we do print tabs as a single space. This is to prevent graphical glitches in the TUI mode.

Remember! An empty or non-existent file can be a valid document!

## sstream library

By now you've probably realized that the standard C library doesn't have many tools for working with strings, at least not as many as some other languages, such as python, do by default. To make our lives easier we are going to be building a string library called sstream (which is short for 'string stream') that allows you to deal with strings at a higher level. To this end, we are going to provide you with the skeleton of this library so that you can implement some string manipulation functions, which will make your tasks in `editor.c` much simpler. Here's a proof of concept.
```C
bytestring output = {NULL, 0};

// size will be 4, position will be 0
sstream *strm = sstream_create((bytestring ){"\0\0\0\0", 4}); 

// returns 3, output should be {"\0\0\0", 3}
sstream_read(strm, &output, 3);

// returns 3
sstream_tell(strm);

// returns 0, position is now 4
sstream_seek(strm, 1, SEEK_CUR);
// returns -1, position is still 4
sstream_seek(strm, 1, SEEK_END);

// returns 0
sstream_remain(strm);

// size will be 14, position is now 0
sstream_str(strm, (bytestring ){"Doesn't matter\0 what comes after", -1});

// size will be 22, position still 0
sstream_append(strm, (bytestring ){", at all", -1});

sstream_seek(strm, 0, SEEK_END);
// returns 22, position still 22, output->str is "Doesn't matter, at all"
// output->size is 22
sstream_read(strm, &output, -39);

sstream_seek(strm, 0, SEEK_SET);
// entire expression returns 0, position now is at 11
sstream_seek(strm, sstream_subseq(strm, (bytestring ){"ter", -1}), SEEK_CUR);

// note that erase operations are commutative; order doesn't matter; after
// both erases, stream buffer should contain "Doesn't, at all"
sstream_erase(strm, 3);
sstream_erase(strm, -4);

// and now should contain "Doesn't compute, at all"
sstream_insert(strm, (bytestring ){" compute", -1});

// note that LONG_MIN=-9223372036854775808                          
//                                                        |long will overflow here, starting with the 9
sstream_write(strm, (bytestring ){"-00009223372036854775809+30", -1});
long out;
// returns 23, out = -922337203685477580
sstream_parse_long(strm, &out);
// returns 1, out = 9
sstream_parse_long(strm, &out);
// returns -1
sstream_parse_long(strm, &out);
```
More details about the functions you will need to implement can be found in `sstream.h`.

## Line Editor Mode

This is what runs if you don't add the -n flag. You _should_ be doing some initial testing with this mode, as it is easier to debug with than the TUI.

You have the following commands available with the line editor:

*   `s`:                                       Saves a file
*   `q`:                                       Quits the editor
*   `p [optional lineno]`:                     If no `lineno` is given, print the whole file; otherwise, print five lines centered around `lineno`
*   `p [lineno] [idx] [max_lines] [max_cols]`: Print at most `max_lines` lines starting from the `lineno`
*   `d [lineno]`:                              Deletes line at `lineno` (shifts all lines past `lineno` up by 1)
*   `d [lineno] [idx] [num_chars]`:            Deletes at most `num_chars` characters from line at lineno starting at character index `idx` (shifts all characters past `idx+num_chars` to the left) 
*   `w [lineno] [string to insert]`:           Replaces line at `lineno` with `string to insert`
*   `a [lineno] [string to insert]`:           Appends `string to insert` to the line at lineno
*   `i [lineno] [idx] [string to insert]`:     Inserts `string to insert` to the line at `lineno` starting at the character index `idx`
*   `m [lineno]`:                              Merges line at `lineno` with lineast `lineno+1`
*   `sp [lineno] [idx]`:                       Splits a line at `lineno` from character index `idx` (All subsequent characters inserted on a new line below) 
*   `f [lineno] [idx] [search string]`:        Searches for the next instance of the `search string` after line `lineno` and character index `idx`

The line editor works by matching your input against a few regular expressions. You do not need to implement this; we have provided the code in `editor_main.c`.

#### Regular Expressions

This section is optional reading material! In case you wanted to know how our parser works, we use [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) (regexes) are powerful tools that are used to describe regular languages. Although there are things regex can and can't do (it can't [parse HTML](https://stackoverflow.com/a/1732454) for instance), it is useful for searching for patterns in strings and input validation. vim, grep and a few other command-line utilities all use the POSIX regex syntax to allow users to search and perform other tasks. We can use it here to check for valid input strings.

This is used in `editor_main.c`. To learn more about matching regex patterns in c try `man regex`. To learn more about POSIX regex syntax in general, see `man 7 regex`.

## Text User Interface (TUI)

Because you want to really beat the competition, you've gone ahead and decided to use a text user interface (or TUI for short). Don't worry though, we've already done this part for you. All you have to do is make sure that the callbacks for the TUI (defined in `editor.c`) work perfectly.

The TUI supports the following interaction:

*    Inserting text (just by typing)
*    Splitting a line (press Enter while in the middle of a line)
*    Merging a line (press Delete at the end of a line or Backspace at the starting of one)
*    Deleting text (Delete or Backspace)
*    Deleting a line (Ctrl+W)
*    Finding text in the file (Ctrl+F to search; read below to see how search should work)
*    Saving the file (Ctrl+X)
*    Exiting (Ctrl+A)

_Note:_ You may be wondering why we use Ctrl+X instead of Ctrl+S to save. By default, Ctrl+S locks the terminal and Ctrl+Q unlocks it.

_Note:_ On Mac keyboards, Delete and Backspace are respectively Fn+Delete and Delete.

**Important:** The TUI isn't capable of using all of your editor's features! For example, the TUI does not support deleting multiple characters at once. You still need to implement everything. We WILL be testing for ALL features.

## Location

In order to keep track of the cursor position, we have provided a struct typedef'ed to `location` defined in editor.h as:

```C
typedef struct {
  size_t line_no;
  size_t idx;
} location;
```

Some functions you will be implementing will take in a `location` argument to know where to edit the file.

## Editor 

We have defined and typedef'd a struct `editor` to keep track of various variables. Here is the definition from `editor.h`. 

```C
typedef struct {
  document *document;
  sstream *stream;
  char *filename;
} editor;
```

Most functions in `editor.c` that you will edit take in an `editor*`. This will allow you to access the underlying `document` and make use of the `stream`.

## Functionality

The functions you will have to implement are listed and documented in `editor.h`, `document.h` and `sstream.h`.

This section explains what you need to implement for the editor portion of this MP in more detail.

### Display Contents

Your text editor should be able to print out the contents of the file that is loaded.

Suppose we had a file `things_on_my_table.txt` which contained the following:

```
mug
salt
T.V. remote
```

Now, calling `handle_display_command()` with `start_line` and `max_lines` as 1
would print out the following if `things_on_my_table.txt` was loaded as a document:

```
1    mug
```

However, calling `handle_display_command()` with `start_line` as 1 and `max_lines` as 5 would print out:

```
1    mug
2    salt
3    T.V. remote
```

Since there were fewer than five lines of text.

If `max_lines == -1`, you should print from `start_line` to the end of the document.

You can ignore the variables `start_col_index` and `max_cols` (these are used for handling the TUI display)—just be sure to pass them on to the appropriate function in `format.h`.

Again, make sure to use `format.{c,h}` to print these lines out.

_Note:_ This function could be called with 'start_line' as 0 for an empty document!

#### Errors

If the user asks you to print a document which is empty, call `print_document_empty_error()` in `format.{c,h}` to tell the user that they can't do that. You can assume that all of your functions which depend on cursor locations are always given valid locations.

### Inserting Text

Now, using the same `things_on_my_table.txt` file:

If a user were to call `handle_insert_command()` with `line = "peanuts "` and `loc.line_no = 1` and `loc.idx = 1`, the result of the file would be:

```
1    mpeanuts ug
2    salt
3    T.V. remote
```

You can assume that `loc.line_no` is always greater than or equal to 1! (If you want to be really fancy, you can even add this in an assert!)

_Note:_ If the line a user is inserting to is currently empty, that's fine!

_Note:_ If your editor is asked to insert to a line that does not exist yet, then it should fill in the gap with empty lines. (How can you use `document` to make this easy?) You must handle inserts at the end of a line (so that appending text is possible), but you do not need to handle inserts past the end of line.

### Writing/Appending Text

This overwrites/appends to any text that may already be on that line. If the line doesn't exist, it will first create it (this is similar to how insert works).

To make things more interesting, you will need to interpret `\` as an escape character. There is only one special escape sequence you need to recognize: `\` followed by a `n` for a newline. `\` followed by any other character (including the null byte) will be replaced with the second character. So `\n` will need to split the line, but `\\n` will insert the text `\n`. Likewise, `\d` will be replaced with the character `d`.

For every `\n` (`\` followed by `n`) that you encounter, you will need to split the string there and then insert the remainder of the string on a line by itself. Note that there can be several `\n` on a single input line.

Escaping characters is __only__ necessary for the functions `handle_write_command` and `handle_append_command`. Insert does __not__ need to implement handling escape characters.

For example, using the line editor mode, suppose the input file is:

```
1       Hello
2       Goodbye
3       Hello again!
4       Goodbye again!
```

and I use the command `w 3 Yes\nNo`, the file becomes:

```
1       Hello
2       Goodbye
3       Yes
4       No
5       Goodbye again!
```

Then, if I use `a 1 \nworld!\nHaha`, the file becomes:

```
1       Hello
2       world!
3       Haha
4       Goodbye
5       Yes
6       No
7       Goodbye again!
```

Then if I use `a 1 \\n \a\`, the file becomes:

```
1       Hello\n a
2       world!
3       Haha
4       Goodbye
5       Yes
6       No
7       Goodbye again!
```

### Deleting Text

There are two types of deletes: deleting characters and deleting lines.

#### Deleting Characters

This function is to be implemented in `handle_delete_command`. The current location of the cursor is defined by the `location` argument `loc`. The function will delete `num_chars` characters at the specified line number from the specified character index until the end of the line.

#### Deleting Lines

This function is to be implemented in `handle_delete_line`. This function takes in a `size_t` argument called `line_no` to specify the line number which should be deleted.

### Finding Text

Your text editor should be able to find the next occurrence of a string from the current cursor location. You will implement this in the function `handle_search_command`. The current location of the cursor is defined by the `location` argument `loc`. This function will return a `location` to inform the editor of the location of the results.

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

_Note:_ the TUI automatically increments the character index by one so that the search function doesn't match the same result twice. If you're writing your own test cases and want it to act the same way as the TUI, you should handle this increment on your own. Your function in `editor.c` should __not__ account for this.

Searching for "bee" again:

```
1    According to all known laws of aviation,
2    there is no way that a bee should be
3    [b]ees beEs Bees bees
```

Note that the string only has to contain the search string. It's okay if there are characters before or after the found position.

Additionally, the search __is__ case-sensitive, so searching for bee again:

```
1    According to all known laws of aviation,
2    there is no way that a bee should be
3    bees beEs Bees [b]ees
```

...will skip the two instances of "bee" with capital letters.

Finally, the search wraps around the file. So, if we search for bee one more time:

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

_Hint:_ `strstr`

### Merging Lines

When a user enters a Backspace at the beginning of a line, then the previous line and the current line should merge. Likewise, when they enter Delete at the end of the line, the current line and the next line should merge.

You must implement the function `handle_merge_line`. This function has a `location` as an argument and requires you to merge the line located at `line_no` with the line located at `line_no + 1`. (We will __always__ call this function with a valid line number, such that `line_no` and `line_no + 1` both exist.)

An example using the same lines as in the first example:

```
1    mpeanutsug
2    [s]alt
3    T.V. remote
```

Inputing `m 1` or pressing backspace from the position specified by `[]` will merge the line:

```
1    mpeanutsug[s]alt
2    T.V. remote
```

### Splitting Lines

When a user inputs `sp [lineno] [idx]` or presses the Enter key anywhere in a line, the line should split.

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

### Saving Text

This should simply write the text to the file. Implement this in the function `handle_save_command`.

## (Optional) Extending the TUI

This part will __not__ be graded.

In order to make our text editor a real competitor with existing ones, we need to make sure that
we have a good way of improving it and adding new features. An extensions system makes it easy for
the community to do all this hard work ~~for~~ with us.

Take a look at `exts/Instructions.md` for more information on how to make your own extension.

For example, you could implement a copy/paste function for lines or words. I would really like to see someone implement a search and replace extension. Please reach out to us if you do that.

Share your extensions on Piazza if you come up with a cool feature!

## Managing Memory

Remember, `man` is man's best friend. Since you're working with dynamic memory, there are quite a few functions you should be familiar with before you proceed. `malloc`, `free`, `realloc`,  `calloc`, `memmove` are your friends; don't shy away!

* `man 3 malloc`
* `man 3 free`
* ...et cetera

## Undefined Behavior

_Undefined behavior_ is a scenario or edge case for which there is no documentation describing how the code should react. For example, man pages do not describe what happens when you feed `NULL` into `strcmp`. Your open-source contributors will not answer questions like "What if my user wants an element past the end of the vector?", because that is undefined behavior.

So, for this MP, you should use `assert` statements to check that your user is passing valid input to your function before operating on the input. For example, if you were implementing `strcmp(const char *s1, const char *s2)`, then your code might look like this:

```C
#include <assert.h>

strcmp(const char *s1, const char *s2) {
    assert(s1 != NULL && s2 != NULL);
    // Compare the two strings
    .
    .
    .
    return rv;
}
```

## Testing

We have provided a file `editor_test.c` where you can programmatically test
your editor. This compiles to `editor_test` and `editor_test-debug`. We _strongly_ recommend testing by adding test cases to `editor_test.c` and running `editor_test` instead of just testing using `editor`, as this will make your life a lot easier as you can test very specific things faster.

### Line Editor Scripts

Here's a feature you don't find everywhere! (To be fair, you actually can do this and more with `sed`.)

Suppose we have a file with the following test:

```
1      Somebody once told the world was gonna roll
2      I ain't the sharpest tool in the shed
3      She was looking kinda dumb with her finger and her thumb
4      According to all known laws of aviation
5      In the shape of an L on her forehead
```

and I use the following commands:

```
d 4
a 1  me
w 5 #I'mSorryForTheBadJoke
s
q
```

I should have the following:

```
1      Somebody once told the world was gonna roll me
2      I ain't the sharpest tool in the shed
3      She was looking kinda dumb with her finger and her thumb
4      In the shape of an L on her forehead
5      #I'mSorryForTheBadJoke
```

What if I wanted to save this process so that I can edit other files with the same error?

You can! Just save the commands to a file `commands.txt`, containing:

```
d 4
a 1  me
w 5 #I'mSorryForTheBadJoke
s
q
```

and then you can run it by using `cat commands.txt | ./editor [inputfile]`

This can be used to test the editor's behavior quickly!
