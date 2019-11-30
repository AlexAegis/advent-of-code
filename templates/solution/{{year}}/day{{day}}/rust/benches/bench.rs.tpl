#[macro_use]
extern crate criterion;

use aoc::Solvable;
use criterion::Criterion;

fn part_one_benchmark(c: &mut Criterion) {
	c.bench_function("{{day}} day {{short_day}} part one", |b| {
		let input = aoc::reader({{year}}, {{short_day}}, "input.txt").unwrap();
		b.iter(|| aoc{{year}}{{day}}::PartOne::solve(&input).unwrap())
	});
}

fn part_two_benchmark(c: &mut Criterion) {
	c.bench_function("{{year}} day {{short_day}} part {{part_lc_str}}", |b| {
		let input = aoc::reader({{year}}, {{short_day}, "input.txt").unwrap();
		b.iter(|| aoc{{year}}{{day}}::Part{{part_uc_str}}::solve(&input).unwrap())
	});
}

criterion_group!(benches, part_one_benchmark, part_two_benchmark);
criterion_main!(benches);
