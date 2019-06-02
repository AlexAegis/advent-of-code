extern crate aoc1501;

use aoc::Solvable;

#[test]
fn input() {
	let input = aoc::reader(2015, 1, "input.txt");
	assert_eq!(aoc1501::PartOne::solve(&input), 74);
}

#[test]
fn example_1() {
	assert_eq!(aoc1501::PartOne::solve(&"(())".to_string()), 0);
	assert_eq!(aoc1501::PartOne::solve(&"()()".to_string()), 0);
}


#[test]
fn example_2_3() {
	assert_eq!(aoc1501::PartOne::solve(&"(((".to_string()), 3);
	assert_eq!(aoc1501::PartOne::solve(&"(()(()(".to_string()), 3);
	assert_eq!(aoc1501::PartOne::solve(&"))(((((".to_string()), 3);
}

#[test]
fn example_4() {
	assert_eq!(aoc1501::PartOne::solve(&"())".to_string()), -1);
	assert_eq!(aoc1501::PartOne::solve(&"))(".to_string()), -1);
}

#[test]
fn example_5() {
	assert_eq!(aoc1501::PartOne::solve(&")))".to_string()), -3);
	assert_eq!(aoc1501::PartOne::solve(&")())())".to_string()), -3);
}

