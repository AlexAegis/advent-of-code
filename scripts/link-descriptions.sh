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
	echo "	to solutions/typescript/$year/$day"
	(
		mkdir -p "./solutions/typescript/${year}/${day}"
		cd "./solutions/typescript/${year}/${day}" || exit 1
		ln -f -s "../../../../resources/${year}/${day}/readme.md" readme.md
	)
	echo "	to solutions/rust/$year/$day"
	(
		mkdir -p "./solutions/rust/${year}/${day}"
		cd "./solutions/rust/${year}/${day}" || exit 1
		ln -f -s "../../../../resources/${year}/${day}/readme.md" readme.md
	)
	echo "	to solutions/python/year$year/day$day"
	(
		mkdir -p "./solutions/python/year${year}/day${day}"
		cd "./solutions/python/year${year}/day${day}" || exit 1
		ln -f -s "../../../../resources/${year}/${day}/readme.md" readme.md
	)
done
