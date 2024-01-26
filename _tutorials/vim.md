---
layout: doc
title: Vim Tutorial
---

## Introduction

This course provides a great opportunity to learn how to program straight out of the terminal, using either vim or emacs. While many vim tutorials exists online, this is an attempt to distill the important basic commands that enable efficient and painless programming!
 
## Why Use Vim?

The primary reason to use vim is it's efficiency. Even using only its most straightforward commands,
coding is much quicker than with other editors. Learning vim has two additional benefits. First, vim
navigation is used in many other command line tools such as `man` or `less`. Second, many other
applications enable vim's keybindings. This includes most editors (e.g., VSCode) and online tools
such Overleaf. This means that if you prefer an IDE, learning vim can still help you! 

## Understanding Vim Modes

Vim has four common modes. It is useful to understand which commands work in which modes and how to
transition between modes. Vim displays your mode in the bottom left of the terminal. `--Insert--`,
`--Visual--`, `: (for Command Line)`, and `--NORMAL--` (though sometimes normal has no indicator). When you first enter the editor
you will be in `Normal mode`. This mode is the mode in which you enter the most commands. If we want
to write some code, we will need to transition to `Insert mode` by typing `i`. In insert mode, any
text you type will appear on the screen as you normally expect. In order to return to
normal mode you press `<esc>`. For some commands, you may want to select some text (e.g., you want
to copy a few lines), in this case you enter `Visual mode` by pressing `v`. Visual mode enables you
to select a chunk of code and only operate on it (copy, delete, fold, etc.). Similar to insert mode,
visual mode is exited with `<esc>`. Finally, to save and/or exit, you must enter `Command Line mode`
by typing `:` and the associated command (for example `q` will quit). Most commands are specific
to normal and visual mode, but there are a few important ones to understand from command line mode
as well.

## Vim Commands

Here are some of the most commonly used default vim key bindings. There are a more complete lists (for example [here](https://vim.rtorr.com/) or [here](https://catswhocode.com/vim-commands/)), but many commands in these lists are rarely, if ever, useful:

### Navigation: 

Vim has many powerful ways of quickly moving through files.
```
" Arrow keys work in all modes 

" In normal/visual mode only
h   Move cursor one character to the left
j   Move cursor one line down
k   Move cursor one line up
l   Move cursor one character to the right
w   Move cursor to the first letter of the next word (may jump to next line)
e   Move cursor to the last letter of the next word (may jump to next line)
b   Move cursor to the first letter of the previous word (may jump to previous line)
G   Move cursor to the end of the file
gg  Move cursor to the start of the file
zz  Move cursor to the middle of your terminal window
$   Move cursor to end of current line
^   Move cursor to beginning of current line
%   Move cursor between matched brackets
```
Why `hjkl`? Well, this enables navigating around the file
without moving your hands from the home row keys to the arrow keys, which is more efficient.

### Text Modification:

```
" Most commonly these operate on text you have highlighted in visual mode, but they
" can be combined with movement commands above for powerful combinations (see below)
d   Delete: cuts text into clipboard 
c   Change: cuts text into clipboard AND enters insert mode at cursor location
y   Yank: copies text into clipboard
p   Paste: pastes the clipboard text
o   Inserts a newline underneath your current line and enters insert mode
O   Inserts a newline above your current line and enters insert mode

" These can be doubled to operate on lines without first entering visual mode
dd  Cuts current line into clipboard
cc  Cuts current line into clipboard and enters insert mode at the beginning
yy  Yanks current line

" These can be further extended with number to say how many lines to operate on
" For example, 10yy will copy 10 lines.

u   Undo previous edit
<ctrl>-r Redo previous undo
.   Repeat previous command
```

One incredibly powerful combination for the above `dcy` is using them in Normal mode on different
bodies of text. For example, I wish to delete a word under my cursor: `diw` (w for word). Now, lets
say I want to delete the sentence my cursor is on: `dis` (s for sentence). More relevant for coding:
delete an entire function inside curly brackets: `di{` (anything between matched {}), or all
function arguments in your function call : `di(` (everything in matched ()), or you need to rewrite
your print statement and delete everything in quotes: `di"` (everything in matched "") or `di'`
(everything in matched ''). You can do the same to `y` or `c`. This is just one powerful example vim's keybindings and can give you an idea of what all is possible and not included in this tutorial!

### Searching: 

Basic searching is done by typing `/` and whatever you are searching for.
```
n   Move cursor to next match for the searched string
N   Move curors to previous match for the searched string
```
If you want to search for other occurrences of a given string (under your cursor) you can use:
```
#   Search for previous instance of string under your cursor
*   Search for next instance of string under your cursor
```
Done searching? Type `:noh` to remove the highlighting.
Vim also has search and replace functionalities: see [here](https://vim.fandom.com/wiki/Search_and_replace).

Thats it! This is probabaly 95% of the vim you need to know to code with lightning speed!
Everything below will be for ease of use.


## Your ~/.vimrc File

The `~/.vimrc` file gives you additional flexibility and lets you modify the default behavior of
vim. There are many you can find online that may suit you better, but included below is a very bare
bones version that should enable painless vim use:

```
set number "Enables line numbers by default

set showcmd "Displays the current command in the bottom right while you are typing it

syntax on   "Syntax highlighting 
filetype plugin indent on "Automatic indentation based on file type

set tabstop=4 "How large is the \t character
set softtabstop=4 "How large is the <tab> when you type it
set shiftwidth=4 "How large is each indentation
set expandtab    "Automatically convert tabs to spaces 

set mouse=a      "Lets you use the mouse to navigate

set showmatch    "Shows matching bracket for the one under your cursor

set hlsearch     "Highlight strings when searching
set incsearch    "Show results for the search as you type

nnoremap j gj    "Jump down one 'visual' line instead of one 'logical'
                 "This makes a difference when you have lines that wrap a 
                 "lot where vim otherwise would jump down multiple lines with one `j`
nnoremap k gk    "Same as above except moving up a line

inoremap jj <esc>"If you don't want to move your hands to <esc> to exit insert mode :)

set background=dark "This should match your terminal theme for improved highlighting. 
                    "Would otherwise be set to `light` if you have a light theme.

" The following is completely optional, but highlights the current cursor position.
" Enable cursor row line position tracking:
set cursorline
" Remove the underline from enabling cursorline:
highlight CursorLine term=bold cterm=bold guibg=Grey40 ctermbg=darkgrey
" Set line numbering to red background:
highlight CursorLineNR ctermbg=red
"Highlight vertical cursor column
set cursorcolumn

"Set dictionary for vim's spell checker
set spelllang=en_us

"Remaps W and Q to w and q avoid vim from complaining if you hold <shift> too long
:command WQ wq
:command Wq wq
:command W w
:command Q q

"Allow undos between file saves
set undofile
set undodir=~/.vim/undo
"Number of undo levels saved for above
set undolevels=10000
```

## Useful Command Line Commands
There are a couple useful commands to highlight.
```
:setlocal spell "Turn on vim's spell checking
:setlocal nospell "Turn off vim's spell checking
:set paste "Vim by default does not play nice with formatting when pasting unless you turn this on
:set nopaste "But paste mode messes with keybinds, so turn it off when you're done
:set clipboard=unnamedplus "Vim copies to the system clipboard
```

Note, vim by default does not copy to your system clipboard. This can be annoying so the last
command enables vim to work with the system clipboard (you can also place this in your `~\.vimrc`). It is generally recommended to just use `cat`
and copy from the terminal rather than enabling this, but it's your choice.

## Assorted Comments

A couple of tips based on many years of vim use:

1. Avoid quitting your file unless you are really done. You can just minimize vim with `<ctrl>-z` from inside vim 
and then resume editing with `fg` from the terminal. Why? Because quitting destroys your `undo`
stack and `u` does nothing when you re-open the file. 
2. Vim also enables easy management of tabs and window splits available in other editors. See
   [here](https://dev.to/iggredible/using-buffers-windows-and-tabs-efficiently-in-vim-56jc) and
search online for resources on how to do this. 
3. You can start terminals from inside vim or run terminal commands from inside vim. See [here](https://gist.github.com/mahemoff/8967b5de067cffc67cec174cb3a9f49d).
4. Vim has powerful plugins that enable a variety of quality of life improvements. See [here](https://vimawesome.com/) for more details.



