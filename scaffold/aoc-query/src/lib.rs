pub mod args;
pub mod parser;

use reqwest::header::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct AocQueryResult {
	pub year: i16,
	pub day: i8,
	pub description: String,
	pub input: String,
}

pub async fn query(
	year: i16,
	day: i8,
	session: String,
) -> Result<AocQueryResult, Box<dyn std::error::Error>> {
	println!("Querying for: year {:?} day {:?}", year, day);
	let client = reqwest::ClientBuilder::new().cookie_store(true).build()?;
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
