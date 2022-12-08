use fancy_regex::Regex;

pub struct PartOne;
pub struct PartTwo;

impl aoclib::Solvable<&str, u32> for PartOne {
	fn solve(input: &str) -> aoclib::Solution<u32> {
		let r1 = Regex::new(r"ab|cd|pq|xy")?;
		let r2 = Regex::new(r"(.*[aeiou]){3}")?;
		let r3 = Regex::new(r"(.)\1")?;
		Ok(input
			.lines()
			.map(|l| {
				!r1.is_match(l).unwrap_or(false)
					&& r2.is_match(l).unwrap_or(false)
					&& r3.is_match(l).unwrap_or(false)
			})
			.map(u32::from)
			.sum::<u32>())
	}
}

impl aoclib::Solvable<&str, u32> for PartTwo {
	fn solve(input: &str) -> aoclib::Solution<u32> {
		let r1 = Regex::new(r"(..).*\1")?;
		let r2 = Regex::new(r"(.).\1")?;
		Ok(input
			.lines()
			.map(|l| r1.is_match(l).unwrap_or(false) && r2.is_match(l).unwrap_or(false))
			.map(u32::from)
			.sum::<u32>())
	}
}
