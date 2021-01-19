#!/usr/bin/env python3

import itertools

from profilehooks import timecall

from aoclib import read_resource
from year2015.day04.part_1 import search_index_for_hash


@timecall()
def solve(input: list[str]) -> int:
    seed = input[0]
    return search_index_for_hash(seed, '0' * 6)


def main():
    result = solve(read_resource(2015, 4))
    print(f'Result: {result}')


if __name__ == "__main__":
    main()
