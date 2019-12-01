use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 1, "input.txt")?;
	assert_eq!(aoc201901::PartOne::solve(&input)?, 3_399_947);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(aoc201901::PartOne::solve("12")?, 2);
	Ok(())
}

#[test]
fn example_2() -> aoclib::Result<()> {
	assert_eq!(aoc201901::PartOne::solve("14")?, 2);
	Ok(())
}

#[test]
fn example_3() -> aoclib::Result<()> {
	assert_eq!(aoc201901::PartOne::solve("1969")?, 654);
	Ok(())
}

#[test]
fn example_4() -> aoclib::Result<()> {
	assert_eq!(aoc201901::PartOne::solve("100756")?, 33583);
	Ok(())
}
