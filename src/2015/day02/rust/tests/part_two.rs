extern crate aoc1502;

use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2015, 2, "input.txt")?;
	assert_eq!(aoc1502::PartTwo::solve(&input)?, 3842356);
	Ok(())
}

#[test]
fn example_1() -> aoc::Result<()> {
	assert_eq!(aoc1502::PartTwo::solve(&"2x3x4".to_string())?, 34);
	Ok(())
}

#[test]
fn example_2() -> aoc::Result<()> {
	assert_eq!(aoc1502::PartTwo::solve(&"1x1x10".to_string())?, 14);
	Ok(())
}
