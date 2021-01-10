use aoclib::Solvable;

pub struct PartOne;

impl aoclib::Solvable<&str, i16> for PartOne {
	/// Not worth to be parallelized
	fn solve(input: &str) -> aoclib::Solution<i16> {
		Ok(input
			.chars()
			.map(|c| match c {
				'(' => 1,
				')' => -1,
				_ => 0,
			})
			.sum())
	}
}

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 1, "input.txt")?;
	let result = PartOne::solve(&input)?; // 74, ~6.2μs
	const PKG_NAME: &'static str = env!("CARGO_PKG_NAME");
	println!("{} part 1 result: {:?}", PKG_NAME, result);
	Ok(())
}
