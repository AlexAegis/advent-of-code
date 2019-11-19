extern crate aoc1801;

use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2018, 1, "input.txt")?;
	assert_eq!(aoc1801::PartTwo::solve(&input)?, 55250);
	Ok(())
}

#[test]
fn example_1() -> aoc::Result<()> {
	let input = aoc::reader(2018, 1, "example.txt")?;
	assert_eq!(aoc1801::PartTwo::solve(&input)?, 10);
	Ok(())
}
