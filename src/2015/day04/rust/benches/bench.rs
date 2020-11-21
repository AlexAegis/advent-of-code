#[macro_use]
extern crate criterion;

use aoclib::Solvable;
use criterion::Criterion;d

fn part_one_benchmark(c: &mut Criterion) {
	c.bench_function("2015 day 4 part one", |b| {
		let input = aoclib::reader(2015, 4, "input.txt").unwrap();
		b.iter(|| aoc201504::PartOne::solve(&input).unwrap())
	});
}

fn part_two_benchmark(c: &mut Criterion) {
	c.bench_function("2015 day 4 part two", |b| {
		let input = aoclib::reader(2015, 4, "input.txt").unwrap();
		b.iter(|| aoc201504::PartTwo::solve(&input).unwrap())
	});
}

fn low_sample() -> Criterion {
	Criterion::default().sample_size(10)
}

criterion_group! {
	name = benches;
	config = low_sample();
	targets = part_one_benchmark, part_two_benchmark
}

criterion_main!(benches);
