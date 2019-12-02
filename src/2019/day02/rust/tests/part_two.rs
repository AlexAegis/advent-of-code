use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 2, "input.txt")?;
	assert_eq!(aoc201902::PartTwo::solve(&input)?, 0);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201902::PartTwo::solve("")?, 0);
	Ok(())
}
