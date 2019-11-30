use aoc201601::{PartOne, PartTwo};
use aoclib::Solvable;

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2016, 1, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 74, ~8ms
	let result_part_two = PartTwo::solve(&input)?; // 1795, ~2ms

	println!(
		"Results for 2016 Day 1:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
