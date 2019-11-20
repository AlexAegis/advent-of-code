pub struct PartOne;
pub struct PartTwo;

impl aoc::Solvable<&str, i16> for PartOne {
	fn solve(input: &str) -> aoc::Solution<i16> {
		Ok(input
			.chars()
			.filter(|c| *c == '(' || *c == ')')
			.map(|c| if c == '(' { 1 } else { -1 })
			.sum())
	}
}

impl aoc::Solvable<&str, i16> for PartTwo {
	fn solve(input: &str) -> aoc::Solution<i16> {
		Ok(input
			.chars()
			.filter(|c| *c == '(' || *c == ')')
			.map(|c| if c == '(' { 1 } else { -1 })
			.try_fold((0, 0), |mut acc, n| {
				acc.0 += n;
				acc.1 += 1;
				if acc.0 < 0 {
					Err(acc)
				} else {
					Ok(acc)
				}
			})
			.err()
			.ok_or("Not found")?
			.1)
	}
}
