use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader({{year}}, {{short_day}}, "input.txt")?;
	assert_eq!(aoc{{year}}{{day}}::PartOne::solve(&input)?, 0);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc{{year}}{{day}}::PartOne::solve("")?, 0);
	Ok(())
}
