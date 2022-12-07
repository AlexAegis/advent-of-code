#!/usr/bin/env python3

from aoclib import read_resource
from profilehooks import timecall


@timecall()
def solve(input: list[str]) -> int:
    print('lol', input)
    return 0


def main():
    result = solve(read_resource(2022, 6))
    print(f'Result: {result}')


if __name__ == "__main__":
    main()
