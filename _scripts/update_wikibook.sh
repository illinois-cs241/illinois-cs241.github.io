#! /usr/bin/env bash

WIKIBOOK=_wikibook

git checkout develop
git fetch origin
git reset --hard origin/develop

if [ ! -e $WIKIBOOK ]; then
    exit 0
fi

git submodule foreach "git pull origin master"
git add $WIKIBOOK

if git diff-index --quiet --cached HEAD -- $WIKIBOOK; then
    COMMIT=$(git ls-tree --abbrev=10 HEAD $WIKIBOOK | awk '{print $3}')
    git commit -m "Updating wikibook to latest revision ($COMMIT)"
    git push origin develop
fi
