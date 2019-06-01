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

pub fn runner(input: String) -> i32 {
	input
		.chars()
		.filter(|a| *a == '(' || *a == ')')
		.fold(0, |a, n| a + if n == '(' { 1 } else { -1 }) // 8ms
}
