#!/usr/bin/env python3

import itertools

from profilehooks import timecall

from aoclib import read_resource

dirs = {
    '^': 0 + 1j,
    '>': 1 + 0j,
    'v': 0 - 1j,
    '<': -1 + 0j,
}


@timecall()
def solve(input: list[str]) -> int:
    santa = 0
    santa_visited = set([0])
    for d in map(dirs.get, itertools.chain.from_iterable(input)):
        santa += d
        santa_visited.add(santa)
    return len(santa_visited)


def main():
    result = solve(read_resource(2015, 3))
    print(f'Result: {result}')


if __name__ == "__main__":
    main()
