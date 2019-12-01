use std::cmp;

pub struct PartOne;
pub struct PartTwo;

impl aoclib::Solvable<&str, i32> for PartOne {
	fn solve(input: &str) -> aoclib::Solution<i32> {
		Ok(input
			.lines()
			.map(|n| (n.parse::<i32>().unwrap_or(0) / 3) - 2)
			.sum())
	}
}

fn fuel(i: i32) -> i32 {
	let f = cmp::max((i / 3) - 2, 0);
	f + if f > 0 { fuel(f) } else { 0 }
}

impl aoclib::Solvable<&str, i32> for PartTwo {
	fn solve(input: &str) -> aoclib::Solution<i32> {
		Ok(input
			.lines()
			.map(|n| fuel(n.parse::<i32>().unwrap_or(0)))
			.sum())
	}
}
