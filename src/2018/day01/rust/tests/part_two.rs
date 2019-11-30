use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2018, 1, "input.txt")?;
	assert_eq!(aoc1801::PartTwo::solve(&input)?, 55250);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	let input = aoclib::reader(2018, 1, "example.txt")?;
	assert_eq!(aoc1801::PartTwo::solve(&input)?, 10);
	Ok(())
}
