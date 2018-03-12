#!/bin/bash

echo "Moving";
mv ./_site ..;
echo "Checking out";
git checkout master;
echo "Removing";
rm -rf *;
echo "Copying";
cp -R ../_site/* .;
ls;
echo "CNAME";
echo "cs241.cs.illinois.edu" > CNAME;
echo "Adding";
git add -A;
git commit -m "Deploying from $(date -u +"%Y-%m-%dT%H:%M:%SZ")";
git push origin master --force;