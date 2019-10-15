extern crate aoc1601;

use aoc::Solvable;

#[test]
fn input() {
	let input = aoc::reader(2016, 1, "input.txt");
	assert_eq!(aoc1601::PartOne::solve(&input), 74);
}

#[test]
fn example_1() {
	assert_eq!(aoc1601::PartOne::solve(&"(())".to_string()), 0);
	assert_eq!(aoc1601::PartOne::solve(&"()()".to_string()), 0);
}
