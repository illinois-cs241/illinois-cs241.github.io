#!/bin/bash

set -e
trap exit INT;
MATCHES="0"
for file in *md _docs/*md;
do
    OUTPUT=`SUGGEST=1 pandoc -f markdown -t plain --filter _scripts/md_spell_check.py $file -o /dev/null 2>&1`
    if [ ! -z "$OUTPUT" ]; then
        echo "$file"
        echo "======="
        echo "$OUTPUT";

        echo
    fi;
done;

