use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2016, 1, "input.txt")?;
	assert_eq!(aoc1601::PartTwo::solve(&input)?, 1795);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc1601::PartTwo::solve(")")?, 1);
	Ok(())
}
