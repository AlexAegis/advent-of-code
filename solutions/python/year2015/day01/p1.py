#!/usr/bin/env python3

import itertools

from aoclib import read_resource
from profilehooks import timecall


@timecall()
def solve(input: list[str]) -> int:

    p = 0
    for c in itertools.chain.from_iterable(input):
        if c == '(':
            p = p + 1
        elif c == ')':
            p = p - 1
    return p


def main():
    result = solve(read_resource(2015, 1))
    print(f'Result: {result}')


if __name__ == "__main__":
    main()
