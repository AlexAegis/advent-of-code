use aoc::Solvable;

#[test]
fn input() {
	let input = aoc::reader(2015, 4, "input.txt");
	assert_eq!(aoc1504::PartOne::solve(&input), 346386);
}

#[test]
fn example() {
	let input = aoc::reader(2015, 4, "example.txt");
	assert_eq!(aoc1504::PartOne::solve(&input), 609043);
}
