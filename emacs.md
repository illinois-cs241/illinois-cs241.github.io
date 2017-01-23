---
layout: doc
title: Emacs Tutorial
---

## Introduction

This course provides a great opportunity to learn how to program straight out of the terminal, using either vim or emacs.  Since I am an emacs user and have already come across students in lab asking questions on how to use and customize it, I am creating this basics guide.  For vim help, I'm afraid you'll have to look elsewhere, as I only know how to quit out of vim without saving.


## Emacs Commands

Here are some of the most commonly used default emacs key bindings.  For a full list, look [here](http://wttools.sourceforge.net/emacs-stuff/emacs-keybindings.html) or [here](https://www.cs.colostate.edu/helpdocs/emacs-bindings):


(As an example, C-x C-s means hold Ctrl and press x, then hold Ctrl and press s.  Also, the Meta key, denoted as M, is usually either left-Alt or Esc by default.  On a Mac it is most likely going to be Esc.)

Use arrow keys to move around the file

```
C-g       Abort a command in progress (useful if you mistype)
C-x o     Switch to other window, if there is another open
C-x C-s   Save (or "Save buffer")
C-x C-c   Close (if you have made changes, it will as if you want to 
            save, and you can type y or n or a few other options, 
            and if you hit n, it will ask you to confirm with yes 
            or no)
C-a       Move cursor to beginning of line
C-e       Move cursor to end of line
C-p       Move cursor to previous line
C-n       Move cursor to next line
M-f       Move cursor forward one word
M-b       Move cursor backward one word
M-d       Delete word (starting at cursor)
C-k       Delete line/Kill line (uses kill-buffer) (starting at 
            cursor point)
C-s       Search forward (prompts for search string)
C-r       Search backwards (prompts for search string)
M-%       Replace (prompts for a search string and a string 
            with which to replace it)
C-_       Undo (this is the minus key, but written as underscore)
C-x u     Also undo
C-@       Set mark
C-w       Cut (from kill-buffer)
M-w       Copy (from kill-buffer)
C-y       Paste/Yank (from kill-buffer)
```

A note about the "kill-buffer" when cutting/copying/pasting (and actually, when undoing too):
In order to copy/cut a region of text, move your cursor to the start of the region and set the mark (C-@), then move the cursor to the end of the region and use cut or copy (C-w or M-w), then move the cursor to the location you would like to paste to, and then press (C-y).
(Deleting a whole line with C-k also can be used to cut a line and then paste it, and undoing interacts with the same kill-buffer.)


## Your ~/.emacs File

Most customization for emacs will be done in your ~/.emacs file, which may exist when you first use emacs, but may also not, which is fine.  All of the commands I will describe below can be added in any order in the file. Although if a customization requires multiple lines, the order of those lines may matter.  I have not tested this theory, but I also believe if you make multiple conflicting changes, the last change is the one which will take effect.

When editing this file, I actually tend to use emacs, so I would type the command
```
emacs ~/.emacs
```
into my terminal.


## Custom Hotkeys

One of the most useful customizations, I find, is creating your own hotkeys to make your most-often used commands more intuitive.  Do remember not to override coding commands such as C-c, which you'll need when actually coding.  Other ones to not overwrite include C-d and C-z, which you may use later.

The command to add a new hotkey looks like this:

```
(global-set-key (kbd "insert your hotkey here") 'this_is_what_the_hotkey_does)
```

When I write a hotkey, I always leave myself a comment, using ;; to denote a comment, in order to remember what the hotkey does if it is not obvious.  I also use this to divide sections in my .emacs file as well.

The two hotkeys I have set up on my personal machine now are these:

```
;; custom keys
(global-set-key (kbd "C-g") 'goto-line)
(global-set-key (kbd "C-u") 'undo-only)
```

In order to find more actions you can do besides goto-line, which jumps to a line number which you enter, or undo-only, which is, predictably, the undo command for emacs, I recommend Google.


## Language-Specific Customizations

This next section describes a few commands I have found useful, and each only take effect for certain languages.

First, and relevant to this class, addresses block comments.  This is a style choice I adapted due to the coding standards of my workplace last summer, but I have kept it since.  The command below ensures that each time I begin a new line of a block comment in the C language, the new line begins with a "* ".  In other words, this:

```
/* This is an
example of a block
comment. */
```

becomes this:

```
/* This is an
 * example of a block
 * comment. */
```

The code to make this change is as follows:

```
;; make C block comments continue with stars on each new line
(setq c-block-comment-prefix "* ")
```

Another C customization I use is this:

```
;; when in c mode, use 4 spaces for an indent
(setq c-default-style "gnu"
      c-basic-offset 4)
```
Which replaces a tab with four spaces, as the comment suggests.  You could also change this to two spaces or any other number you prefer, just make sure your code is still readable.

Similarly, because I also code in Python on a regular basis, I do the same thing for Python with the following lines as well:

```
(custom-set-variables
'(python-guess-indent nil)
'(python-indent 4))
```

Also thinking ahead to CS421, if you take it in OCaml, it's worth noting that you can adapt emacs to color your code correctly for filetypes it doesn't normally know how to handle, if someone has created the setup to do so, or you could do this yourself. This typically requires downloading a file, so keep in mind this filepath won't likely be the same if you use it, but this is my command for that process:

```
;; syntax highlighting for files ending with .ml
;; note that the path below is on my computer, and probably will not be the same on yours
(load
   "<insert path on your computer>/.opam/4.03.0/share/emacs/site-lisp/tuareg-site-file")
(setq electric-indent-mode nil)
```


## More General Preferences

Here are a few more miscellaneous customizations I use, with comments to explain their usage:

```
;; skip the startup message and display first buffer directly
;; (if you use linux, this is that large, annoying block of text
;;  which appears at the bottom of the pop-out emacs window, so
;;  this command makes that stop appearing when you load emacs)
(setq inhibit-startup-message t)

;; always display column number
(setq column-number-mode t)
```


## Mouse Mode

One popular mode which I choose not to use, but I have already been asked about, is enabling mouse mode in emacs, essentially making it much more similar to a text editor.  This means you can use your mouse to select where to insert new characters, mark a region, and use the scroll wheel.

(Note: Since I don't use this mode, I found these commands on StackOverflow.)
```
;; enable mouse support
(unless window-system
  (require 'mouse)
  (xterm-mouse-mode t)
  (global-set-key [mouse-4] (lambda ()
                              (interactive)
                              (scroll-down 1)))
  (global-set-key [mouse-5] (lambda ()
                              (interactive)
                              (scroll-up 1)))
  (defun track-mouse (e))
  (setq mouse-sel-mode t)
)
```


## More Help

For more information and various manuals on the use of emacs, look at [this site](https://www.gnu.org/software/emacs/manual/).

