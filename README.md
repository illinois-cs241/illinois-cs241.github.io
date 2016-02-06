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
- config.yml: global site configuration
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
After you are done writing content you need to add front matter to the top of the file. Front matter allows Jekyll to know things like "which template should be used to generate this page", "what is the title of this page?", and "should this page be accessible through a custom link?". To put it simply just add the following:

```
---
layout: doc
title: "Know Your Tools"
permalink: Know Your Tools
---
```

`layout: doc` will tell jekyll to use `_layouts/doc.html` as the layout.

`title: "Know Your Tools"` will tell jekyll that the title is "Know Your Tools" and add that in an `h1` tag.

`permalink: Know Your Tools` will tell jekyll that someone should be able to access this page with the url `http://illinois-cs.github.io/Know%20Your%20Tools`. The `%20`s are an artifact of how urls escape space characters. Don't worry about it not being typeable, since the listings in `mps.html` and `labs.html` already have links to them.

If you do not want students to be able to access this page (say you are beta testing), then just don't add the permalink or have it be something like `Know Your Tools Beta`. By default these pages can be accessed at `http://illinois-cs.github.io/<YEAR>/<MONTH>/<DATE>/<title>.html`

### Syntax Highlighting
Also you might want to add syntax highlighting.

This can be done by adding the following syntax to your content:
```
{% highlight <language> linenos%}
This text will show up in a code block and have syntax highlighting for the <language> language and you add line numbers if 'linenos' is present.
{% endhighlight %}
```
[A full list of languages that Jekyll supports.](https://haisum.github.io/2014/11/07/jekyll-pygments-supported-highlighters/)


## Updating Schedules and Staff

All the information that gets displayed on `labs.html`, `mps.html`, `schedule.html`, and `staff.html` are stored in `_data` as `labs.json`,`mps.json`,`scheduleSP16.json`, and `staff.json` respectively. These are json files and should be intuitive to update.
