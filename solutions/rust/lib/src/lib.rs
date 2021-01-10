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
 */
pub fn reader(year: u16, day: u16, resource: &'static str) -> io::Result<String> {
	fs::read_to_string(path_resolve(year, day, resource)?.as_path())
}

fn path_resolve(year: u16, day: u16, resource: &'static str) -> io::Result<PathBuf> {
	let exe = env::current_exe()?;
	let mut p = exe.parent().unwrap();
	while !p.ends_with("rust") {
		p = p.parent().unwrap();
	}
	Ok(p.join(PathBuf::from(format!(
		"../../resources/{year}/{day:02}/{resource}",
		year = year,
		day = day,
		resource = resource
	))))
}
