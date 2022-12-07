#!/usr/bin/env python3

import os
from typing import Optional


def open_resource(year: int, day: int, resource: str = 'input.txt'):
    dir_path = os.path.dirname(os.path.realpath(__file__))

    return open(
        f"{dir_path}/../../../resources/{year}/{day:02}/{resource}",
        'r')


def read_resource(
        year_or_file: int or str,
        day: Optional[int] = None,
        resource: str = 'input.txt'):
    year: Optional[int] = None
    if isinstance(year_or_file, int):
        year = year_or_file
    else:
        dir_path = os.path.dirname(os.path.realpath(year_or_file))
        print(dir_path)
    if not year or not day:
        dir_path = os.path.dirname(os.path.realpath(__file__))
        print(dir_path)
        year = 2015
        day = 4
    return [x.rstrip('\r\n') for x in open_resource(year, day, resource)]
