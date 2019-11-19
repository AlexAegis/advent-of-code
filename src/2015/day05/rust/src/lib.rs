use fancy_regex::Regex;

pub struct PartOne;
pub struct PartTwo;

impl aoc::Solvable<&str, u32> for PartOne {
	fn solve(input: &str) -> aoc::Solution<u32> {
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
			.map(|m| if m { 1 } else { 0 })
			.sum::<u32>())
	}
}

impl aoc::Solvable<&str, u32> for PartTwo {
	fn solve(input: &str) -> aoc::Solution<u32> {
		let r1 = Regex::new(r"(..).*\1")?;
		let r2 = Regex::new(r"(.).\1")?;
		Ok(input
			.lines()
			.map(|l| r1.is_match(l).unwrap_or(false) && r2.is_match(l).unwrap_or(false))
			.map(|m| if m { 1 } else { 0 })
			.sum::<u32>())
	}
}
