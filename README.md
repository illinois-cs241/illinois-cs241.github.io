# Webpage for CS 241

## Jekyll and Github Pages

This website is made with [Jekyll](https://jekyllrb.com/) and [Github Pages](https://help.github.com/articles/what-are-github-pages/).

Jekyll is a static site generator that allows us to write markdown instead of html and comes with [Liquid Templating](http://liquidmarkup.org/) which uses a combination of tags, objects, and filters to load dynamic content and has a nice [cheat sheet](http://cheat.markdunkley.com/).

Github Pages will host this repo not only as a code base but will also as a webserver for our website.

The magic happens in the integration. Github Pages has Jekyll integration, so if you push any changes to this repo, then Github Pages will automatically have Jekyll generate a new static site and serve it. This means that you can makes changes to the webpage simply by pushing changes to it. No more package installations, no more Angular JS, no more rsync. This also means that you can take advantage of the Github UI and edit files from a web browser.

## Structure

- _data: stores configurations files
  - labs.json: stores the lab info for labs.html
  - mps.json: stores the mp info for mp.html
  - schedule[term][year].json: stores the lecture schedule for schedule.html
  - staff.json: stores the staff info for staff.html
- _drafts: stores future posts
- _includes: holds html that is used everywhere
  - head.html: holds code for including other files
  - header.html: top nav bar code
- _layouts: hold layout templates
  - doc.html: layout template for documentation
- _posts: where all the documentation is stored as markdown
- _sass: sass files (files named approriately)
- css: holds css
- images: holds images
- js: holds javascripts
- lib: folder for libraries
- static: holds other static content, like PDFs
- _config.yml: global site configuration
- 404.html: 404 error page
- help.md: markdown for help page
- index.md: syllabus page
- labs.html: lab schedule page
- mps.html: mp schedule page
- schedule.html: lecture schedule page
- staff.html: listing of staff

## How to write documentation

### TLDR
Just go to `_posts` and copy an existing doc and fill it out with the approriate markdown content.

### Where to create the file
All documentation is stored in _posts.

To create a new post, all you need to do is create a new file in the _posts directory. How you name files in this folder is important. Jekyll requires these files to be named according to the following format:

`YEAR-MONTH-DAY-title.MARKUP`

### Content for this file
Once you have created this file you can add all the markdown you please. Somethings to take note of is that javascript will run to make all the areas between `h2`/`##` tags into sections and add an entry to the table of content. The title of the section and the entry of in the table of content is exactly the text that comes after your `h2`/`##`. Also `h1`/`#` is reserved for the title which will automatically be added in. If you get stuck trying to format something with markdown, then you can just write html and it will get injected (but, then I will be dissapointed in you).

### Front Matter (configurations)

TODO: Document Learning Objectives, Graded Files, and Deadlines.
After you are done writing content you need to add front matter to the top of the file. Front matter allows Jekyll to know things like "which template should be used to generate this page", "what is the title of this page?", and "should this page be accessible through a custom link?". To put it simply just add the following:

```
---
layout: doc
title: "Password Cracker"
permalink: password_cracker
submissions:
- title: Part 1
  due_date: 10/17 11:59pm
  graded_files:
  - cracker1.c
- title: Part 2
  due_date: 10/24 11:59pm
  graded_files:
  - cracker2.c
learning_objectives:
  - Multithread Programming and its performance gains
  - Using a thread safe datastructure
  - Using synchronization primatives
wikibook:
  - "Pthreads, Part 1: Introduction"
  - "Pthreads, Part 2: Usage in Practice"
  - "Synchronization, Part 1: Mutex Locks"
  - "Synchronization, Part 2: Counting Semaphores"
  - "Synchronization, Part 3: Working with Mutexes And Semaphores"
  - "Synchronization, Part 4: The Critical Section Problem"
  - "Synchronization, Part 5: Condition Variables"
  - "Synchronization, Part 6: Implementing a barrier"
---
```

`layout: doc` will tell jekyll to use `_layouts/doc.html` as the layout.

`title: "Password Cracker"` will tell jekyll that the title is "Password Cracker" and add that in an `h1` tag.

`permalink: password_cracker` will tell jekyll that someone should be able to access this page with the url `http://illinois-cs241.github.io/password_cracker`.

`dueDates: "02/15 11:59pm"` will add due dates to the page.

```
submissions:
- title: Part 1
  due_date: 10/17 11:59pm
  graded_files:
  - cracker1.c
- title: Part 2
  due_date: 10/24 11:59pm
  graded_files:
  - cracker2.c
```
Is a list of submissions. This will add:

```
Part 1 due 10/17 11:59pm
  cracker1.c
Part 2 due 10/24 11:59pm
  cracker2.c
```

To the sidebar of the docs.

```
learning_objectives:
  - Multithread Programming and its performance gains
  - Using a thread safe datastructure
  - Using synchronization primatives
```

Will automatically add a section labeled "Learning Objectives" to the top of the docs.

```
wikibook:
  - "Pthreads, Part 1: Introduction"
  - "Pthreads, Part 2: Usage in Practice"
  - "Synchronization, Part 1: Mutex Locks"
  - "Synchronization, Part 2: Counting Semaphores"
  - "Synchronization, Part 3: Working with Mutexes And Semaphores"
  - "Synchronization, Part 4: The Critical Section Problem"
  - "Synchronization, Part 5: Condition Variables"
  - "Synchronization, Part 6: Implementing a barrier"
```

Will automatically add a section labeled "Suggested Readings" to the top of the docs. Note that these are the titles of the pages of the wikibook and must be wrapped in quotes to escape the ":". This will also automatically generate the links to the wikibook (and only wikibook). If you want to link to something outside of the wikibook, then you will need to create another section for that. 

If you do not want students to be able to access this page (say you are beta testing), then just don't add the permalink or have it be something like `Know Your Tools Beta`. By default these pages can be accessed at `http://illinois-cs241.github.io/<YEAR>/<MONTH>/<DATE>/<title>.html`

### Syntax Highlighting
Also you might want to add syntax highlighting.

This can be done by [fencing with triple backticks](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet/e48fe59238600be6e1ec9e4add21c513cbac86d0#code):

[A full list of languages that Jekyll supports.](https://haisum.github.io/2014/11/07/jekyll-pygments-supported-highlighters/)


## Updating Schedules and Staff

All the information that gets displayed on `labs.html`, `mps.html`, `schedule.html`, and `staff.html` are stored in `_data` as `labs.json`,`mps.json`,`scheduleSP16.json`, and `staff.json` respectively. These are json files and should be intuitive to update.
