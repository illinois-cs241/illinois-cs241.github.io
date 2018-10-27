#!/bin/bash

for file in $TRAVIS_BUILD_DIR/_site/**/*html;
	do
	checklink -s -b --suppress-temp-redirects \
		--suppress-broken "-1:*" -q $file \
		| perl -ne 'BEGIN{ $/ = "" } print unless /robots.txt|mailto/';
done;