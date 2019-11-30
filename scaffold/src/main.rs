use aoc_query::{args, query};
use serde_json;
use std::env;

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
	let (year, day) = args::args()?;
	let session = env::var("SESSION").expect("Set the SESSION environmental variable. Log into AoC and then get it from a request, it's in the Cookie header");
	let result = query(year, day, session).await?;
	println!("scaffold: {}", serde_json::to_string_pretty(&result)?);
	Ok(())
}
