#!/usr/bin/env python3

from aoclib import read_resource
from profilehooks import timecall


@timecall()
def solve(input: list[str]) -> int:
    result = 0
    for c in input:
        l, w, h = map(int, c.split('x'))
        m = min(l * w, w * h, h * l)
        result += 2 * l * w + 2 * w * h + 2 * h * l + m
    return result


def main():
    result = solve(read_resource(2015, 2))
    print(f'Result: {result}')


if __name__ == "__main__":
    main()
