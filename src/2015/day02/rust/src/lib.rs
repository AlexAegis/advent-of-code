pub struct PartOne;
pub struct PartTwo;

impl aoc::Solvable<&str, i32> for PartOne {
	fn solve(input: &str) -> aoc::Solution<i32> {
		Ok(input
			.lines()
			.map(|l| l.trim())
			.map(|line| line.split('x').map(|c| c.parse::<i32>().unwrap()).collect())
			.map(|arr: Vec<i32>| [arr[0] * arr[1], arr[1] * arr[2], arr[2] * arr[0]])
			.map(|sides| sides.iter().min().unwrap() + sides.iter().sum::<i32>() * 2)
			.sum::<i32>())
	}
}

impl aoc::Solvable<&str, i32> for PartTwo {
	fn solve(input: &str) -> aoc::Solution<i32> {
		Ok(input
			.lines()
			.map(|l| l.trim())
			.map(|line| line.split('x').map(|c| c.parse::<i32>().unwrap()).collect())
			.map(|mut s: Vec<i32>| {
				s.sort_unstable();
				s
			})
			.map(|s| s.iter().product::<i32>() + s.iter().take(2).map(|n| n * 2).sum::<i32>())
			.sum::<i32>())
	}
}
