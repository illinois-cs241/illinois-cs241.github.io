#!/bin/bash

set -e
trap exit INT;

for file in *md _docs/*md;
do
    bundle exec ruby _scripts/spell_check.rb -f $file
done;

