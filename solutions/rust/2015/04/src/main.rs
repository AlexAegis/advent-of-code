use aoc201504::{PartOne, PartTwo};
use aoclib::Solvable;

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 4, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 346386, ~505.82 ms
	let result_part_two = PartTwo::solve(&input)?; // 9958218, ~14461 ms
	println!(
		"Results for 2015 Day 4:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
