use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 21, "input.txt")?;
	assert_eq!(aoc201921::PartOne::solve(&input)?, 0);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201921::PartOne::solve("")?, 0);
	Ok(())
}
