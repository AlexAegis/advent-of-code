pub fn get_input(level: Option<usize>) -> String {
	aoc::reader(
		aoc::path_resolve(
			2015,
			1,
			String::from("input.txt"),
			level.unwrap_or_else(|| 2),
		)
		.as_path(),
	)
}

pub struct PartOne;
pub struct PartTwo;

impl aoc::Solvable<String, i16> for PartOne {
	fn solve(input: &String) -> i16 {
		input
			.chars()
			.filter(|c| *c == '(' || *c == ')')
			.fold(0, |a, c| a + if c == '(' { 1 } else { -1 })
	}
}

impl aoc::Solvable<String, i16> for PartTwo {
	fn solve(input: &String) -> i16 {
		let mut a = 0;
		let mut i = 0;
		for c in input.chars().filter(|a| *a == '(' || *a == ')') {
			a += if c == '(' { 1 } else { -1 };
			i += 1;
			if a < 0 {
				break;
			}
		}
		i
	}
}

