use fancy_regex::Regex;

pub struct PartOne;
pub struct PartTwo;

impl aoc::Solvable<String, i32> for PartOne {
	fn solve(input: &String) -> i32 {
		let r = Regex::new(r"(.*[aeiou]){3}").unwrap();
		input
			.lines()
			.map(|l| r.is_match(l).unwrap())
			.map(|m| if m { 1 } else { 0 })
			.sum::<i32>()
	}
}

impl aoc::Solvable<String, i32> for PartTwo {
	fn solve(input: &String) -> i32 {
		let r1 = Regex::new(r"(..).*\1").unwrap();
		let r2 = Regex::new(r"(.).\1").unwrap();
		input
			.lines()
			.map(|l| r1.is_match(l).unwrap() && r2.is_match(l).unwrap())
			.map(|m| if m { 1 } else { 0 })
			.sum::<i32>()
	}
}
