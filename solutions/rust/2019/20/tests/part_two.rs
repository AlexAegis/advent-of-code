use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 20, "input.txt")?;
	assert_eq!(aoc201920::PartTwo::solve(&input)?, 0);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201920::PartTwo::solve("")?, 0);
	Ok(())
}
