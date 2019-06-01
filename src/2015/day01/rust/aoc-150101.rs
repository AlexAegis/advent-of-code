use std::env;
use std::fs;

fn reader() -> String {
	return fs::read_to_string("./src/2015/day01/resources/input.txt")
		.expect("Something went wrong reading the file");
}

fn runner(input: String) -> i32 {
	return input.chars().fold(0, |a, n| {
		a + match n {
			'(' => 1,
			')' => -1,
			_ => 0,
		}
	});
}


fn main() {
	let contents = reader();
	println!("{:?}", runner(contents)); // 74
}
