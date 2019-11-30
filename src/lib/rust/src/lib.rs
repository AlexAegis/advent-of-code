pub mod errors;
pub mod math;
pub mod model;

pub use errors::{AocError, SolutionError, SolverError};
use std::path::PathBuf;
use std::{env, fs, io};

pub type Result<T> = std::result::Result<T, AocError>;
pub type Solution<T> = std::result::Result<T, SolutionError>;
pub type SolverResult<T> = std::result::Result<T, SolverError>;

pub trait Solvable<T, R> {
	fn solve(input: T) -> Solution<R>;
}

/**
 * Reads a resource for a task.
 *
 * In cargo run mode, the created executable is 2 levels deep in the target folder
 * In test and bench modes however it's 3 levels deep.
 *
 * While this approach to read the associated input files for each task is very rigid
 * in terms of pathing, in the context of this project it's acceptable as the compiled binaries
 * are only used by `cargo` and are not meant to be used in any other way.
 */
pub fn reader(year: u16, day: u16, resource: &'static str) -> io::Result<String> {
	fs::read_to_string(path_resolve(year, day, resource, 2)?.as_path())
		.or_else(|_a| fs::read_to_string(path_resolve(year, day, resource, 3)?.as_path()))
}

fn path_resolve(
	year: u16,
	day: u16,
	resource: &'static str,
	depth_in_target: usize,
) -> io::Result<PathBuf> {
	Ok(env::current_exe()?
		.parent()
		.unwrap()
		.join(PathBuf::from(format!(
			"{back}src/{year}/day{day:02}/resources/{resource}",
			year = year,
			day = day,
			resource = resource,
			back = "../".repeat(depth_in_target)
		))))
}
