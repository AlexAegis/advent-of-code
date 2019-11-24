extern crate aoc1503;

use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2015, 3, "input.txt")?;
	assert_eq!(aoc1503::PartTwo::solve(&input)?, 2631);
	Ok(())
}
