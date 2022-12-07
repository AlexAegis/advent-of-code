#!/usr/bin/env python3

from aoclib import read_resource

from .p1 import solve


def test_solve():
    result = solve(read_resource(2022, 6))
    assert result == 0
