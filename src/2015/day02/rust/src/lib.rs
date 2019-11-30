use rayon::prelude::*;

pub struct PartOne;
pub struct PartTwo;

impl aoclib::Solvable<&str, u32> for PartOne {
	fn solve(input: &str) -> aoclib::Solution<u32> {
		Ok(input
			.lines()
			.par_bridge()
			.map(|l| l.trim())
			.map(|line| line.split('x').map(|c| c.parse().unwrap()).collect())
			.map(|arr: Vec<u32>| [arr[0] * arr[1], arr[1] * arr[2], arr[2] * arr[0]])
			.map(|sides| sides.iter().min().unwrap() + sides.iter().sum::<u32>() * 2)
			.sum())
	}
}

impl aoclib::Solvable<&str, u32> for PartTwo {
	fn solve(input: &str) -> aoclib::Solution<u32> {
		Ok(input
			.lines()
			.par_bridge()
			.map(|l| l.trim())
			.map(|line| line.split('x').map(|c| c.parse().unwrap()).collect())
			.map(|mut s: Vec<u32>| {
				s.sort_unstable();
				s
			})
			.map(|s| s.iter().product::<u32>() + s.iter().take(2).map(|n| n * 2).sum::<u32>())
			.sum())
	}
}
