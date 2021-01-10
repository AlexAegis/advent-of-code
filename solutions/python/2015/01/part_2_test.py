
from aoclib import read_resource
from part_2 import solve


def test_solve():
    result = solve(read_resource(2015, 1))
    assert result == 1794
