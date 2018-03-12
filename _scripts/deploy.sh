#!/bin/bash

mv ./_site ..;
git checkout master;
rm -rf *;
cp -R ../_site/* .;
echo "cs241.cs.illinois.edu" > CNAME;
git add -A;
git commit -m "Deploying from $(date -u +"%Y-%m-%dT%H:%M:%SZ")";
git push origin master --force;