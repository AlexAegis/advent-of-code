use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2017, 1, "input.txt")?;
	assert_eq!(aoc201701::PartOne::solve(&input)?, 1177);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201701::PartOne::solve("1122")?, 3);
	Ok(())
}

#[test]
fn example_2() -> aoclib::Result<()> {
	assert_eq!(aoc201701::PartOne::solve("1111")?, 4);
	Ok(())
}

#[test]
fn example_3() -> aoclib::Result<()> {
	assert_eq!(aoc201701::PartOne::solve("1234")?, 0);
	Ok(())
}

#[test]
fn example_4() -> aoclib::Result<()> {
	assert_eq!(aoc201701::PartOne::solve("91212129")?, 9);
	Ok(())
}
