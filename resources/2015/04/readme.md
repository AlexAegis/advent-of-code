# [Day 4: The Ideal Stocking Stuffer](https://adventofcode.com/2015/day/4)

## [Part One](https://adventofcode.com/2015/day/4#part1)

> [TypeScript](/solutions/typescript/2015/04/part_one.ts)\
> [Rust](/solutions/rust/2015/04/src/lib.rs)\
> [Python](/solutions/python/year2015/day04/part_1.py)

Santa needs help [mining](https://en.wikipedia.org/wiki/Bitcoin#Mining) some
AdventCoins (very similar to [bitcoins](https://en.wikipedia.org/wiki/Bitcoin))
to use as gifts for all the economically forward-thinking little girls and
boys.

To do this, he needs to find [MD5](https://en.wikipedia.org/wiki/MD5) hashes
which, in [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal), start with
at least **five zeroes**. The input to the MD5 hash is some secret key (your
puzzle input, given below) followed by a number in decimal. To mine
AdventCoins, you must find Santa the lowest positive number (no leading zeroes:
`1`, `2`, `3`, ...) that produces such a hash.

For example:

- If your secret key is `abcdef`, the answer is `609043`, because the MD5 hash
  of `abcdef609043` starts with five zeroes (`000001dbbfa...`), and it is the
  lowest such number to do so.
- If your secret key is `pqrstuv`, the lowest number it combines with to make
  an MD5 hash starting with five zeroes is `1048970`; that is, the MD5 hash of
  `pqrstuv1048970` looks like `000006136ef...`.

Your puzzle input is `iwrupvqb`.

Your puzzle answer was `346386`.

## [Part Two](https://adventofcode.com/2015/day/4#part2)

> [TypeScript](/solutions/typescript/2015/04/part_two.ts)\
> [Rust](/solutions/rust/2015/04/src/lib.rs)\
> [Python](/solutions/python/year2015/day04/part_2.py)

Now find one that starts with **six zeroes**.

Your puzzle answer was `9958218`.
