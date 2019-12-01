use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 1, "input.txt")?;
	assert_eq!(aoc201901::PartTwo::solve(&input)?, 5_097_039);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201901::PartTwo::solve("14")?, 2);
	Ok(())
}

#[test]
fn example_2() -> aoclib::Result<()> {
	assert_eq!(aoc201901::PartTwo::solve("1969")?, 966);
	Ok(())
}

#[test]
fn example_3() -> aoclib::Result<()> {
	assert_eq!(aoc201901::PartTwo::solve("100756")?, 50346);
	Ok(())
}
