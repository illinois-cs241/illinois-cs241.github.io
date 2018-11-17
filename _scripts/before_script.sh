#!/bin/bash

if [ -z ${TRAVIS_BUILD_DIR+x} ];
then
	TRAVIS_BUILD_DIR=$(pwd);
fi;

$TRAVIS_BUILD_DIR/_scripts/cleanup_wikibook.py $TRAVIS_BUILD_DIR/_wikibook
