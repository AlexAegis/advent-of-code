use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 2, "input.txt")?;
	assert_eq!(aoc201502::PartOne::solve(&input)?, 1_606_483);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201502::PartOne::solve(&"2x3x4".to_string())?, 58);
	Ok(())
}

#[test]
fn example_2() -> aoclib::Result<()> {
	assert_eq!(aoc201502::PartOne::solve(&"1x1x10".to_string())?, 43);
	Ok(())
}
