use clap::{App, Arg};

use std::fs;
// use std::task;
use std::convert::From;
// use std::future::Future;
use std::path::Path;
use std::string::String;

#[derive(Debug)]
pub struct ParserError {
	pub message: String,
}

impl From<std::ffi::OsString> for ParserError {
	fn from(_: std::ffi::OsString) -> ParserError {
		ParserError {
			message: "Invalid data type".to_string(),
		}
	}
}

impl From<std::num::ParseIntError> for ParserError {
	fn from(_: std::num::ParseIntError) -> ParserError {
		ParserError {
			message: "Invalid data type".to_string(),
		}
	}
}

pub fn main() -> Result<(), ParserError> {
	println!("Scaffold!");

	let m = App::new("myapp")
		.version("1.0")
		.about("Does great things!")
		.author("Kevin K.")
		.arg(
			Arg::with_name("year")
				.short("y")
				.long("year")
				.index(1)
				.validator(|s| match s.parse::<i16>() {
					Ok(_o) => Ok(()),
					Err(_e) => Err("Has to be a number".to_string()),
				})
				.help("Provides a year for the task"),
		)
		.arg(
			Arg::with_name("day")
				.short("d")
				.long("day")
				.index(2)
				.validator(|s| match s.parse::<i8>() {
					Ok(_o) => Ok(()),
					Err(_e) => Err("Has to be a number".to_string()),
				})
				.help("Provides a year for the task"),
		)
		.arg(
			Arg::with_name("workspace")
				.short("-w")
				.long("--workspace")
				.takes_value(true)
				.help("VS Code Debug argument"),
		)
		.get_matches();

	let year = m.args["year"]
		.vals
		.first()
		.unwrap()
		.to_str()
		.unwrap()
		.parse::<i16>()?;
	let day = m.args["day"]
		.vals
		.first()
		.unwrap()
		.to_str()
		.unwrap()
		.parse::<i8>()?;

	let is_src_dir = Path::new("./src/").is_dir();
	println!("isSrcDir {}", is_src_dir);
	let p = match fs::create_dir("./srcd") {
		Ok(_o) => Ok(()),
		Err(_e) => Err("Already exists".to_string()),
	};

	println!("Hello, world! {:?}", p);

	println!("Args: year {:?} day {:?}", year, day);
	Ok(())
}
