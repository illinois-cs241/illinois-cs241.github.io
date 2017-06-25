#!/bin/bash

$TRAVIS_BUILD_DIR/_scripts/refresh_man.rb $TRAVIS_BUILD_DIR/_data/man.json 
$TRAVIS_BUILD_DIR/_scripts/cleanup_wikibook.py $TRAVIS_BUILD_DIR/_wikibook

echo "Performing Language Analysis"
wget "https://languagetool.org/download/LanguageTool-3.7.zip"
unzip LanguageTool-3.7.zip
for directory in _wikibook _docs _tutorials;
	do
	for file in $TRAVIS_BUILD_DIR/$directory/*md;
		do
		TEMP_FILE=$(basename $file);
		pandoc -f markdown -t plain -o $TEMP_FILE $file;
		java -jar LanguageTool-3.7/languagetool-commandline.jar \
			-l en -d "EN_QUOTES,WHITESPACE_RULE,COMMA_PARENTHESIS_WHITESPACE" \
			$TEMP_FILE;
		rm $TEMP_FILE;
	done;
done;

