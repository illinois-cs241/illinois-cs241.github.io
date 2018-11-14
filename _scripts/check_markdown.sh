#!/bin/bash

set -e
trap exit INT;
MATCHES="0"
set -x

for file in *md _docs/*md;
do
    OUTPUT=`(pandoc -f markdown -t json -s $file | SUGGEST=1 python3 _scripts/md_spell_check.py | pandoc -f json -t markdown -o /dev/null) 2>&1`
    if [ ! -z "$OUTPUT" ]; then
        echo "$file"
        echo "======="
        echo "$OUTPUT";

        echo
    fi;
done;

