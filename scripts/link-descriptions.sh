#!/bin/sh

get_path_segment() {
	echo "$1" | cut -d '/' -f "$2"
}

git_root="$(git rev-parse --show-toplevel)"

cd "${git_root}" || exit 1

for readme in ./resources/**/**/readme.md; do
	year=$(get_path_segment "$readme" 3)
	day=$(get_path_segment "$readme" 4)
	echo "Linking readme of $year $day from $readme"
	if [ -d "./solutions/typescript/${year}/${day}" ]; then
		echo "	to solutions/typescript/$year/$day"
		(
			cd "./solutions/typescript/${year}/${day}" || exit 1
			rm readme.md
		)
	fi
	if [ -d "./solutions/rust/${year}/${day}" ]; then
		echo "	to solutions/rust/$year/$day"
		(
			cd "./solutions/rust/${year}/${day}" || exit 1
			rm readme.md
		)
	fi
	if [ -d "./solutions/python/year${year}/day${day}" ]; then
		echo "	to solutions/python/year$year/day$day"
		(
			cd "./solutions/python/year${year}/day${day}" || exit 1
			rm readme.md
		)
	fi
done
