---
layout: doc
title: "Melt Kings Secret"
submissions:
- title: Entire Assignment
  due_date: 02/27/2019 11:59 pm
  graded_files:
  - secret.txt
  - commands.txt
learning_objectives:
  - Learn about the underlying vulnerabilities involved in spectre & meltdown
  - Start questioning assumptions when developing a program
---

## Melt King's Secret
The king of *Systems Programming* is about to retire and impressed by your talent as the Duke of *P=NP* wanted you to 
take over the iron throne. However, the hand of the king convinced him that you lack security white-hat / black-hat 
skills and has thus created a fail proof system for you to crack. If you fail to uncover the kings secret, 
the hand of the king becomes the de-facto ruler and will sentence you to the nights watch. 

## Royal System
The architecture of the system is based on CISC (Complex Instruction Set Computing) and takes a command and its type as 
input on each line. The commands are static while the types can change The following are the list of commands available:
``` 
LOAD VALUE[*]
    Loads the key associated with the value inside the main memory. 
    The VALUE is either "duke" or "kingsSecret". 
    [*] is an optional number used to load only a specific character from the key.   
```

```
UPDATE CACHE[*] / CACHE[MEM]
    Update the cache with the key loaded inside the main memory. 
    [*] is an optional number used to load the first character from key inside the specfic location / address. 
    [MEM] is another optional which takes the first character loaded from key and acts as a location.
``` 

```
PRINT CACHE[*] / CACHE-TIME[*]
    Print all the cache locations and its values. You can substitute CACHE with CACHE-TIME to see the time taken to load 
    a particular location inside the cache. 
    [*] is optional number which is used to print the specific location of the cache.   
```

```
CLEAR ALL
    Clear the main memory and the cache. 
```

```
EXIT SYSTEM 
    Shut down the system. 
```

- Possible values for key: a-z
- Size of the cache: 26
- You have access to the key for value: duke. 

Lets try to retrieve the key for value duke:
```
LOAD duke
UPDATE CACHE
PRINT CACHE
PRINT CACHE[1]
CLEAR ALL

```

Make sure you get familiar with all the commands and how to use them. 

## Requirement
You need to find the key associated with the value *kingsSecret*. This requires privileged access as being equivalent to 
be stored inside kernel memory. Create a file secret.txt and add the kingsSecret to it. Also, add the final list of 
commands that you used to hack the system. 

## Meltdown
The hand being happy with king's decision decided to impress him further. He did so by adding out-of-order execution or 
branch prediction to the processor underneath the system. Essentially what that means is given an instruction, why wait 
for it to fully pass through the processor pipeline while the other instruction can start simultaneously. The same idea
does not just apply to the next instruction but applies jumping to any instruction inside the code. 
If there is an error, the state of the code and memory will go back to where the issue happened thus preserving the 
integrity. The following will enable this functionality inside the royal system:
 
```
EXECUTE START / END
    You can execute commands within start and end block asynchronously. The commands 
    will only start executing after the EXECUTE END.
```

*Note: All modern processors by default use out of order execution for optimization and is not dependant on user 
code for it.*

## Hack
As the state of the memory is reverted, you cannot read values from privileged locations but in combination with 
cache-timing, you can exploit this. This vulnerability in most modern processors allows user programs to read 
kernal memory (Meltdown) and also read memory of other user programs (Spectre). 

Can you frame a similar exploit for the royal system and read the kingsSecret?

**Hints**
- Understand what each command does and observe what happens when you access the kingsSecret
- Try the EXECUTE block of commands with the duke and see how it functions
- Is the output always going to be deterministic when you devise your hack? 

## More
- https://medium.com/@mattklein123/meltdown-spectre-explained-6bc8634cc0c2
- https://googleprojectzero.blogspot.com/2018/01/reading-privileged-memory-with-side.html
- https://meltdownattack.com/
