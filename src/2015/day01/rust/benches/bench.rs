#[macro_use]


extern crate criterion;

extern crate aoc;
extern crate aoc150101;
use criterion::black_box;
use criterion::Criterion;


fn part_one_benchmark(c: &mut Criterion) {
	c.bench_function("2015 day 1 part one", |b| {
		let input: String = aoc150101::get_input(Option::from(3));
		b.iter(|| aoc150101::runner(black_box(input.clone())))
	});
}

criterion_group!(benches, part_one_benchmark);
criterion_main!(benches);

