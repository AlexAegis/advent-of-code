import os


def open_resource(year: int, day: int, resource: str = 'input.txt'):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    return open(
        f"{dir_path}/../../../resources/{year}/{day:02}/{resource}",
        'r')


def read_resource(year: int, day: int, resource: str = 'input.txt'):
    return [x.rstrip('\r\n') for x in open_resource(year, day, resource)]
