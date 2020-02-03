---
layout: doc
title: "Pugnacious Profiles"
submissions:
- title: Entire Assignment
  due_date: 02/13/2019 11:59 pm
  graded_files:
  - orderbook.c
  - orderbook.h
learning_objectives:
  - Understanding profiling
  - Performance optimization (both time and memory)
  - Applying data structures in systems
---

Over the course of this assignment, we will be exploring how profilers can be used to optimize your C program through 
the combination of dynamic analysis, data-structures and algorithms along with systems programming. 

*Note: We recommend using the EWS systems instead of the VM as there would be further discrepancies of metrics and 
compatibility between both.*

## High Frequency Trading
In high-frequency trading (HFT), programs analyze market data to find and take advantage of trading opportunities that 
often only exist for a few seconds. Messages describing trade offers can reach rates of up to 250,000 messages/second.
Thus, programs involved in automated trading have to process a lot of data extremely quickly.

The program provided to you will read in and process a stream of order messages for multiple stocks. These messages will 
be used to update our program’s view of the market state. This state is known as the “order book”. The messages we 
process will either trigger the entry of a new order, change an existing order, or delete an order. 
At the end of the stream, this program will print out all the current orders in the order book.

## Input / Output
The program will check the command line arguments for a *-i* input filename flag. If it is present, the program will read 
the input stream from the file named there. If it is not, the program will read the input from standard input. 
Likewise, it will check the command line arguments for a *-o* output filename flag. If it is present, the program will 
write the output stream to the file named there. If it is not, the program will write the output to standard output.

**Stream Format**

The program will read in input as ASCII text, of which the format is as follows:

+ A \<id> \<side> \<symbol> \<quantity> \<price> - A new order is added with the supplied details.
  Side is either B for buy or S for sell
  
+ X \<id> \<symbol> - An order is cancelled
 
+ T \<id> \<symbol> \<quantity> - An order is (partially) executed for the given quantity (remove this
quantity from the existing order in your records)

+ C \<id> \<symbol> \<quantity> - An order is (partially) cancelled for the given quantity (remove this
quantity from the existing order in your records)

+ R \<id> \<symbol> \<quantity> \<price> - An order is changed to have the given price and quantity

Example input:
```
A 344532111 S SPY 300 117.880000
R 344532111 SPY 300 117.840000
T 344532111 SPY 100
C 344532111 SPY 100
A 344533172 B SPY 200 117.110000
A 344533348 B SPY 280 118.050000
X 344533348 SPY
```

This would be a new order to sell 300 shares of the stock SPY at $117.88. It is followed by a message to change the 
previous order to sell at a price of $117.84. The next two messages indicate that the order is partially executed and 
cancelled by 100 respectively. The next message is a new order to buy 200 shares of the stock SPY at $117.11. The last
two messages add a buy order and then cancel it. If this was the entire message stream, your program would print out the 
following output.

Example output:
```
344533172 B 200 117.110000
344532111 S 100 117.840000
```

## Part - 1
High frequency trading requires optimal performance demanding high speed and for this part of the project we are going
to meet those goals. While the program provided to you does everything correctly, it is too slow to scale up and process 
real-time orders. On the other hand your competitors solution (TA reference implementation) is way faster than this.   
Your job is to analyze the performance of this program and bring it within a certain threshold thus defeating your 
competitor.

**Time**

To measure time, use the /usr/bin/time command: 
```
$ time ./orderbook -i input/ascii_data.txt -o ob.txt
```

On the EWS systems in Siebel, the implementation provided to you will roughly run around the following time output:
```
real    0m8.281s
user    0m8.022s
sys     0m0.042s
```

*Note: While this may be higher or lower based on the computational resources available, it will never get close to the
expected performance threshold.*

What do each of these values mean and which one is relevant for us? 
[Explanation](https://stackoverflow.com/questions/556405/what-do-real-user-and-sys-mean-in-the-output-of-time1/556411) <br/>

**Task**

Your job is to defeat our reference implementation (your competitors) which has a user time of **2.000 seconds** and 
a system time of **0.020 seconds** for the data-set of ascii_data.txt provided to you. Your program when executed with 
**_-h_** flag needs to be below this threshold maintaining the correctness in order to complete part 1.

**Profile Time**

While the time command does provide us with an overall performance of our program, it doesn't help pin point where the 
issue is. Gprof will come to our rescue. To utilize gprof, use the following commands:

```
$ make orderbook_profile
$ ./orderbook_gprof -i input/ascii_data.txt -o ob.txt
$ gprof orderbook_gprof gmon.out > analysis.txt
$ cat analysis.txt
``` 

Examine the analysis.txt file which will break down the performance of the program as per the respective functions which
should help you get started. 

*Note: The performance with gprof can be a little more due to the overhead. We will be testing your program with the \
time command which should provide more accurate measures.*

**Hints**
- Think whether the issue is inside one particular function or the underlying data-structure. 
- Theoretical time complexity ~ Computational time. Is there any particular type of data-structure well suited for this 
problem which can provide a near constant time complexity.
- What contributes to the system time. 

## Part - 2 (Optional)
While time is an important factor while profiling, memory goes hand in hand with it. Once you have optimized for time, 
you need to now bring your heap memory equal to or less than our reference implementation. To measure memory use the 
following command:

``` 
$ make orderbook_profile
$ env LD_PRELOAD=/lib/libmemusage.so ./orderbook_mem -i input/ascii_data.txt -o ob.txt
```

This should provide you with the following output regarding the amount of heap memory consumed:
```
Memory usage summary: heap total: 16948324, heap peak: 2519164, stack peak: 344
         total calls   total memory   failed calls
 malloc|     470778       16948324              0
realloc|          0              0              0  (nomove:0, dec:0, free:0)
 calloc|          0              0              0
   free|     548400       16948324
```

*Note: orderbook_mem is compiled using -m32 flag which generates a 32 bit executable. This will thus generate consistent 
memory usage on both 32 bit and 64 bit systems.*

**Task**

Our reference implementation uses **11320000** bytes of heap memory for ascii_data.txt dataset. For the **_-h_** flag which will 
execute your time optimized implementation, bring your memory consumption equal to or less than this value. We will be looking 
out for the stack segment as well and thus ensure that your stack peak is less than **2500** bytes.

**Hints**
- Go over the data inside ascii_data.txt determining the highest values. We will not be crossing that threshold for our 
testing data-sets. Typically, in the real world scenario's there is a predefined min / max however you will also come 
across instances when you have to come up with a comprehensive min-max values and store it appropriately.
- Think about the respective data-types that can effectively store the values without wasting memory.
- Take into consideration padding. Memory is stored and retrieved in the form of words size of which is 4 bytes for 
32-bit and 8 bytes for 64-bit. Thus, size of 29 byte struct will be padded to 32 bytes. [Struct Padding & Packing](https://stackoverflow.com/questions/4306186/structure-padding-and-packing)


## Challenge (Not Graded)
Once you have optimized your program for both time and memory, your implementation is ready to face the real world challenge. 
We have a data file with 10 million order entries. Do you think your program can handle so many transactions?

Please click on the following link to download the data file (~225 MB): [dat10m.txt](https://drive.google.com/file/d/1Km9UF0DLtsl4Zq3oYp5Af5EVg262JG3S/view?usp=sharing)

Our reference implementation which uses no tricks and no clever optimizations except for allocating more memory for our 
datastructure executes this with the following performance:
```
$  time ./orderbook -h -i input/dat10m.txt -o ob.txt
real    0m5.574s
user    0m5.127s
sys     0m0.095s
```

It is very well possible to get below **~1.000s** for processing this dataset. Up for a challenge!



