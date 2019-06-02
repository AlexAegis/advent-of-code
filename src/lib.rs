use std::env;
use std::fs;

use std::path::PathBuf;

pub trait Solvable<T, R> {
	fn solve(input: &T) -> R;
}

/**
 * Reads a resource for a task.
 *
 * In cargo run mode, the created executable is 2 levels deep in the target folder
 * In test and bench modes however it's 3 levels deep.Box
 *
 * While this approach to read the associated input files for each task is very rigid
 * in terms of pathing, in the context of this project it's acceptable as the compiled binaries
 * are only used by `cargo` and are not meant to be used in any other way.
 */
pub fn reader(year: u16, day: u16, resource: &'static str) -> String {
	fs::read_to_string(path_resolve(year, day, resource, 2).as_path())
		.or_else(|_a| fs::read_to_string(path_resolve(year, day, resource, 3).as_path()))
		.unwrap()
}

fn path_resolve(year: u16, day: u16, resource: &'static str, depth_in_target: usize) -> PathBuf {
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
