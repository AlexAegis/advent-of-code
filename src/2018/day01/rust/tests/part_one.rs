extern crate aoc1801;

use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2018, 1, "input.txt")?;
	assert_eq!(aoc1801::PartOne::solve(&input)?, 408);
	Ok(())
}

#[test]
fn example() -> aoc::Result<()> {
	let input = aoc::reader(2018, 1, "example.txt")?;
	assert_eq!(aoc1801::PartOne::solve(&input)?, 4);
	Ok(())
}
