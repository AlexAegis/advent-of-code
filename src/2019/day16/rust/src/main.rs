use aoclib::Solvable;
use aoc201916::{PartOne, PartTwo};

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 16, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 0, ~0μs
	let result_part_two = PartTwo::solve(&input)?; // 0, ~0μs

	println!(
		"Results for 2019 Day 16:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
