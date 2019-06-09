extern crate aoc;

use aoc::Solvable;
use aoc1502::{PartOne, PartTwo};

pub fn main() {
	let input = aoc::reader(2015, 2, "input.txt");
	let result_part_one = PartOne::solve(&input); // 74, ~8ms
	let result_part_two = PartTwo::solve(&input); // 1795, ~2ms

	println!(
		"Results for 2015 Day 2:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
}
