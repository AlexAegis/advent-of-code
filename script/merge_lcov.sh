#!/bin/bash

# Credits: https://gist.github.com/xseignard/5420661

while read FILENAME; do
    LCOV_INPUT_FILES="$LCOV_INPUT_FILES -a \"$FILENAME\""
done < <( find $1 -name lcov.info )

eval lcov "${LCOV_INPUT_FILES}" -o $1/$2
