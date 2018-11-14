#!/usr/bin/env python3
from panflute import run_filter, Str, Header, Image, Link, Code, CodeBlock, Image, Math, MetaBlocks
import sys
import hunspell
import re
import atexit
from pathlib import Path
import os
import tempfile
import time
import itertools

english_hunspell = hunspell.HunSpell('/usr/share/hunspell/en_US.dic', '/usr/share/hunspell/en_US.aff')
stop_chars = [',', ':', '.', ',', '"', '.',
              '(', ')', ';', '?', ']', '[',
              '<', '>', '!', '~', '&', ' ',
              '*', '%', '+', ]
translation = {ord(i):None for i in stop_chars}

# Like all reliable code I got this from the internet
# https://emailregex.com/
email_regex = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
splitting_regex = re.compile(r"[ _\-/]")
time_regex = re.compile(r"\d\d:\d\d(am|pm|AM|PM)")
courses_regex = re.compile(r"(cs|CS|Cs|cS)\d{3,}")
cash_money_regex = re.compile(r"\$\d+\.\d+")

# Omit the closing paren because that would've gotten stripped
big_oh_regex = re.compile(r"O\((1|n(^\d+)?)")
check_regexes = [email_regex, splitting_regex, time_regex, courses_regex, cash_money_regex, big_oh_regex]
def split_on_delims(word):
    return splitting_regex.split(word)

suggest_mode = os.environ.get('SUGGEST', 'True')
suggest_mode = suggest_mode in ('True', '1', 'yes', 'y', 'true')

def deserialize(x):
    if type(x) == Str:
        return x.text
    return ' '

def run_check(op, dictionary):
    try:
        is_spelled = dictionary.spell(op)
    except UnicodeEncodeError:
        is_spelled = True
    return is_spelled

def match_any(word, dictionary_list):
    orig = word
    word = word.translate(translation)
    if '=' in word:
        return
    matched_any = any(run_check(word, d) for d in dictionary_list)
    if matched_any:
        return
    lower = word.lower()
    matched_any = any(run_check(word, d) for d in dictionary_list)
    if matched_any:
        return
    if suggest_mode:
        suggestions = english_hunspell.suggest(word)
        print('({}) "{}" -> {}'.format(word, orig, str(suggestions)), file=sys.stderr)
    else:
        print(word, file=sys.stderr)

def validate(content):
    checks = list()
    link = content.startswith('http')
    checks.append(link)
    numeral = content.startswith("#")
    checks.append(numeral)
    for i in check_regexes:
        checks.append(i.match(content))
    for i in ['.html', '.js', '.c', '.h', '.json', '.yml', '.md', '.fs', '.txt']:
        checks.append(content.endswith(i))
    ctrl = content.lower().startswith('ctrl')
    checks.append(ctrl)
    spaces = len(content.strip()) == 0
    checks.append(spaces)
    return not any(checks)

def normalize_word(word):
    stripped_word = word.strip(" '*{} ?,:.\"()`").strip()
    endings = ["'s", "'th", '.com', "'ed", "'d"]
    for ending in endings:
        if stripped_word.endswith(ending):
            stripped_word = stripped_word[:-len(ending)]
    return stripped_word

def spell_check(elem, doc, dictionary_list):
    op = []
    skiptypes = (Link, Code, CodeBlock, Image, Math, MetaBlocks)
    if type(elem) in skiptypes or type(elem.parent) in skiptypes:
        return elem
    elif type(elem) == Str:
        content = elem.text
        op = [content]
    elif type(elem) == Header:
        op = list(map(deserialize, elem.content.list))

    tokenized = []
    for word in op:
        split = split_on_delims(word)
        parsed = map(normalize_word, split)
        filter_invalid = filter(validate, parsed)
        tokenized.extend(list(filter_invalid))

    for word in tokenized:
        match_any(word, dictionary_list)


def cleanup(files):
    for filename in files:
        try:
            os.remove(filename)
        except OSError:
            pass


def create_exceptions_file(tmp_dir, exception_file_name):
    (fd, custom_dictionary_filename) = tempfile.mkstemp(dir=tmp_dir)
    os.close(fd)
    os.system('sort {} | uniq | wc -l > {}'.format(exception_file_name, custom_dictionary_filename))
    os.system('sort {} | uniq >> {}'.format(exception_file_name, custom_dictionary_filename))

    return custom_dictionary_filename

def main(doc=None):
    tmp_dir = '/tmp'
    exception_file_name = '.exceptions'
    custom_dictionary_filename = create_exceptions_file(tmp_dir, exception_file_name)

    (fd, custom_aff_filename) = tempfile.mkstemp(dir=tmp_dir)
    os.close(fd)
    Path(custom_aff_filename).touch()
    exceptions_hunspell = hunspell.HunSpell(custom_dictionary_filename, custom_aff_filename)
    atexit.register(cleanup, [custom_dictionary_filename, custom_aff_filename])
    lis = [english_hunspell, exceptions_hunspell]
    return run_filter(lambda e, d: spell_check(e, d, lis), doc=doc)

if __name__ == "__main__":
    main()
