use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 5, "input.txt")?;
	assert_eq!(aoc1505::PartTwo::solve(&input)?, 51);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc1505::PartTwo::solve("qjhvhtzxzqqjkmpb")?, 1);
	Ok(())
}

#[test]
fn example_2() -> aoclib::Result<()> {
	assert_eq!(aoc1505::PartTwo::solve("xxyxx")?, 1);
	Ok(())
}

#[test]
fn example_3() -> aoclib::Result<()> {
	assert_eq!(aoc1505::PartTwo::solve("uurcxstgmygtbstg")?, 0);
	Ok(())
}

#[test]
fn example_4() -> aoclib::Result<()> {
	assert_eq!(aoc1505::PartTwo::solve("ieodomkazucvgmuy")?, 0);
	Ok(())
}
