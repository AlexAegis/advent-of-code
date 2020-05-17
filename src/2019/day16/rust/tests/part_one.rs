use aoclib::Solvable;

#[test]
fn input() -> aoclib::Result<()> {
	let input = aoclib::reader(2019, 16, "input.txt")?;
	assert_eq!(aoc201916::PartOne::solve(&input)?, "92643465");
	Ok(())
}
