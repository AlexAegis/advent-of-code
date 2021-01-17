#!/usr/bin/env python3

import itertools

from profilehooks import timecall

from aoclib import read_resource


@timecall()
def solve(input: list[str]) -> int:
    p = 0
    for i, c in enumerate(itertools.chain.from_iterable(input)):
        if c == '(':
            p = p + 1
        elif c == ')':
            p = p - 1
        if p == -1:
            return i
    return -1


def main():
    result = solve(read_resource(2015, 1))
    print(f'Result: {result}')


if __name__ == "__main__":
    main()
