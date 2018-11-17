#!/bin/bash

set -e;

TMPDIR=`mktemp -d`
echo "Working in $TMPDIR"
cd $TMPDIR

git init;
git checkout master;

echo "Copying"
ls $TRAVIS_BUILD_DIR/_site/
cp -r $TRAVIS_BUILD_DIR/_site/* .

echo "CNAME";
echo "cs241.cs.illinois.edu" > CNAME;
git add -A;
git commit -m "Deploying from $(date -u +"%Y-%m-%dT%H:%M:%SZ")";
git remote add origin git@github.com:${TRAVIS_REPO_SLUG}.git
ls
git status
cd ${TRAVIS_BUILD_DIR}
#git push origin master --force;
