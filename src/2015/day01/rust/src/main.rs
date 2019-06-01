use aoc150101::{get_input, runner};

extern crate aoc;


pub fn main() {
	let result = aoc::bench::<String, i32>(|| get_input(Option::None), runner);

	println!("Result: {:?}", result); // 74
}
