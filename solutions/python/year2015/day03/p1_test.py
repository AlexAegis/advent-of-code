#!/usr/bin/env python3

from aoclib import read_resource

from .p1 import solve


def test_solve():
    result = solve(read_resource(2015, 3))
    assert result == 2572
