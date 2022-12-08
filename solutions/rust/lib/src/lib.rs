pub mod errors;
pub mod math;
pub mod model;

pub use errors::{AocError, SolutionError, SolverError};
use std::path::{Path, PathBuf};
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

fn find_nearest_directory_named(directory_name: &str) -> io::Result<String> {
	let target_directory = Path::new(directory_name);
	let exe_path = env::current_exe()?;
	let mut path = exe_path.as_path();
	while !path.join(target_directory).exists() {
		path = path.parent().unwrap();
	}
	return Ok(path.join(target_directory).to_str().unwrap().to_string());
}

fn path_resolve(year: u16, day: u16, resource: &'static str) -> io::Result<PathBuf> {
	let resources_dir_path = find_nearest_directory_named("resources")?;

	Ok(PathBuf::from(format!(
		"{resources_dir_path}/{year}/{day:02}/{resource}",
		resources_dir_path = resources_dir_path,
		year = year,
		day = day,
		resource = resource
	)))
}
