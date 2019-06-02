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

impl aoc::Solvable<String, i32> for PartOne {
	fn solve(input: &String) -> i32 {
		input
			.chars()
			.filter(|a| *a == '(' || *a == ')')
			.fold(0, |a, c| a + if c == '(' { 1 } else { -1 })
	}
}

impl aoc::Solvable<String, i32> for PartTwo {
	fn solve(input: &String) -> i32 {
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

