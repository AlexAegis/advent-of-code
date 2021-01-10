use aoclib::Solvable;

pub struct PartTwo {}

impl aoclib::Solvable<&str, i16> for PartTwo {
	/// Can't be parallelized as the order matters
	fn solve(input: &str) -> aoclib::Solution<i16> {
		Ok(input
			.chars()
			.map(|c| match c {
				'(' => 1,
				')' => -1,
				_ => 0,
			})
			.try_fold((0, 0), |mut acc, n| {
				acc.0 += n;
				acc.1 += 1;
				match acc.0 {
					a if a < 0 => Err(acc),
					_ => Ok(acc),
				}
			})
			.err()
			.ok_or("Not found")?
			.1)
	}
}

pub fn main() -> aoclib::Result<()> {
	let input = aoclib::reader(2015, 1, "input.txt")?;
	let result = PartTwo::solve(&input)?; // 1795, ~1.9μs
	println!("2015 Day 1 Part 2: {:?}", result);
	Ok(())
}
