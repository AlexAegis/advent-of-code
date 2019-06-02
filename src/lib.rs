use std::env;
use std::fs;
use std::path::Path;
use std::path::PathBuf;

pub trait Solvable<T, R> {
	fn solve(input: &T) -> R;
}

pub fn reader(path: &Path) -> String {
	fs::read_to_string(path).expect("Something went wrong reading the file")
}

pub fn path_resolve(year: u16, day: u16, resource: String, depth_in_target: usize) -> PathBuf {
	env::current_exe()
		.unwrap()
		.parent()
		.unwrap()
		.join(PathBuf::from(format!(
			"{back}src/{year}/day{day:02}/resources/{resource}",
			year = year,
			day = day,
			resource = resource,
			back = "../".repeat(depth_in_target)
		)))
}
