use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 4, "input.txt")?;
	assert_eq!(aoc201504::PartOne::solve(&input)?, 346_386);
	Ok(())
}

#[test]
fn example() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 4, "example.txt")?;
	assert_eq!(aoc201504::PartOne::solve(&input)?, 609_043);
	Ok(())
}
