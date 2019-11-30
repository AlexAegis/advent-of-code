use aoc1502::{PartOne, PartTwo};
use aoclib::Solvable;

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 2, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 1606483, ~194μs
	let result_part_two = PartTwo::solve(&input)?; // 3842356, ~196μs

	println!(
		"Results for 2015 Day 2:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
