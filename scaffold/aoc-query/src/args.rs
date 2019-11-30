use clap::{App, Arg};

pub fn args() -> Result<(i16, i8), Box<dyn std::error::Error>> {
	let m = App::new("aoc-query")
		.version("1.0.0")
		.about("Returns your input and description description as a JSON!")
		.author("AlexAegis")
		.arg(
			Arg::with_name("year")
				.short("y")
				.long("year")
				.required(true)
				.index(1)
				.validator(|s| match s.parse::<i16>() {
					Ok(_o) => Ok(()),
					Err(_e) => Err("Has to be a number".to_string()),
				})
				.help("Provides a year for the description"),
		)
		.arg(
			Arg::with_name("day")
				.short("d")
				.long("day")
				.required(true)
				.index(2)
				.validator(|s| match s.parse::<i8>() {
					Ok(_o) => Ok(()),
					Err(_e) => Err("Has to be a number".to_string()),
				})
				.help("Provides a year for the description"),
		)
		.arg(
			Arg::with_name("session")
				.short("s")
				.long("session")
				.index(3)
				.help("Provides a session for the description"),
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
		.ok_or("No year specified")?
		.to_str()
		.ok_or("Year not valid")?
		.parse::<i16>()?;
	let day = m.args["day"]
		.vals
		.first()
		.ok_or("No day specified")?
		.to_str()
		.ok_or("Year not valid")?
		.parse::<i8>()?;

	Ok((year, day))
}
