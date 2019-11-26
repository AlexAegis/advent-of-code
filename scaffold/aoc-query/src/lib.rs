mod parser;

use clap::{App, Arg};
use reqwest::header::*;
use reqwest::RedirectPolicy;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AocQueryResult {
	year: i16,
	day: i8,
	description: String,
	input: String,
}

pub async fn query(
	year: i16,
	day: i8,
	session: String,
) -> Result<AocQueryResult, Box<dyn std::error::Error>> {
	println!("Querying for: year {:?} day {:?}", year, day);
	let client = reqwest::ClientBuilder::new()
		.cookie_store(true)
		.redirect(RedirectPolicy::limited(10))
		.build()?;
	let description_url = format!("https://adventofcode.com/{}/day/{}", year, day);
	let input_url = description_url.clone() + "/input";

	println!("Fetching description description from {}", description_url);

	let description_response = client
		.get(&description_url)
		.header(COOKIE, format!("session={}", session))
		.send()
		.await?;

	let description_content = match description_response.status() {
		reqwest::StatusCode::OK => {
			parser::transform(&description_response.text().await?, year, day)
		}
		_ => String::new(),
	};

	println!("Fetching input from {}", description_url);

	let input_response = client
		.get(&input_url)
		.header(COOKIE, format!("session={}", session))
		.send()
		.await?;
	let input_content = match input_response.status() {
		reqwest::StatusCode::OK => input_response.text().await?,
		_ => String::new(),
	};

	Ok(AocQueryResult {
		year,
		day,
		description: description_content,
		input: input_content,
	})
}

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
