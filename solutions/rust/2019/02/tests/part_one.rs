use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 2, "input.txt")?;
	assert_eq!(aoc201902::PartOne::solve(&input)?, 3_101_844);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(
		aoc201902::compute(aoc201902::parse("1,9,10,3,2,3,11,0,99,30,40,50"))
			.ok_or_else(|| aoclib::SolutionError::from("Not found"))?,
		3500
	);
	Ok(())
}

#[test]
fn example_2() -> aoclib::Result<()> {
	assert_eq!(
		aoc201902::compute(aoc201902::parse("1,0,0,0,99"))
			.ok_or_else(|| aoclib::SolutionError::from("Not found"))?,
		2
	);
	Ok(())
}

#[test]
fn example_3() -> aoclib::Result<()> {
	assert_eq!(
		aoc201902::compute(aoc201902::parse("2,3,0,3,99"))
			.ok_or_else(|| aoclib::SolutionError::from("Not found"))?,
		2
	);
	Ok(())
}

#[test]
fn example_4() -> aoclib::Result<()> {
	assert_eq!(
		aoc201902::compute(aoc201902::parse("2,4,4,5,99,0"))
			.ok_or_else(|| aoclib::SolutionError::from("Not found"))?,
		2
	);
	Ok(())
}

#[test]
fn example_5() -> aoclib::Result<()> {
	assert_eq!(
		aoc201902::compute(aoc201902::parse("1,1,1,4,99,5,6,0,99"))
			.ok_or_else(|| aoclib::SolutionError::from("Not found"))?,
		30
	);
	Ok(())
}
