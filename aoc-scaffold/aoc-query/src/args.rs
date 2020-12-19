use chrono::{Datelike, Utc};
use clap::{App, Arg};

pub fn args() -> Result<(i16, i8), Box<dyn std::error::Error>> {
	let current_year = Utc::now().year();
	let current_day = Utc::now().day();
	let active_event = Utc::now().month() == 12 && current_day <= 25;
	let active_event_srt = active_event.to_string();

	let m = App::new("aoc-query")
		.version("1.0.0")
		.about("Returns your input and description description as a JSON!")
		.author("AlexAegis")
		.arg(
			Arg::with_name("year")
				.short("y")
				.long("year")
				.default_value_if("active", Some("true"), &current_year.to_string())
				.required(true)
				.index(1)
				.validator(move |s| match s.parse::<u16>() {
					Ok(year) => {
						if year >= 2015 && year as i32 <= current_year {
							Ok(())
						} else {
							Err("Non-existent event".to_string())
						}
					}
					Err(_e) => Err("Has to be a number".to_string()),
				})
				.help("Provides a year for the description"),
		)
		.arg(
			Arg::with_name("day")
				.short("d")
				.long("day")
				.default_value_if("active", Some("true"), &current_day.to_string())
				.required(true)
				.index(2)
				.validator(|s| match s.parse::<u8>() {
					Ok(day) => {
						if day >= 1 && day <= 25 {
							Ok(())
						} else {
							Err("Non-existent day".to_string())
						}
					}
					Err(_e) => Err("Has to be a number".to_string()),
				})
				.help("Provides a year for the description"),
		)
		.arg(
			Arg::with_name("session")
				.short("s")
				.long("session")
				.index(3),
		)
		.arg(
			Arg::with_name("active")
				.short("-a")
				.long("--active")
				.default_value(&active_event_srt)
				.help("Is the event still ongoing?"),
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
