use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 3, "input.txt")?;
	assert_eq!(aoc201503::PartOne::solve(&input)?, 2572);
	Ok(())
}
