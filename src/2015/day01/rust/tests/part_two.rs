use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 1, "input.txt")?;
	assert_eq!(aoc201501::PartTwo::solve(&input)?, 1795);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201501::PartTwo::solve(")")?, 1);
	Ok(())
}

#[test]
fn example_2() -> aoclib::Result<()> {
	assert_eq!(aoc201501::PartTwo::solve("()())")?, 5);
	Ok(())
}
