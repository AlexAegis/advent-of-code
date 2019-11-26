use async_std::fs;
use async_std::fs::{DirBuilder, File};
use async_std::prelude::*;
use clap::{App, Arg};
use handlebars::Handlebars;
use serde::Serialize;
use std::cmp::Eq;
use std::collections::HashMap;
use std::hash::BuildHasher;
use std::hash::Hash;
use std::path::Path;
use std::path::PathBuf;
use walkdir::WalkDir;

pub async fn cp(from: String, to: String) -> Result<(), Box<dyn std::error::Error>> {
	cpt::<String, String, std::collections::hash_map::RandomState>(from, to, None).await
}
/// Copy with templates
pub async fn cpt<K: Hash + Serialize + Eq, V: Serialize, S: BuildHasher>(
	from: String,
	to: String,
	data: Option<&HashMap<K, V, S>>,
) -> Result<(), Box<dyn std::error::Error>> {
	let to_path = Path::new(&to);
	let hb = Handlebars::new();
	for entry in WalkDir::new(from)
		.into_iter()
		.skip(1) // Skip the root folder
		.filter_map(|e| e.ok())
	{
		let truncated_target = PathBuf::from(entry.path())
			.components()
			.skip_while(|c| c.as_os_str() == ".")
			.skip(1)
			.collect::<PathBuf>();

		let mut target = to_path.join(&truncated_target);
		if entry.path().is_dir() && !target.exists() {
			DirBuilder::new().recursive(true).create(&target).await?;
		} else if entry.path().is_file() && !target.exists() {
			let mut content = fs::read_to_string(entry.path()).await?;
			if let Some(map) = data {
				if let Some(e) = target.extension() {
					// Use only tpl files as templates
					if e.to_str().ok_or("Error")? == "tpl" {
						target.set_extension(""); // And strip the extension
						content = hb.render_template(&content, &map)?;
					}
				}
			}
			let mut file = File::create(target).await?;
			file.write_all(content.as_bytes()).await?;
			file.sync_all().await?;
		}
	}
	Ok(())
}

pub fn args() -> Result<(String, String), Box<dyn std::error::Error>> {
	let m = App::new("mirror-folder")
		.version("1.0.0")
		.about("Copies one folder structure to another place with files. Also formats templates!")
		.author("AlexAegis")
		.arg(
			Arg::with_name("from")
				.short("f")
				.long("from")
				.required(true)
				.index(1)
				.validator(|s| {
					if Path::new(&s).exists() {
						Ok(())
					} else {
						Err("Source folder not exists".to_string())
					}
				})
				.help("The folder that will be copied"),
		)
		.arg(
			Arg::with_name("to")
				.short("t")
				.long("to")
				.required(true)
				.index(2)
				.help("The folder where the folder will be placed"),
		)
		.get_matches();

	let from = m.args["from"]
		.vals
		.first()
		.ok_or("No from specified")?
		.to_str()
		.ok_or("Invalid string")?;
	let to = m.args["to"]
		.vals
		.first()
		.ok_or("No to specified")?
		.to_str()
		.ok_or("Invalid string")?;

	Ok((from.to_string(), to.to_string()))
}
