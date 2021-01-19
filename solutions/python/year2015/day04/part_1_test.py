#!/usr/bin/env python3

from aoclib import read_resource

from .part_1 import solve


def test_solve():
    result = solve(read_resource(2015, 4))
    assert result == 346386


def test_example():
    result = solve(read_resource(2015, 4, 'example.txt'))
    assert result == 609043


def test_example_2():
    result = solve(read_resource(2015, 4, 'example.2.txt'))
    assert result == 1048970
