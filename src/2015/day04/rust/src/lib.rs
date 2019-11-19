pub struct PartOne;
pub struct PartTwo;

use md5;

fn hash_search(zeroes: usize, input: &str) -> u32 {
	let lead = "0".repeat(zeroes);
	let mut i = 1;
	let mut hash = "".to_string();

	while !hash.starts_with(&lead) {
		hash = format!("{:x}", md5::compute(format!("{}{}", &input, &i)));
		i += 1;
	}

	i - 1
}

impl aoc::Solvable<&str, u32> for PartOne {
	fn solve(input: &str) -> aoc::Solution<u32> {
		Ok(hash_search(5, input))
	}
}

impl aoc::Solvable<&str, u32> for PartTwo {
	fn solve(input: &str) -> aoc::Solution<u32> {
		Ok(hash_search(6, input))
	}
}
