pub struct PartOne;
pub struct PartTwo;

impl aoclib::Solvable<&str, u32> for PartOne {
	fn solve(input: &str) -> aoclib::Solution<u32> {
		let v = input
			.chars()
			.filter_map(|c| c.to_string().parse::<u8>().ok())
			.collect::<Vec<u8>>();

		let mut sum: u32 = 0;
		for (i, n) in v.iter().enumerate() {
			if n == v.get((i + 1) % v.len()).unwrap() {
				sum += *n as u32;
			}
		}
		Ok(sum)
	}
}

impl aoclib::Solvable<&str, u32> for PartTwo {
	fn solve(input: &str) -> aoclib::Solution<u32> {
		let v = input
			.chars()
			.filter_map(|c| c.to_string().parse::<u8>().ok())
			.collect::<Vec<u8>>();

		let mut sum: u32 = 0;
		for (i, n) in v.iter().enumerate() {
			if n == v.get((i + v.len() / 2) % v.len()).unwrap() {
				sum += *n as u32;
			}
		}
		Ok(sum)
	}
}
