---
layout: doc
title: Shell Fu
---

# Shell Fu

What is shell fu? Well it is

## Bang Patterns

```
!! - Last command
!-<num> - Goes back <num> commands and use that
!$ - Last argument to last command
!* - All args of the previous command
!? - Exit status of the last command
!<num> - Execute command in history
!<pattern> - Execute command starting with pattern
<Up><Down> - Scroll through previous commands
```

## Navigation

```
cd -; - Goes to previous directory
pushd; - Pushes the current directory onto the stack
popd; - Pops and cd the top of the directory stack
j <Directory>; - Jumps to the most recent directory with pattern
```

## Searches

```
history | grep <Command Pattern> - Searches the history file for an executed pattern
CTRL-R - Does a reverse search for a command matching pattern
CTRL-S - Does a forward search (since the creation of history)
```

## Other Shells

zsh, tab completion