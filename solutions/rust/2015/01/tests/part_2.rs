use aoclib::Solvable;

use aoc201501::part_2::PartTwo;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 1, "input.txt")?;
	assert_eq!(PartTwo::solve(&input)?, 1795);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(PartTwo::solve(")")?, 1);
	Ok(())
}

#[test]
fn example_2() -> aoclib::Result<()> {
	assert_eq!(PartTwo::solve("()())")?, 5);
	Ok(())
}
