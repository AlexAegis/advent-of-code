use aoclib::Solvable;

use aoc201501::part_1::PartOne;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 1, "input.txt")?;
	assert_eq!(PartOne::solve(&input)?, 74);
	Ok(())
}

#[test]
fn example_1() -> aoclib::Result<()> {
	assert_eq!(PartOne::solve(&"(())".to_string())?, 0);
	assert_eq!(PartOne::solve(&"()()".to_string())?, 0);
	Ok(())
}

#[test]
fn example_2_3() -> aoclib::Result<()> {
	assert_eq!(PartOne::solve(&"(((".to_string())?, 3);
	assert_eq!(PartOne::solve(&"(()(()(".to_string())?, 3);
	assert_eq!(PartOne::solve(&"))(((((".to_string())?, 3);
	Ok(())
}

#[test]
fn example_4() -> aoclib::Result<()> {
	assert_eq!(PartOne::solve(&"())".to_string())?, -1);
	assert_eq!(PartOne::solve(&"))(".to_string())?, -1);
	Ok(())
}

#[test]
fn example_5() -> aoclib::Result<()> {
	assert_eq!(PartOne::solve(&")))".to_string())?, -3);
	assert_eq!(PartOne::solve(&")())())".to_string())?, -3);
	Ok(())
}
