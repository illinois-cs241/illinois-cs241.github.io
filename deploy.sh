#!/bin/bash

set -o errexit;

export DOCS_SHA=$(git rev-parse --short HEAD)
git clone --recurse-submodules -j8 -b develop --depth 1 git@github.com:illinois-cs241/illinois-cs241.github.io.git ${CLONE_DIR}
pushd ${CLONE_DIR}
git checkout develop
git commit --allow-empty -m "Updating docs to ${DOCS_SHA}"
git push origin develop
popd
