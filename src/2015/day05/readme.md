
# [Day 5: Doesn't He Have Intern-Elves For This?](https://adventofcode.com/2015/day/5)

## [Part One](./typescript/part_one.ts)

Santa needs help figuring out which strings in his text file are naughty or nice.

A **nice string** is one with all of the following properties:


- It contains at least three vowels (`aeiou` only), like `aei`, `xazegov`, or `aeiouaeiouaeiou`.
- It contains at least one letter that appears twice in a row, like `xx`, `abcdde` (`dd`), or `aabbccdd` (`aa`, `bb`, `cc`, or `dd`).
- It does **not** contain the strings `ab`, `cd`, `pq`, or `xy`, even if they are part of one of the other requirements.

For example:


- `ugknbfddgicrmopn` is nice because it has at least three vowels (`u...i...o...`), a double letter (`...dd...`), and none of the disallowed substrings.
- `aaa` is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
- `jchzalrnumimnmhp` is naughty because it has no double letter.
- `haegwjzuvuyypxyu` is naughty because it contains the string `xy`.
- `dvszwmarrgswjxmb` is naughty because it contains only one vowel.

How many strings are nice?


To begin, [get your puzzle input](5/input).

Answer:  

You can also [Shareon
  [Twitter](https://twitter.com/intent/tweet?text=%22Doesn%27t+He+Have+Intern%2DElves+For+This%3F%22+%2D+Day+5+%2D+Advent+of+Code+2015&url=https%3A%2F%2Fadventofcode%2Ecom%2F2015%2Fday%2F5&related=ericwastl&hashtags=AdventOfCode)
  [Reddit](http://www.reddit.com/submit?url=https%3A%2F%2Fadventofcode%2Ecom%2F2015%2Fday%2F5&title=%22Doesn%27t+He+Have+Intern%2DElves+For+This%3F%22+%2D+Day+5+%2D+Advent+of+Code+2015)] this puzzle.

