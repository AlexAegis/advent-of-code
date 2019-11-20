extern crate aoc;

use aoc::Solvable;
use aoc1502::{PartOne, PartTwo};

pub fn main() -> aoc::Result<()> {
	let input = aoc::reader(2015, 2, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 1606483, ~333μs
	let result_part_two = PartTwo::solve(&input)?; // 3842356, ~355μs

	println!(
		"Results for 2015 Day 2:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
