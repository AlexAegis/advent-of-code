mod errors;
mod parser;

use clap::{App, Arg};

use async_std::fs::{DirBuilder, File};
use async_std::prelude::*;
use reqwest::header::*;
use reqwest::RedirectPolicy;
use std::env;

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
	let (year, day) = bootstrap()?;
	println!("Scaffold!: year {:?} day {:?}", year, day);

	let client = reqwest::ClientBuilder::new()
		.cookie_store(true)
		.redirect(RedirectPolicy::limited(10))
		.build()?;
	let task_dir = format!("./src/{}/day{:0>2}", year, day);
	let resources_dir = task_dir.clone() + "/resources";
	let link = format!("https://adventofcode.com/{}/day/{}", year, day);
	let input_url = link.clone() + "/input";

	println!("Creating directories: {}", task_dir);
	DirBuilder::new().recursive(true).create(&task_dir).await?;
	DirBuilder::new()
		.recursive(true)
		.create(&resources_dir)
		.await?;

	println!("Fetching task description from {}", link);

	let session = env::var("SESSION").expect("Set the SESSION environmental variable. Log into AoC and then get it from a request, it's in the Cookie header");

	let task_response = client
		.get(&link)
		.header(COOKIE, format!("session={}", session))
		.send()
		.await?;

	let readme_content = match task_response.status() {
		reqwest::StatusCode::OK => parser::transform(&task_response.text().await?, year, day),
		_ => String::new(),
	};

	let input_response = client
		.get(&input_url)
		.header(COOKIE, format!("session={}", session))
		.send()
		.await?;

	let input_content = match input_response.status() {
		reqwest::StatusCode::OK => input_response.text().await?,
		_ => String::new(),
	};

	// println!("readme_content {:?}", &readme_content);

	println!("Creating readme.md");
	let mut readme_file = File::create(task_dir + "/readme.md").await?;
	readme_file.write_all(readme_content.as_bytes()).await?;
	readme_file.sync_all().await?;
	println!("Creating input.txt");
	let mut input_file = File::create(resources_dir + "/input.txt").await?;
	input_file.write_all(input_content.as_bytes()).await?;
	input_file.sync_all().await?;
	println!("link: {}", link);

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
