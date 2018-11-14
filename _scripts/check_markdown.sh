#!/bin/bash

set +e
trap exit INT;
for file in *.md;
do
    echo $file
    echo "======="
    SUGGEST=1 pandoc -f markdown -t plain --filter _scripts/md_spell_check.py $file -o /dev/null;
    echo ""
   done;
