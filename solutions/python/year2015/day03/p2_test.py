#!/usr/bin/env python3

from aoclib import read_resource

from .p2 import solve


def test_solve():
    result = solve(read_resource(2015, 3))
    assert result == 2631
