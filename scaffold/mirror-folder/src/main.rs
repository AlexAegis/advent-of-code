use mirror_folder::args;

use mirror_folder::cpt;

#[tokio::main]
pub async fn main() -> Result<(), Box<dyn std::error::Error>> {
	let (from, to) = args()?;
	println!("from {} to {}", from, to);
	let mut data = std::collections::HashMap::<String, String>::new();
	data.insert("world".to_string(), "sike".to_string());
	cpt(from, to, Some(&data)).await?;
	Ok(())
}
