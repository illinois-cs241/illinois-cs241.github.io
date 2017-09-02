#!/usr/bin/env python3

import glob
import copy
import argparse
import shutil
import os.path
import re
import html

def prepend(file, string):
    obfFile = '.__asdfasdf.txt'
    with open(file,'r') as f:
        with open(obfFile,'w') as f2:
            f2.write(string)
            f2.write(f.read())
    os.rename(obfFile,file)

# don't want to import beautiful soup here
def make_link_from_markdown(wiki_href, title):
    return "<a class='wiki-link' href='./{}.html'>{}</a>".format(
                html.escape(os.path.splitext(wiki_href)[0]),
                title)

def file_name_no_extension(text):
    return os.path.splitext(os.path.basename(text))[0]

def title_from_html(text):
    return file_name_no_extension(text).replace('-', ' ')

def link_patterns(file, pattern_map):
    obfFile = '.__qwerwq.txt'
    with open(file,'r') as f:
        with open(obfFile,'w') as f2:
            contents = f.read()
            for link, pattern in pattern_map.items():
                contents = pattern.sub(link, contents)

            f2.write(contents)

    os.rename(obfFile,file)

def main(folder):
    old_filenames = glob.glob(folder+"/*.md")
    new_filenames = copy.deepcopy(old_filenames)
    bad_chars = '#,:"'

    for i in range(len(new_filenames)):
        new_filenames[i] = new_filenames[i].lower()

    for char in bad_chars:
        for i in range(len(new_filenames)):
            new_filenames[i] = new_filenames[i].replace(char, '')

    pattern_map = dict()
    for i in range(len(old_filenames)):
        title = title_from_html(old_filenames[i])
        escaped = re.escape(title)
        link = make_link_from_markdown(file_name_no_extension(new_filenames[i]), title)
        pattern_map[link] = re.compile("(\\[\\[\\s*{}\\s*\\]\\])".format(escaped))

    for from_f, to_f in zip(old_filenames, new_filenames):
        title = title_from_html(from_f)
        shutil.move(from_f, to_f)
        link_patterns(to_f, pattern_map)
        ghurl = "angrave/SystemProgramming/wiki/" + from_f.split(
            folder, 1)[1].rsplit(".md", 1)[0].replace(" ", "-")
        template = "---\nlayout: doc\ntitle: \"{}\"\ngithuburl: \"{}\"\n---\n\n".format(title, ghurl)
        prepend(to_f, template)
        print("Added template to {}".format(to_f))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Rename wikibook pages.')
    parser.add_argument('folder', type=str, nargs=1, help='folder to edit markdown')
    args = parser.parse_args()
    main(args.folder[0])
