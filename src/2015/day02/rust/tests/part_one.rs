extern crate aoc1502;

use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2015, 2, "input.txt")?;
	assert_eq!(aoc1502::PartOne::solve(&input)?, 1_606_483);
	Ok(())
}

#[test]
fn example_1() -> aoc::Result<()> {
	assert_eq!(aoc1502::PartOne::solve(&"2x3x4".to_string())?, 58);
	Ok(())
}

#[test]
fn example_2() -> aoc::Result<()> {
	assert_eq!(aoc1502::PartOne::solve(&"1x1x10".to_string())?, 43);
	Ok(())
}
