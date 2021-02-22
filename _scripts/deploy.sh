#!/bin/bash

set -e;

# Part 1 push to github

TMPDIR=`mktemp -d`
echo "Working in $TMPDIR"
cd $TMPDIR

git config --global core.sshCommand "ssh -i /tmp/dual_deploy_key -F /dev/null"
git init;

echo "Copying"
cp -r $GITHUB_WORKSPACE/_site/* .
touch .nojekyll

git add -A;
git commit -m "Deploying from $(date -u +"%Y-%m-%dT%H:%M:%SZ")";
git remote add origin git@github.com:${GITHUB_REPOSITORY}.git
git push origin github-actions-test --force;

cd ${GITHUB_WORKSPACE}

# Part 2, copy to a grader
set -x;

mv _site web
#rsync -rav -e "ssh -vvv -i /tmp/dual_deploy_key" web/ $DEPLOY_GRADER_USER@$DEPLOY_GRADER_IP:/
