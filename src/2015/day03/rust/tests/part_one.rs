extern crate aoc1503;

use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2015, 3, "input.txt")?;
	assert_eq!(aoc1503::PartOne::solve(&input)?, 2572);
	Ok(())
}
