extern crate aoc1502;

use aoc::Solvable;

#[test]
fn input() {
	let input = aoc::reader(2015, 2, "input.txt");
	assert_eq!(aoc1502::PartOne::solve(&input), 1606483);
}

#[test]
fn example_1() {
	assert_eq!(aoc1502::PartOne::solve(&"2x3x4".to_string()), 58);
}


#[test]
fn example_2() {
	assert_eq!(aoc1502::PartOne::solve(&"1x1x10".to_string()), 43);
}
