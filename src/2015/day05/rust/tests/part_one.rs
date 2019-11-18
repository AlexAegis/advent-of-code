use aoc::Solvable;

#[test]
fn input() {
	let input = aoc::reader(2015, 5, "input.txt");
	assert_eq!(aoc1505::PartOne::solve(&input), 0);
}

#[test]
fn example() {
	let input = aoc::reader(2015, 5, "example.txt");
	assert_eq!(aoc1505::PartOne::solve(&input), 0);
}
