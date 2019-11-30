use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 2, "input.txt")?;
	assert_eq!(aoc1502::PartTwo::solve(&input)?, 3842356);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc1502::PartTwo::solve(&"2x3x4".to_string())?, 34);
	Ok(())
}

#[test]
fn example_2() -> aoclib::Result<()> {
	assert_eq!(aoc1502::PartTwo::solve(&"1x1x10".to_string())?, 14);
	Ok(())
}
