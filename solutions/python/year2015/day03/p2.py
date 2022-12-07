#!/usr/bin/env python3

import itertools

from aoclib import read_resource
from profilehooks import timecall

dirs = {
    '^': 0 + 1j,
    '>': 1 + 0j,
    'v': 0 - 1j,
    '<': -1 + 0j,
}


@timecall()
def solve(input: list[str]) -> int:
    santa = 0
    robo_santa = 0
    visited = set([0])
    i = map(dirs.get, itertools.chain.from_iterable(input))
    for d in i:
        santa += d
        robo_santa += next(i)
        visited.add(santa)
        visited.add(robo_santa)
    return len(visited)


def main():
    result = solve(read_resource(2015, 3))
    print(f'Result: {result}')


if __name__ == "__main__":
    main()
