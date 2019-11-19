use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2015, 5, "input.txt")?;
	assert_eq!(aoc1505::PartOne::solve(&input)?, 236);
	Ok(())
}

#[test]
fn example_1() -> aoc::Result<()> {
	assert_eq!(aoc1505::PartOne::solve("ugknbfddgicrmopn")?, 1);
	Ok(())
}

#[test]
fn example_2() -> aoc::Result<()> {
	assert_eq!(aoc1505::PartOne::solve("aaa")?, 1);
	Ok(())
}

#[test]
fn example_3() -> aoc::Result<()> {
	assert_eq!(aoc1505::PartOne::solve("jchzalrnumimnmhp")?, 0);
	Ok(())
}

#[test]
fn example_4() -> aoc::Result<()> {
	assert_eq!(aoc1505::PartOne::solve("haegwjzuvuyypxyu")?, 0);
	Ok(())
}

#[test]
fn example_5() -> aoc::Result<()> {
	assert_eq!(aoc1505::PartOne::solve("dvszwmarrgswjxmb")?, 0);
	Ok(())
}
