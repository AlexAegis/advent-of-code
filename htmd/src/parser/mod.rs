use ego_tree::NodeRef;
use scraper::Node;
use scraper::{Html, Selector};

#[derive(Debug)]
pub struct Wrapper<'a> {
	prefix: &'a str,
	suffix: &'a str,
}

impl<'a> Wrapper<'a> {
	fn new(name: &str) -> Self {
		match name {
			"article" => Wrapper {
				prefix: "",
				suffix: "",
			},
			"em" => Wrapper {
				prefix: "**",
				suffix: "**",
			},
			"p" => Wrapper {
				prefix: "",
				suffix: "\n",
			},
			"li" => Wrapper {
				prefix: "- ",
				suffix: "",
			},
			"code" => Wrapper {
				prefix: "`",
				suffix: "`",
			},
			"h2" => Wrapper {
				prefix: "# [",
				suffix: "]",
			},
			_ => Wrapper::default(),
		}
	}
}

impl<'a> Default for Wrapper<'a> {
	fn default() -> Self {
		Wrapper {
			prefix: "",
			suffix: "",
		}
	}
}

pub fn transform(html: &str, year: i16, day: i8) -> String {
	let fragment = Html::parse_document(&html);
	let selector = Selector::parse("main").unwrap();

	let main = fragment.select(&selector).next().unwrap();
	let mut day = Day {
		current_task: 0,
		year,
		day,
	};

	main.children().map(|d| day.process(&d)).collect()
}

pub struct Day {
	current_task: i8,
	year: i32,
	day: i16,
}

pub trait Processable {
	fn process(&mut self, nr: &NodeRef<'_, scraper::node::Node>) -> String;
}

impl Processable for Day {
	fn process(&mut self, nr: &NodeRef<'_, scraper::node::Node>) -> String {
		let n: &Node = nr.value();
		if let Some(t) = n.as_text() {
			return t.chars().collect();
		}
		if let Some(t) = n.as_element() {
			let wrapper = Wrapper::new(t.name());
			let mut s = wrapper.prefix.to_owned();
			for a in nr.children() {
				s += &self.process(&a);
			}
			s += wrapper.suffix;
			if t.name() == "h2" {
				self.current_task += 1;
				s = s.replace("--- ", "");
				s = s.replace(" ---", "");
				s += "(https://adventofcode.com/";
				s += &self.year.to_string();
				s += "/day/";
				s += &self.day.to_string();
				s += ")\n\n";
				if self.current_task == 1 {
					s += "## [Part One](./part_one.ts)\n\n";
				} else if self.current_task == 2 {
					s += "## [Part Two](./part_two.ts)\n\n";
				}
			}

			return s;
		}

		"".to_string()
	}
}
