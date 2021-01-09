use aoc201901::{PartOne, PartTwo};
use aoclib::Solvable;

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 1, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 3399947, ~1.6μs
	let result_part_two = PartTwo::solve(&input)?; // 5097039, ~3.6μs

	println!(
		"Results for 2019 Day 1:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
