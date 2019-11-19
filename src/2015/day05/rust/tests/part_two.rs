use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2015, 5, "input.txt")?;
	assert_eq!(aoc1505::PartTwo::solve(&input)?, 51);
	Ok(())
}

#[test]
fn example_1() -> aoc::Result<()> {
	assert_eq!(aoc1505::PartTwo::solve("qjhvhtzxzqqjkmpb")?, 1);
	Ok(())
}

#[test]
fn example_2() -> aoc::Result<()> {
	assert_eq!(aoc1505::PartTwo::solve("xxyxx")?, 1);
	Ok(())
}

#[test]
fn example_3() -> aoc::Result<()> {
	assert_eq!(aoc1505::PartTwo::solve("uurcxstgmygtbstg")?, 0);
	Ok(())
}

#[test]
fn example_4() -> aoc::Result<()> {
	assert_eq!(aoc1505::PartTwo::solve("ieodomkazucvgmuy")?, 0);
	Ok(())
}
