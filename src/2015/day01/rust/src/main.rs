extern crate aoc;

use aoc::Solvable;
use aoc1501::{get_input, PartOne, PartTwo};

pub fn main() {
	let input = get_input(Option::None);
	let result_part_one = PartOne::solve(&input); // 74, ~8ms
	let result_part_two = PartTwo::solve(&input); // 1795, ~2ms

	println!(
		"Results for 2015 Day 1:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
}
