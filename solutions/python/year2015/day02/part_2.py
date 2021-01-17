#!/usr/bin/env python3

import itertools

from profilehooks import timecall

from aoclib import read_resource


@timecall()
def solve(input: list) -> int:
    result = 0
    for c in input:
        l, w, h = map(int, c.split('x'))
        m = min(l + w, w + h, h + l)
        result += 2 * m + l * w * h
    return result


def main():
    result = solve(read_resource(2015, 2))
    print(f'Result: {result}')


if __name__ == "__main__":
    main()
