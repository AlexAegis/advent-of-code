# Advent of Code Python Solutions

## [2015](https://adventofcode.com/2015/)

[![2015 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2015.json)](/solutions/python/2015/)

<!-- markdownlint-disable MD013 -->

| Day                                 | Part One                                      | Part Two                                      |
| ----------------------------------- | --------------------------------------------- | --------------------------------------------- |
| [Day 1](/solutions/python/2015/01/) | [~0.1ms](/solutions/python/2015/01/part_1.py) | [~0.1ms](/solutions/python/2015/01/part_2.py) |
| Day 2                               |                                               |                                               |
| Day 3                               |                                               |                                               |
| Day 4                               |                                               |                                               |
| Day 5                               |                                               |                                               |
| Day 6                               |                                               |                                               |
| Day 7                               |                                               |                                               |
| Day 8                               |                                               |                                               |
| Day 9                               |                                               |                                               |
| Day 10                              |                                               |                                               |
| Day 11                              |                                               |                                               |
| Day 12                              |                                               |                                               |
| Day 13                              |                                               |                                               |
| Day 14                              |                                               |                                               |
| Day 15                              |                                               |                                               |
| Day 16                              |                                               |                                               |
| Day 17                              |                                               |                                               |
| Day 18                              |                                               |                                               |
| Day 19                              |                                               |                                               |
| Day 20                              |                                               |                                               |
| Day 21                              |                                               |                                               |
| Day 22                              |                                               |                                               |
| Day 23                              |                                               |                                               |
| Day 24                              |                                               |                                               |
| Day 25                              |                                               |                                               |

## Setup

Have `pipenv` installed using `pip` (System packages such as the one in the
debian repositories can [cause bugs and are not always up to date](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=945139))

```sh
pip install pipenv
```

Create virtualenv and install dependencies using `pipenv`.

> For better integration with VS Code the venv is created inside the
> project as the interpreter is already selected in the `settings.json` file

```sh
pipenv install
```

> If pipenv wants to use the global python version instead of pyenvs, make
> sure `PYENV_HOME` is set to `$(pyenv root)`. Otherwise you can just force an
> interpreter onto `pyenv` using the `--python` argument.

```sh
pipenv install --python "$(command -v python)"
```

Activate the environment:

```sh
pipenv shell
```

### Run single solution

The `Current File (Python)` VS Code launch config will run and debug the
focused file, and loads the `.env` environment beforehand.

You can run manually too from the command line, but don't forget to activate
the virtual environment using `pipenv`.

```sh
pipenv shell
python 2015/01/part_1.py
```

### Test

Full test suite

```sh
pipenv run test
```

### Lint

```sh
pipenv run lint
```

### Notes

Refactoring in VS Code doesn't seem to work.

It can use the pipenv environment if you select it but it writes it into the
`settings.json` with a full local path
