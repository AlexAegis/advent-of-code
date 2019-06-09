extern crate aoc1502;

use aoc::Solvable;

#[test]
fn input() {
	let input = aoc::reader(2015, 2, "input.txt");
	assert_eq!(aoc1502::PartTwo::solve(&input), 3842356);
}

#[test]
fn example_1() {
	assert_eq!(aoc1502::PartTwo::solve(&"2x3x4".to_string()), 34);
}

#[test]
fn example_2() {
	assert_eq!(aoc1502::PartTwo::solve(&"1x1x10".to_string()), 14);
}
