mod errors;
/*
use std::{
	fmt::{self, Debug, Display},
	process::{ExitCode, Termination},
};*/

use clap::{App, Arg};

use std::fs;
use std::path::Path;

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
	println!("Scaffold!");
	let (year, day) = bootstrap()?;

	let is_src_dir = Path::new("./src/").is_dir();
	println!("isSrcDir {}", is_src_dir);
	let p = match fs::create_dir("./srcd") {
		Ok(_o) => Ok(()),
		Err(_e) => Err("Already exists".to_string()),
	};

	println!("Hello, world! {:?}", p);

	let link = format!("https://adventofcode.com/{}/day/{}", year, day);

	println!("link: {}", link);

	let res = reqwest::Client::new().get(&link).send().await?;

	println!("Status: {}", res.status());

	let body = res.text().await?;

	// println!("Body:\n\n{}", body);

	println!("Args: year {:?} day {:?}", year, day);
	Ok(())
}

fn bootstrap() -> Result<(i16, i8), Box<dyn std::error::Error>> {
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

	Ok((year, day))
}
