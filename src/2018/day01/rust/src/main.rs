use aoc1801::{PartOne, PartTwo};
use aoclib::Solvable;

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2018, 1, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 408, ~12.486 us
	let result_part_two = PartTwo::solve(&input)?; // 55250, ~11.793 ms

	println!(
		"Results for 2018 Day 1:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
