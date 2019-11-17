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

	println!("Creating readme.md");
	let mut readme_file = File::create(task_dir.clone() + "/readme.md").await?;
	readme_file.write_all(readme_content.as_bytes()).await?;
	readme_file.sync_all().await?;
	println!("Creating input.txt");
	let mut input_file = File::create(resources_dir.clone() + "/input.txt").await?;
	input_file.write_all(input_content.as_bytes()).await?;
	input_file.sync_all().await?;

	// TODO: Multiple example files
	println!("Creating empty example.txt");
	let _example_file = File::create(resources_dir + "/example.txt").await?;

	println!("Creating Rust solution folder");
	let rust_dir = task_dir.clone() + "/rust";
	let rust_benches_dir = rust_dir.clone() + "/benches";
	let rust_src_dir = rust_dir.clone() + "/src";
	let rust_tests_dir = rust_dir.clone() + "/tests";
	DirBuilder::new()
		.recursive(true)
		.create(&rust_benches_dir)
		.await?;

	let mut rust_bench_file = File::create(rust_benches_dir + "/bench.rs").await?;
	rust_bench_file
		.write_all(rust_bench_file_content(year, day).as_bytes())
		.await?;
	rust_bench_file.sync_all().await?;

	DirBuilder::new()
		.recursive(true)
		.create(&rust_src_dir)
		.await?;

	let mut rust_lib_file = File::create(rust_src_dir.clone() + "/lib.rs").await?;
	rust_lib_file
		.write_all(rust_lib_content().as_bytes())
		.await?;
	rust_lib_file.sync_all().await?;

	let mut rust_main_file = File::create(rust_src_dir + "/main.rs").await?;
	rust_main_file
		.write_all(rust_main_content(year, day).as_bytes())
		.await?;
	rust_main_file.sync_all().await?;

	DirBuilder::new()
		.recursive(true)
		.create(&rust_tests_dir)
		.await?;
	let mut rust_part_one_test_file = File::create(rust_tests_dir.clone() + "/part_one.rs").await?;
	rust_part_one_test_file
		.write_all(rust_test_content(year, day, 1).as_bytes())
		.await?;
	rust_part_one_test_file.sync_all().await?;

	let mut rust_part_two_test_file = File::create(rust_tests_dir + "/part_two.rs").await?;
	rust_part_two_test_file
		.write_all(rust_test_content(year, day, 2).as_bytes())
		.await?;
	rust_part_two_test_file.sync_all().await?;

	println!("Creating TypeScript solution folder");
	let typescript_dir = task_dir.clone() + "/typescript";
	let typescript_tests_dir = typescript_dir.clone() + "/tests";
	DirBuilder::new()
		.recursive(true)
		.create(&typescript_tests_dir)
		.await?;

	let mut typescript_index_file = File::create(typescript_dir.clone() + "/index.ts").await?;
	typescript_index_file
		.write_all(typescript_index_file_content(year, day).as_bytes())
		.await?;
	typescript_index_file.sync_all().await?;

	let mut typescript_solution_one_file =
		File::create(typescript_dir.clone() + "/part_one.ts").await?;
	typescript_solution_one_file
		.write_all(typescript_solution_file_content().as_bytes())
		.await?;
	typescript_solution_one_file.sync_all().await?;

	let mut typescript_solution_two_file =
		File::create(typescript_dir.clone() + "/part_two.ts").await?;
	typescript_solution_two_file
		.write_all(typescript_solution_file_content().as_bytes())
		.await?;
	typescript_solution_two_file.sync_all().await?;

	let mut typescript_test_one_file =
		File::create(typescript_tests_dir.clone() + "/part_one.spec.ts").await?;
	typescript_test_one_file
		.write_all(typescript_test_content(1).as_bytes())
		.await?;
	typescript_test_one_file.sync_all().await?;

	let mut typescript_test_two_file =
		File::create(typescript_tests_dir.clone() + "/part_two.spec.ts").await?;
	typescript_test_two_file
		.write_all(typescript_test_content(2).as_bytes())
		.await?;
	typescript_test_two_file.sync_all().await?;

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

fn rust_bench_file_content(year: i16, day: i8) -> String {
	format!(
		"#[macro_use]

extern crate criterion;

extern crate aoc;
extern crate aoc{short_year}{day:0>2};

use aoc::Solvable;
use criterion::Criterion;

fn part_one_benchmark(c: &mut Criterion) {{
	c.bench_function(\"{year} day {day} part one\", |b| {{
		let input = aoc::reader({year}, {day}, \"input.txt\");
		b.iter(|| aoc{short_year}{day:0>2}::PartOne::solve(&input))
	}});
}}

fn part_two_benchmark(c: &mut Criterion) {{
	c.bench_function(\"{year} day {day} part two\", |b| {{
		let input = aoc::reader({year}, {day}, \"input.txt\");
		b.iter(|| aoc{short_year}{day:0>2}::PartTwo::solve(&input))
	}});
}}

criterion_group!(benches, part_one_benchmark, part_two_benchmark);
criterion_main!(benches);
",
		year = year.to_string(),
		short_year = year
			.to_string()
			.chars()
			.rev()
			.take(2)
			.collect::<String>()
			.chars()
			.rev()
			.collect::<String>(),
		day = day.to_string()
	)
}

fn rust_main_content(year: i16, day: i8) -> String {
	format!(
		"extern crate aoc;

use aoc::Solvable;
use aoc{short_year}{day:0>2}::{{ PartOne, PartTwo }};

pub fn main() {{
	let input = aoc::reader({year}, {day}, \"input.txt\");
	let result_part_one = PartOne::solve(&input); // 0, ~0 us
	let result_part_two = PartTwo::solve(&input); // 0, ~0 us

	println!(
		\"Results for {year} Day {day}:\\n\\tPart One: {{:?}}\\n\\tPart Two: {{:?}}\",
		result_part_one, result_part_two
	);
}}
",
		year = year.to_string(),
		short_year = year
			.to_string()
			.chars()
			.rev()
			.take(2)
			.collect::<String>()
			.chars()
			.rev()
			.collect::<String>(),
		day = day.to_string()
	)
}

fn rust_lib_content() -> String {
	"pub struct PartOne;
pub struct PartTwo;

impl aoc::Solvable<String, i32> for PartOne {
	fn solve(input: &String) -> i32 {
		0
	}
}

impl aoc::Solvable<String, i32> for PartTwo {
	fn solve(input: &String) -> i32 {
		0
	}
}
"
	.to_string()
}

fn rust_test_content(year: i16, day: i8, part: i8) -> String {
	format!(
		"use aoc::Solvable;

#[test]
fn input() {{
	let input = aoc::reader({year}, {day}, \"input.txt\");
	assert_eq!(aoc{short_year}{day:0>2}::{part}::solve(&input), 0);
}}

#[test]
fn example() {{
	let input = aoc::reader({year}, {day}, \"example.txt\");
	assert_eq!(aoc{short_year}{day:0>2}::{part}::solve(&input), 0);
}}
",
		year = year.to_string(),
		short_year = year
			.to_string()
			.chars()
			.rev()
			.take(2)
			.collect::<String>()
			.chars()
			.rev()
			.collect::<String>(),
		day = day.to_string(),
		part = if part == 1 { "PartOne" } else { "PartTwo" }
	)
}

fn typescript_index_file_content(year: i16, day: i8) -> String {
	format!(
		"import {{ DayResults }} from '@root';

export const year = {year};
export const day = {day};

export const results: DayResults = {{
	one: {{
		input: 0,
		example: 0
	}},
	two: {{
		input: 0,
		example: 0
	}}
}};
",
		year = year.to_string(),
		day = day.to_string()
	)
}

fn typescript_solution_file_content() -> String {
	"import { bench, read } from '@root';
import { day, year } from '.';

export const runner = (input: string): number => {
	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
"
	.to_string()
}

fn typescript_test_content(part: i8) -> String {
	format!(
		"import {{ read }} from '@root';
import {{ expect }} from 'chai';
import {{ day, results, year }} from '..';
import {{ runner }} from '../{part_filename}';

describe(`${{year}} - Day ${{day}} - Part {part_capital}`, () => {{
	it(`should resolve to ${{results.{part_lowercase}.input}} when using the input`, async () => {{
		expect(await runner((await read(year, day)()).input)).to.equal(results.{part_lowercase}.input);
	}});

	it(`should resolve to ${{results.{part_lowercase}.example}} when using the example`, async () => {{
		expect(await runner((await read(year, day, 'example.txt')()).input)).to.equal(results.{part_lowercase}.example);
	}});
}});
",
		part_capital = if part == 1 { "One" } else { "Two" },
		part_filename = if part == 1 { "part_one" } else { "part_two" },
		part_lowercase = if part == 1 { "one" } else { "two" },
	)
}
