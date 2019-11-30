use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 4, "input.txt")?;
	assert_eq!(aoc201504::PartTwo::solve(&input)?, 9_958_218);
	Ok(())
}

#[test]
fn example() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 4, "example.txt")?;
	assert_eq!(aoc201504::PartTwo::solve(&input)?, 6_742_839);
	Ok(())
}
