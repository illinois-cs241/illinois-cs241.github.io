#!/bin/bash

set -e;

# Part 1 push to github

TMPDIR=`mktemp -d`
echo "Working in $TMPDIR"
cd $TMPDIR

git config --global core.sshCommand "ssh -i /tmp/dual_deploy_key -F /dev/null"
git init;

echo "Copying"
cp -r $TRAVIS_BUILD_DIR/_site/* .
touch .nojekyll

git add -A;
git commit -m "Deploying from $(date -u +"%Y-%m-%dT%H:%M:%SZ")";
git remote add origin git@github.com:${TRAVIS_REPO_SLUG}.git
git push origin master --force;

cd ${TRAVIS_BUILD_DIR}

# Part 2, copy to a grader
set -x;

mv _site web
rsync -Pav web $DEPLOY_GRADER_USER@$DEPLOY_GRADER_IP:/
