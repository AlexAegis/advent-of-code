use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader({{year}}, {{short_day}}, "input.txt")?;
	assert_eq!(aoc{{year}}{{day}}::PartOne::solve(&input)?, 0);
	Ok(())
}

#[test]
fn example_1() -> aoc::Result<()> {
	assert_eq!(aoc{{year}}{{day}}::PartOne::solve("")?, 0);
	Ok(())
}
