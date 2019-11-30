use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2017, 1, "input.txt")?;
	assert_eq!(aoc201701::PartTwo::solve(&input)?, 1060);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201701::PartTwo::solve("1212")?, 6);
	Ok(())
}

#[test]
fn example_2() -> aoclib::Result<()> {
	assert_eq!(aoc201701::PartTwo::solve("1221")?, 0);
	Ok(())
}

#[test]
fn example_3() -> aoclib::Result<()> {
	assert_eq!(aoc201701::PartTwo::solve("123425")?, 4);
	Ok(())
}

#[test]
fn example_4() -> aoclib::Result<()> {
	assert_eq!(aoc201701::PartTwo::solve("123123")?, 12);
	Ok(())
}

#[test]
fn example_5() -> aoclib::Result<()> {
	assert_eq!(aoc201701::PartTwo::solve("12131415")?, 4);
	Ok(())
}
