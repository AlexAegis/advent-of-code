extern crate aoc1501;

use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2015, 1, "input.txt")?;
	assert_eq!(aoc1501::PartOne::solve(&input)?, 74);
	Ok(())
}

#[test]
fn example_1() -> aoc::Result<()> {
	assert_eq!(aoc1501::PartOne::solve(&"(())".to_string())?, 0);
	assert_eq!(aoc1501::PartOne::solve(&"()()".to_string())?, 0);
	Ok(())
}

#[test]
fn example_2_3() -> aoc::Result<()> {
	assert_eq!(aoc1501::PartOne::solve(&"(((".to_string())?, 3);
	assert_eq!(aoc1501::PartOne::solve(&"(()(()(".to_string())?, 3);
	assert_eq!(aoc1501::PartOne::solve(&"))(((((".to_string())?, 3);
	Ok(())
}

#[test]
fn example_4() -> aoc::Result<()> {
	assert_eq!(aoc1501::PartOne::solve(&"())".to_string())?, -1);
	assert_eq!(aoc1501::PartOne::solve(&"))(".to_string())?, -1);
	Ok(())
}

#[test]
fn example_5() -> aoc::Result<()> {
	assert_eq!(aoc1501::PartOne::solve(&")))".to_string())?, -3);
	assert_eq!(aoc1501::PartOne::solve(&")())())".to_string())?, -3);
	Ok(())
}
