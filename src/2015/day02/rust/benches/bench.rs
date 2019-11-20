#[macro_use]
extern crate criterion;

extern crate aoc;
extern crate aoc1502;

use aoc::Solvable;
use criterion::Criterion;

fn part_one_benchmark(c: &mut Criterion) {
	c.bench_function("2015 day 2 part one", |b| {
		let input = aoc::reader(2015, 2, "input.txt").unwrap();
		b.iter(|| aoc1502::PartOne::solve(&input).unwrap())
	});
}

fn part_two_benchmark(c: &mut Criterion) {
	c.bench_function("2015 day 2 part two", |b| {
		let input = aoc::reader(2015, 2, "input.txt").unwrap();
		b.iter(|| aoc1502::PartTwo::solve(&input).unwrap())
	});
}

criterion_group!(benches, part_one_benchmark, part_two_benchmark);
criterion_main!(benches);
