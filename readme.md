# [Advent of Code](https://adventofcode.com/)

[![typescript ci](https://github.com/AlexAegis/advent-of-code/actions/workflows/cicd.yml/badge.svg)](https://github.com/AlexAegis/advent-of-code/actions/workflows/cicd.yml)
[![rust ci](https://github.com/AlexAegis/advent-of-code/actions/workflows/rust.yml/badge.svg)](https://github.com/AlexAegis/advent-of-code/actions/workflows/rust.yml)
[![python ci](https://github.com/AlexAegis/advent-of-code/actions/workflows/python.yml/badge.svg)](https://github.com/AlexAegis/advent-of-code/actions/workflows/python.yml)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b135807698614bf19dab83afeac9bd15)](https://www.codacy.com/gh/AlexAegis/advent-of-code/dashboard?utm_source=github.com&utm_medium=referral&utm_content=AlexAegis/advent-of-code&utm_campaign=Badge_Grade)
[![Maintainability](https://api.codeclimate.com/v1/badges/5df3d3d67dfe389dc929/maintainability)](https://codeclimate.com/github/AlexAegis/advent-of-code/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5df3d3d67dfe389dc929/test_coverage)](https://codeclimate.com/github/AlexAegis/advent-of-code/test_coverage)
[![codecov](https://img.shields.io/codecov/c/github/AlexAegis/advent-of-code.svg?label=node%20coverage)](https://codecov.io/gh/AlexAegis/advent-of-code)
[![Coverage Status](https://img.shields.io/coveralls/github/AlexAegis/advent-of-code.svg?label=rust%20coverage)](https://coveralls.io/github/AlexAegis/advent-of-code?branch=master)

[![Last commit on GitHub](https://img.shields.io/github/last-commit/AlexAegis/advent-of-code.svg)](https://github.com/AlexAegis/advent-of-code)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> This is a multi-language repository, for easy usage, all of them share the
> same root level. You need to individually set up each language you wish to
> use.

## Usage

The repository does not contain task inputs as my own inputs are located in a
private repository. If you wish to use this repository with your own inputs
provide them in the following folder structure:

```sh
resources
├── 2015
│   ├── 01
│   │   └── input.txt
│   ├── 02
│   │   └── input.txt
│   │  ...
│   └── 25
│       └── input.txt
│   ...
└── 2024
    ├── 01
    │   ├── example.1.txt
    │   ├── example.2.txt
    │   └── input.txt
    │  ...
    └── 25
        └── input.txt
```

### Cloning

> Reference for myself, cloning with my private inputs

```sh
git clone --recurse-submodules -j8 git@github.com:AlexAegis/advent-of-code.git
```

[Why and how](#working-with-private-files)

## [TypeScript](./solutions/typescript)

[![2024 TypeScript Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/typescript/2024.json)](/solutions/typescript/2024/)
[![2023 TypeScript Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/typescript/2023.json)](/solutions/typescript/2023/)
[![2022 TypeScript Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/typescript/2022.json)](/solutions/typescript/2022/)
[![2021 TypeScript Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/typescript/2021.json)](/solutions/typescript/2021/)
[![2020 TypeScript Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/typescript/2020.json)](/solutions/typescript/2020/)
[![2019 TypeScript Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/typescript/2019.json)](/solutions/typescript/2019/)
[![2018 TypeScript Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/typescript/2018.json)](/solutions/typescript/2018/)
[![2017 TypeScript Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/typescript/2017.json)](/solutions/typescript/2017/)
[![2016 TypeScript Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/typescript/2016.json)](/solutions/typescript/2016/)
[![2015 TypeScript Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/typescript/2015.json)](/solutions/typescript/2015/)

### Setup TypeScript workspace

Install latest stable `node` and `pnpm`

```sh
pnpm install
```

### Running individual TypeScript solutions

```sh
# Navigate to the solution
cd solutions/typescript/2024/01
pnpm p1
pnpm p2
```

### Debugging TypeScript solutions using VS Code

Open the solutions file, then run the `[TS] Current File` debug profile.

### Testing all TypeScript solutions

```sh
pnpm test
```

### Testing individual TypeScript solutions

```sh
# Navigate to the solution
cd solutions/typescript/2024/01
pnpm test
```

### Benchmarking individual TypeScript solutions

```sh
# Navigate to the solution
cd solutions/typescript/2024/01
pnpm bench
```

### Linting all TypeScript solutions

```sh
pnpm lint
```

### Linting individual TypeScript solutions

```sh
# Navigate to the solution
cd solutions/typescript/2024/01
pnpm lint:tsc
pnpm lint:es
pnpm lint:format
```

## [Rust](./solutions/rust)

![2024 Rust Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/rust/2024.json)
![2023 Rust Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/rust/2023.json)
![2022 Rust Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/rust/2022.json)
![2021 Rust Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/rust/2021.json)
![2020 Rust Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/rust/2020.json)
[![2019 Rust Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/rust/2019.json)](/solutions/rust/2019/)
[![2018 Rust Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/rust/2018.json)](/solutions/rust/2018/)
[![2017 Rust Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/rust/2017.json)](/solutions/rust/2017/)
[![2016 Rust Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/rust/2016.json)](/solutions/rust/2016/)
[![2015 Rust Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/rust/2015.json)](/solutions/rust/2015/)

## [Python](./solutions/python)

![2024 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2024.json)
![2023 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2023.json)
[![2022 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2022.json)](/solutions/python/year2022/)
![2021 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2021.json)
![2020 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2020.json)
![2019 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2019.json)
![2018 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2018.json)
![2017 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2017.json)
![2016 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2016.json)
![2015 Python Progress](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/AlexAegis/advent-of-code/master/.github/badges/python/2015.json)

### Setup Python workspace

Install latest stable `python` and `pipenv`

```sh
pipenv install
pipenv shell
```

## Working with private files

If you wish to replicate the same input setup that I have so that it's compliant
with [Advent of Code](https://adventofcode.com/)'s rules, you should not keep
your inputs in a publicly hosted repository. I think the best solution to this
is to keep them in a private submodule, keeping your inputs private, but your
solutions public and keeping your CI happy and operational.

### Why?

See the _"Can I copy/redistribute part of Advent of Code?"_ section at
<https://adventofcode.com/2023/about>

### How?

1. Collect your input files into a new "advent-of-code-inputs" repository

2. Get a fresh clone of your repository!

3. [Install `git-filter-repo`](https://github.com/newren/git-filter-repo/blob/main/INSTALL.md)

   > You will completely rewrite your repository's history, so first educate
   > yourself on how
   > [`git-filter-repo`](https://github.com/newren/git-filter-repo) works. (The
   > tool you might find for this first is the BFG Repo cleaner, however
   > git-filter-repo is much more capable and can clean out huge repositories in
   > just milliseconds.)

4. Clean out the repository:
   `git filter-repo --invert-paths --path-glob '*.txt' --path inputs`

   > This is just an example command, add more globs or paths if needed

5. Verify that apart from the unwanted files everything is in order. Check older
   commits too!

   > Maybe in previous years you stored these files differently, and/or you
   > refactored them at some point!

6. Add back your inputs as a git submodule:

   ```sh
   git submodule add git@github.com:AlexAegis/advent-of-code-inputs.git resources
   git commit -m 'added inputs submodule'
   ```

7. Adjust your CI so that it checks out submodules too.

   > If you're using GitHub Actions and actions/checkout:

   ```yaml
   - name: checkout
     uses: actions/checkout@v4
     with:
       fetch-depth: 1
       submodules: true
   ```

8. Verify if everything works locally

9. If everything looks right, re-add your remote and force push the changes.
   (Since you started with a fresh clone, your old can be used to restore it if
   anything goes wrong at any point)

   ```sh
   git remote add origin git@github.com:AlexAegis/advent-of-code.git
   git push --force
   ```

10. Clean out remaining branches by either force pushing them too or just
    removing them.

## Disclaimer

[Advent of Code](https://adventofcode.com/) is made by
[Eric Wastl](http://was.tl/).
