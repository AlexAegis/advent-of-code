use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2016, 1, "input.txt")?;
	assert_eq!(aoc201601::PartOne::solve(&input)?, 74);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201601::PartOne::solve("(())")?, 0);
	assert_eq!(aoc201601::PartOne::solve("()()")?, 0);
	Ok(())
}
