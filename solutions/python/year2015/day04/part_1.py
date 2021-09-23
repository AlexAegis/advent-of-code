#!/usr/bin/env python3

import hashlib

from profilehooks import timecall

from aoclib import read_resource


def search_index_for_hash(seed: str, hash_lead: str):
    i = 0
    h = ''
    while not h.startswith(hash_lead):
        h = hashlib.md5(str.encode(seed + str(i))).hexdigest()
        i += 1
    return i - 1


@timecall()
def solve(input: list[str]) -> int:
    seed = input[0]
    return search_index_for_hash(seed, '0' * 5)


def main():
    result = solve(read_resource())
    print(f'Result: {result}')


if __name__ == "__main__":
    main()
