#!/usr/bin/env python

import glob
import copy
import argparse
import shutil
import os.path

def prepend(file, string):
    with open(file,'r') as f:
        with open('newfile.txt','w') as f2: 
            f2.write(string)
            f2.write(f.read())
    os.rename('newfile.txt',file)

def main(folder):
	files = glob.glob(folder+"/*.md")
	old = copy.deepcopy(files)
	bad_chars = '#,:"'
	for char in bad_chars:
		for i in range(len(files)):
			files[i] = files[i].replace(char, '')
	for from_f, to_f in zip(old, files):
		shutil.move(from_f, to_f)
		title = os.path.splitext(os.path.basename(from_f))[0].replace('-', ' ')
		template = "---\nlayout: doc\ntitle: \"{}\"\n---\n\n".format(title)
		prepend(to_f, template)
		print("Added template to {}".format(to_f))


if __name__ == '__main__':
	parser = argparse.ArgumentParser(description='Rename wikibook pages.')
	parser.add_argument('folder', type=str, nargs=1, help='folder to edit markdown files')
	args = parser.parse_args()
	main(args.folder[0])