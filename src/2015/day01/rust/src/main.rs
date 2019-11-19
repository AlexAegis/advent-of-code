use aoc::Solvable;
use aoc1501::{PartOne, PartTwo};

pub fn main() -> aoc::Result<()> {
	let input = aoc::reader(2015, 1, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 74, ~8ms
	let result_part_two = PartTwo::solve(&input)?; // 1795, ~2ms

	println!(
		"Results for 2015 Day 1:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
