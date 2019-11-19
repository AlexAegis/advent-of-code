extern crate aoc1501;

use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2015, 1, "input.txt")?;
	assert_eq!(aoc1501::PartTwo::solve(&input)?, 1795);
	Ok(())
}

#[test]
fn example_1() -> aoc::Result<()> {
	assert_eq!(aoc1501::PartTwo::solve(")")?, 1);
	Ok(())
}

#[test]
fn example_2() -> aoc::Result<()> {
	assert_eq!(aoc1501::PartTwo::solve("()())")?, 5);
	Ok(())
}
