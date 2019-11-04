use scraper::node::Element;
use scraper::node::Text;
use scraper::Node;
use scraper::{Html, Selector};

pub trait Markdownable {
	fn into_markdown(&self) -> &str;
}

impl Markdownable for Element {
	fn into_markdown(&self) -> &str {
		"Node Element Into Mark"
	}
}

impl Markdownable for Markdownables {
	fn into_markdown(&self) -> &'static str {
		match self {
			Markdownables::Article(e) => "ARTICLE",
			Markdownables::Text(t) => "TEXT", // &(t.to_string().clone()),
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

	// for d in main.descendants() {
	// 	println!("Node {:?}", d.value());
	// }

	for d in main.children() {
		println!("Node {:?}", d.value());

		let n: &Node = d.value();
		if let Some(t) = n.as_text() {
			println!(
				"TEXT {:?}",
				Markdownables::Text(t.to_owned()).into_markdown()
			)
		}
		if let Some(t) = n.as_element() {
			println!("Name {:?}", t.name())
		}
	}
	println!("transform");
	"Ret".to_string()
}
