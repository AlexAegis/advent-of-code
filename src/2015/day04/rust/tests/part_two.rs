use aoc::Solvable;

#[test]
fn input() -> aoc::Result<()> {
	let input = aoc::reader(2015, 4, "input.txt")?;
	assert_eq!(aoc1504::PartTwo::solve(&input)?, 9_958_218);
	Ok(())
}

#[test]
fn example() -> aoc::Result<()> {
	let input = aoc::reader(2015, 4, "example.txt")?;
	assert_eq!(aoc1504::PartTwo::solve(&input)?, 6_742_839);
	Ok(())
}
