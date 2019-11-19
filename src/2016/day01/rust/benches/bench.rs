#[macro_use]
extern crate criterion;

extern crate aoc;
extern crate aoc1601;

use aoc::Solvable;
use criterion::Criterion;

fn part_one_benchmark(c: &mut Criterion) {
	c.bench_function("2016 day 1 part one", |b| {
		let input = aoc::reader(2016, 1, "input.txt").unwrap();
		b.iter(|| aoc1601::PartOne::solve(&input).unwrap())
	});
}

fn part_two_benchmark(c: &mut Criterion) {
	c.bench_function("2016 day 1 part two", |b| {
		let input = aoc::reader(2016, 1, "input.txt").unwrap();
		b.iter(|| aoc1601::PartTwo::solve(&input).unwrap())
	});
}

criterion_group!(benches, part_one_benchmark, part_two_benchmark);
criterion_main!(benches);
