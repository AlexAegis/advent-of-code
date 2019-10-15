pub struct PartOne;
pub struct PartTwo;

use aoclib::model;

impl aoc::Solvable<String, i16> for PartOne {
	fn solve(input: &String) -> i16 {
		println!("LOL");
		let _vec = input.split(", ");

		// println!("{:?}", _vec);

		for val in _vec {
			println!("Got: {}", val);
		}

		let c1 = model::Coord::<i16> { x: 1i16, y: 2i16 };
		let c2 = model::Coord::<i16> { x: 3i16, y: 1i16 };
		let c3 = "12,10".parse::<model::Coord<i16>>().unwrap();

		let dirNorth = model::direction::north::<i16>();
		println!("dirNorthR: {:?}", dirNorth.right());

		println!("c1: {:?}", c1);
		println!("c2: {:?}", c2);
		println!("c3: {:?}", c3);
		println!("c1 + c2: {:?}", c1 + c2);

		let n = -4i16;
		n
	}
}

impl aoc::Solvable<String, i16> for PartTwo {
	fn solve(input: &String) -> i16 {
		let mut a = 0;
		let mut i = 0;
		for c in input.chars().filter(|a| *a == '(' || *a == ')') {
			a += if c == '(' { 1 } else { -1 };
			i += 1;
			if a < 0 {
				break;
			}
		}
		i
	}
}
