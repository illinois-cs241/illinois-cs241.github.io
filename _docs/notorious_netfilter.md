---
layout: doc
title: "Netfilter Kernel Module"
submissions:
- title: Entire Assignment
  due_date: 04/03/2019 11:59 pm
  graded_files:
  - filter.c
  - filter.h
learning_objectives:
  - Learn about kernel modules
  - Understand how packets are filtered
  - Understand how networking concepts are applied at a low level
---

Requirements:
  + Understand how netfilter could be used to block packets
  + Understand how the concepts you leared in CS 241 apply to the kernel
  + Log incoming packets from google
  + Have a proc endpoint to display how many times each of google's IP ranges sent a packet 
  + Optional: Implement something extra (more statistics or some actual filtering)

## Part 1 - Making a kernel module (optional)

There's two main components to making a kernel module, an initializer and an
exit handler. The initializer will run when the module is loaded and the exit
handler will run when the module is unloaded.

To accomplish this, either create two functions named `init_module` and
`cleanup_module` or create two functions with any names (`foo` and `bar`) and
call `module_init` and `module_exit` on the initializer and exit handler
respectively (`module_init(foo)`, `module_init(bar)`).

Additionally, we will need to specify a module license (you don't have to, but
the compiler will warn you if you don't). We'll stick to GPL, so include the
line:
```
MODULE_LICENSE("GPL");
```
in your code.

Since it is cumbersome to use debuggers with kernel modules (there are kernel
debuggers, but we won't use them today), we will rely on logging for outputing
debug info. Unlike with a normal program, you do not have a stdout/stdin channel
so there is no way to have a "default" output stream for non-logging purposes.
To log information you will use `printk` (It works almost exactly like
`printf`). To view the log either view the contents of files in `/var/log` or
use the program `dmesg`. I prefer to use `dmesg -wH` since that shows a stream
of output with human readable timestamps.

To complete part 1, write a kernel module in `filter.c` and using `printk` write
"hello world" to the log.

## Part 2 - Making a netfilter module

In this part we will experiment with `netfilter` - a way of filtering packets at
the kernel level. To accomplish this, we'll need to setup a few things.

We'll need a global variable to keep track of our netfilter options, we'll need
to initialize those options in our `init` callback, and finally, we'll need to
register/unregister our netfilter hook at `init`/`exit`.
```
// global:
static struct nf_hook_ops netfilter_ops;

// in init
  netfilter_ops.hook = main_hook; // What is main_hook?
  netfilter_ops.pf = PF_INET;
  netfilter_ops.hooknum = 0; // We want to run the hook before routing packets
  // We want this hook to run before other currently installed hooks
  netfilter_ops.priority = NF_IP_PRI_FIRST;
  //                    v init_net is a variable exported by the netfilter header
  nf_register_net_hook(&init_net, &netfilter_ops); // register the hook

// in exit
nf_unregister_net_hook(&init_net, &netfilter_ops); // unregister the hook
```

These options will create a netfilter that will filter incoming packets. You can
find details online about how to filter outbound packets.

In this example `main_hook` is the function that actually implements the
functionality of the module. More generally, it needs to be a function with the
following signature:
```
static unsigned int main_hook(void *priv, struct sk_buff *skb,
                              const struct nf_hook_state *state);
```

The static isn't strictly necessary, but it's good practice to declare
everything in your module as static besides your init and cleanup.

The only parameter we'll be using is `skb`. We want to extract the source ip of
packets we are recieving. You can do that with the following lines of code:

```
  struct iphdr *ip_header = (struct iphdr *)skb_network_header(skb);
  unsigned int src_ip = (unsigned int)ip_header->saddr;
```

Using the google ranges provided in `filter.h` find the index of the range the
incoming packet belongs to and log it. If you'd like to also view the human
readable ip in your log, use the format specifier `%pI4` in `printk` and pass in
a pointer to the ip address.

Finally you'll want to return `NF_ACCEPT` to allow the packet to continue on
it's journey through the network stack. If you wanted to block the packet
instead, use `NF_DROP`. Try playing around with those options to block specific
google ranges. Warning: dropping all packets will result in the kernel module
also dropping your ssh connection to your vm! If this happens, let one of us
know so that we can reset your vm.

To test this, run `dmesg -wH` in one terminal and in other terminals, try
commands like:
```
ping www.google.com
wget google.com && rm index.html
ping [ something that isn't owned by google ]
```

and check your `dmesg` log for updates.

## Part 3 - Using proc for output

Now, we're going to create an endpoint in `/proc` that will allow you to view
statistics about the packets you've intercepted. To accomplish this, create a
global array that will store in the `i`th index, the number of times the `i`th
range sent a packet.

In order to prevent race conditions, we'll need to lock access to this array.
While there are spinlocks in the kernel, we'll be using a mutex today for
learning purposes.

You'll need to create a mutex with `mutex_init` and destroy it with
`mutex_destroy`. Locking and unlocking are provided by `mutex_(un)lock`.

Revise the lecture slides for more info about how to use a mutex in the kernel
and how that is different from a spinlock.

To create your proc endpoint, you can use the following code:

## Implementing proc_fs endpoint

Here is some sample code for implementing read. In this code, `range_count` is
an array of `size_t`s such that the `i`th element of the array contains the
number of packets recieved from range `i`.
```
static char message[1024];
ssize_t filter_read(struct file *f, char __user *u, size_t req, loff_t *off) {
  int message_offset;
  int i;

  message_offset = 0;
  mutex_lock(&range_count_mutex);
  for (i = 0; i < google_range_count; i++) {
    message_offset +=
        snprintf(message + message_offset, sizeof(message) - message_offset,
                 "range %d (%pI4 - %pI4): %zu\n", i, google_ranges[i].start,
                 google_ranges[i].end, range_count[i]);
    if(message_offset >= 1024)
      break;
  }
  mutex_unlock(&range_count_mutex);

  if (*off > message_offset)
    return 0;
  if(req > message_offset - *off)
    req = message_offset - *off;

  copy_to_user(u, message+*off, req);
  *off += req;
  return req;
}
struct file_operations fops = {
    .read = filter_read,
};

struct proc_dir_entry *filterdir;

// in init
  filterdir = proc_mkdir(filter", NULL); // Creates  /proc/filter/
  proc_create("status", 0666, filterdir, &fops); // creates /proc/filter/status
// in exit
  remove_proc_entry("status", filterdir);
  remove_proc_entry("filter", NULL);

```

Try experimenting with write. Maybe enable or disable the filter with a write to
a proc endpoint or try allowing a user to add in new ranges.
