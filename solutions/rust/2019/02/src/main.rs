use aoc201902::{PartOne, PartTwo};
use aoclib::Solvable;

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 2, "input.txt")?;
	let result_part_one = PartOne::solve(&input)?; // 3101844, ~2.2μs
	let result_part_two = PartTwo::solve(&input)?; // 8478, ~1ms

	println!(
		"Results for 2019 Day 2:\n\tPart One: {:?}\n\tPart Two: {:?}",
		result_part_one, result_part_two
	);
	Ok(())
}
