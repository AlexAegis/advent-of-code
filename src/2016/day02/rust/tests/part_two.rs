extern crate aoc1601;

use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2016, 1, "input.txt")?;
	assert_eq!(aoc1601::PartTwo::solve(&input)?, 1795);
	Ok(())
}

#[test]
fn example_1() -> aoc::Result<()> {
	assert_eq!(aoc1601::PartTwo::solve(")")?, 1);
	Ok(())
}
