use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 13, "input.txt")?;
	assert_eq!(aoc201913::PartTwo::solve(&input)?, 0);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201913::PartTwo::solve("")?, 0);
	Ok(())
}
