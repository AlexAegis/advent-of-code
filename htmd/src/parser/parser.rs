use scraper::node::Element;
use scraper::node::Text;
use scraper::Node;
use scraper::{Html, Selector};

pub trait Markdownable {
	fn into_markdown(&self) -> String;
}

impl Markdownable for Element {
	fn into_markdown(&self) -> String {
		"Node Element Into Mark".to_string()
	}
}

impl Markdownable for Markdownables {
	fn into_markdown(&self) -> String {
		match self {
			Markdownables::Article(e) => "ARTICLE".to_string(),
			Markdownables::Text(t) => t.to_string(), // &(t.to_string().clone()),
		}
	}
}

pub enum Markdownables {
	Article(Element),
	Text(Text),
}

pub fn transform(html: &str) -> String {
	let fragment = Html::parse_document(&html);
	let selector = Selector::parse("main").unwrap();

	let main = fragment.select(&selector).next().unwrap();

	// for d in main.descendants() { // children
	// 	println!("Node {:?}", d.value());
	// }

	for d in main.descendants() {
		println!("Node {:?}", d.value());

		let n: &Node = d.value();
		if let Some(t) = n.as_text() {
			println!(
				"TEXT {:?}",
				Markdownables::Text(t.to_owned()).into_markdown()
			)
		}
		if let Some(t) = n.as_element() {
			let match_res = match t.name() {
				"code" => "ITS A CODE",
				_ => "not a code",
			};
			println!("dsfd {:?}", match_res);
			println!("Name {:?}", t.name());
		}
	}
	println!("transform");
	"Ret".to_string()
}
