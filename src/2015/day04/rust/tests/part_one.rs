use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2015, 4, "input.txt")?;
	assert_eq!(aoc1504::PartOne::solve(&input)?, 346_386);
	Ok(())
}

#[test]
fn example() -> aoc::Result<()> {
	let input = aoc::reader(2015, 4, "example.txt")?;
	assert_eq!(aoc1504::PartOne::solve(&input)?, 609_043);
	Ok(())
}
