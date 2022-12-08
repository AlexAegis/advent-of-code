pub struct PartOne;
pub struct PartTwo;

use aoclib::model;

impl aoclib::Solvable<&str, i16> for PartOne {
	fn solve(input: &str) -> aoclib::Solution<i16> {
		let _vec = input.split(", ");

		// println!("{:?}", _vec);
		// model::Coord::<i32>::zero(); ???
		let origo = model::Coord::<i16> { x: 0, y: 0 };
		let mut pos = model::Coord::<i16> { x: 0, y: 0 };
		let mut dir = model::coord::north::<i16>();

		for val in _vec {
			let (rot, scale) = val.split_at(1);
			if rot == "R" {
				dir = dir.rotate_right();
			} else if rot == "L" {
				dir = dir.rotate_left();
			}

			// model::coord::north::<i16>().step(model::Coord::<i16> { x: 0, y: 0 }, 2i16);

			pos += dir * scale.parse::<i16>().unwrap();

			println!(
				"dir: {:?}, pos: {:?}, manthattan: {}",
				dir,
				pos,
				pos.manhattan(origo)
			);
		}
		//
		//let c1 = model::Coord::<i16> { x: 1i16, y: 2i16 };
		//let c2 = model::Coord::<i16> { x: 3i16, y: 1i16 };
		//let c3 = "12,10".parse::<model::Coord<i16>>().unwrap();
		//
		//println!("c1: {:?}", c1);
		//println!("c2: {:?}", c2);
		//println!("c3: {:?}", c3);
		//println!("c1 + c2: {:?}", c1 + c2);
		//
		let n = -4i16;
		Ok(n)
	}
}

impl aoclib::Solvable<&str, i16> for PartTwo {
	fn solve(input: &str) -> aoclib::Solution<i16> {
		let mut a = 0;
		let mut i = 0;
		for c in input.chars().filter(|a| *a == '(' || *a == ')') {
			a += if c == '(' { 1 } else { -1 };
			i += 1;
			if a < 0 {
				break;
			}
		}
		Ok(i)
	}
}
