#[macro_use]
extern crate criterion;

extern crate aoc;
extern crate aoc1504;

use aoc::Solvable;
use criterion::Criterion;

fn part_one_benchmark(c: &mut Criterion) {
	c.bench_function("2015 day 4 part one", |b| {
		let input = aoc::reader(2015, 4, "input.txt");
		b.iter(|| aoc1504::PartOne::solve(&input))
	});
}

fn part_two_benchmark(c: &mut Criterion) {
	c.bench_function("2015 day 4 part two", |b| {
		let input = aoc::reader(2015, 4, "input.txt");
		b.iter(|| aoc1504::PartTwo::solve(&input))
	});
}

fn low_sample() -> Criterion {
	Criterion::default().sample_size(10)
}

criterion_group! {
	name = benches;
	config = low_sample();
	targets = part_two_benchmark
}

criterion_main!(benches);
