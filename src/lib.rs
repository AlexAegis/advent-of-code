use fancy_regex;
use std::error::Error;
use std::path::PathBuf;
use std::{env, fmt, fs, io};

#[derive(Debug)]
pub enum AocError {
	Solution(SolutionError),
	Solver(SolverError),
	Reader(ReaderError),
}

impl fmt::Display for AocError {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		match self {
			AocError::Solution(e) => e.fmt(f),
			AocError::Solver(e) => e.fmt(f),
			AocError::Reader(e) => e.fmt(f),
		}
	}
}

impl std::error::Error for AocError {
	fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
		match *self {
			AocError::Solution(ref e) => Some(e),
			AocError::Solver(ref e) => Some(e),
			AocError::Reader(ref e) => Some(e),
		}
	}
}

impl From<SolverError> for AocError {
	fn from(e: SolverError) -> Self {
		AocError::Solver(e)
	}
}

impl From<SolutionError> for AocError {
	fn from(e: SolutionError) -> Self {
		AocError::Solution(e)
	}
}

impl From<ReaderError> for AocError {
	fn from(e: ReaderError) -> Self {
		AocError::Reader(e)
	}
}

#[derive(Debug)]
pub struct SolutionError {
	details: String,
}

#[derive(Debug)]
pub struct SolverError {
	details: String,
}

#[derive(Debug)]
pub struct ReaderError {
	details: String,
}

impl SolverError {
	pub fn new(msg: &str) -> SolverError {
		SolverError {
			details: msg.to_string(),
		}
	}
}

impl fmt::Display for SolverError {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "{}", self.details)
	}
}

impl Error for SolverError {
	fn description(&self) -> &str {
		&self.details
	}
}

impl SolutionError {
	pub fn new(msg: &str) -> SolutionError {
		SolutionError {
			details: msg.to_string(),
		}
	}
}

impl fmt::Display for SolutionError {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "{}", self.details)
	}
}

impl Error for SolutionError {
	fn description(&self) -> &str {
		&self.details
	}
}

impl ReaderError {
	pub fn new(msg: &str) -> ReaderError {
		ReaderError {
			details: msg.to_string(),
		}
	}
}

impl fmt::Display for ReaderError {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "{}", self.details)
	}
}

impl Error for ReaderError {
	fn description(&self) -> &str {
		&self.details
	}
}

impl std::convert::From<fancy_regex::Error> for SolutionError {
	fn from(_err: fancy_regex::Error) -> Self {
		SolutionError::new("Regex Error")
	}
}

impl std::convert::From<&str> for SolutionError {
	fn from(err: &str) -> Self {
		SolutionError::new(err)
	}
}

impl std::convert::From<std::io::Error> for AocError {
	fn from(err: std::io::Error) -> Self {
		ReaderError::new(err.description()).into()
	}
}

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
	Ok(env::current_exe()?.join(PathBuf::from(format!(
		"{back}src/{year}/day{day:02}/resources/{resource}",
		year = year,
		day = day,
		resource = resource,
		back = "../".repeat(depth_in_target + 1)
	))))
}
