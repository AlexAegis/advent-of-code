use aoclib::Solvable;
use aoc201909::{PartOne, PartTwo};

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 9, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 0, ~0μs
	let result_part_two = PartTwo::solve(&input)?; // 0, ~0μs

	println!(
		"Results for 2019 Day 9:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
