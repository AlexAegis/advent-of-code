extern crate aoc;

use aoc::Solvable;
use aoc1504::{ PartOne, PartTwo };

pub fn main() {
	let input = aoc::reader(2015, 4, "input.txt");
	let result_part_one = PartOne::solve(&input); // 0, ~0 us
	let result_part_two = PartTwo::solve(&input); // 0, ~0 us

	println!(
		"Results for 2015 Day 4:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
}
