use aoc_query::{args, query};
use cpt::cpt;
use std::{collections::HashMap, env};

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
	let (year, day) = args::args()?;
	let session = env::var("SESSION").expect("Set the SESSION environmental variable. Log into AoC and then get it from a request, it's in the Cookie header");
	let result = query(year, day, session).await?;
	println!("scaffold: {}", serde_json::to_string_pretty(&result)?);

	let mut data = HashMap::<String, String>::new();
	data.insert("year".to_string(), year.to_string());
	data.insert(
		"short_year".to_string(),
		year.to_string()
			.chars()
			.rev()
			.take(2)
			.collect::<String>()
			.chars()
			.rev()
			.collect::<String>(),
	);
	data.insert("short_day".to_string(), day.to_string());
	data.insert("day".to_string(), format!("{:0>2}", day));
	data.insert("input".to_string(), result.input);
	data.insert("description".to_string(), result.description);
	cpt(
		"./templates/solution".to_string(),
		"./src/".to_string(),
		data,
	)
}
