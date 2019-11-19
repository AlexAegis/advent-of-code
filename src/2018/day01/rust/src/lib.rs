use std::collections::HashSet;

pub struct PartOne;
pub struct PartTwo;

impl aoc::Solvable<&str, i32> for PartOne {
	fn solve(input: &str) -> aoc::Solution<i32> {
		Ok(input.lines().map(|s| s.parse::<i32>().unwrap()).sum())
	}
}

impl aoc::Solvable<&str, i32> for PartTwo {
	fn solve(input: &str) -> aoc::Solution<i32> {
		let history: &mut HashSet<i32> = &mut HashSet::new();
		let result: &mut Option<i32> = &mut None;
		let mut sum: i32 = 0;

		while result.is_none() {
			for n in input.lines().map(|s| s.parse::<i32>().unwrap()) {
				let prev_length = history.len();
				sum += n;
				history.insert(sum);
				if prev_length == history.len() {
					result.replace(sum);
					break;
				}
			}
		}

		result.ok_or(aoc::SolutionError::new("Not found"))
	}
}
