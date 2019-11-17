mod errors;

use clap::{App, Arg};

use async_std::fs::{DirBuilder, File};
use async_std::prelude::*;
use htmd::parser;

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
	let (year, day) = bootstrap()?;
	println!("Scaffold!: year {:?} day {:?}", year, day);

	let client = reqwest::Client::new();
	let dir = format!("./src/{}/day{:0>2}", year, day);
	let link = format!("https://adventofcode.com/{}/day/{}", year, day);
	let input_url = link.clone() + "/input";

	println!("Creating directories: {}", dir);
	DirBuilder::new().recursive(true).create(&dir).await?;

	println!("Fetching task description from {}", link);

	let task_response = client.get(&link).send().await?;
	let readme_content = match task_response.status() {
		reqwest::StatusCode::OK => {
			println!("Status 200");
			let html = task_response.text().await?;

			parser::transform(&html, year, day)
		}
		i => {
			println!("Status other {}", i);
			"Not found".to_string()
		}
	};

	// println!("readme_content {:?}", &readme_content);

	println!("Creating readme.md");
	let mut readme = File::create(dir + "/readme.md").await?;
	readme.write_all(readme_content.as_bytes()).await?;
	readme.sync_all().await?;

	println!("link: {}", link);
	/*
	let res = ?;
	println!("Status: {}", res.status());
	let body = res.text().await?;
	let fragment = Html::parse_fragment(html);
	let selector = Selector::parse("li").unwrap();*/
	/*
	for element in fragment.select(&selector) {
		assert_eq!("li", element.value().name());
	}

	println!("Body:\n\n{}", body);*/

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
