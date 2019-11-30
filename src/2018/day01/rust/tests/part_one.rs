use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2018, 1, "input.txt")?;
	assert_eq!(aoc1801::PartOne::solve(&input)?, 408);
	Ok(())
}

#[test]
fn example() -> aoclib::Result<()> {
	let input = aoclib::reader(2018, 1, "example.txt")?;
	assert_eq!(aoc1801::PartOne::solve(&input)?, 4);
	Ok(())
}
