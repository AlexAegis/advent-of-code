use std::cmp;

#[derive(Default)]
pub struct PartOne;
pub struct PartTwo;

impl aoclib::Solvable<&str, i32> for PartOne {
	/// 3399947, ~1.6μs
	fn solve(input: &str) -> aoclib::Solution<i32> {
		Ok(input
			.lines()
			.map(|n| (n.parse::<i32>().unwrap_or(0) / 3) - 2)
			.sum())
	}
}

impl aoclib::Solvable<&str, i32> for PartTwo {
	// 5097039, ~3.6μs
	fn solve(input: &str) -> aoclib::Solution<i32> {
		Ok(input
			.lines()
			.map(|n| PartTwo::fuel(n.parse::<i32>().unwrap_or(0)))
			.sum())
	}
}

impl PartTwo {
	fn fuel(i: i32) -> i32 {
		let f = cmp::max((i / 3) - 2, 0);
		f + if f > 0 { PartTwo::fuel(f) } else { 0 }
	}
}
