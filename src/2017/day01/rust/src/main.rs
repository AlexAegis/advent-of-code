use aoc201701::{PartOne, PartTwo};
use aoclib::Solvable;

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2017, 1, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 1177, ~51μs
	let result_part_two = PartTwo::solve(&input)?; // 1060, ~59μs

	println!(
		"Results for 2017 Day 1:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
