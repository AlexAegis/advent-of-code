use aoclib::model::coord::Coord;
use aoclib::model::coord::Direction;
use std::collections::HashSet;
use std::convert::TryFrom;

pub struct PartOne;
pub struct PartTwo;

impl aoclib::Solvable<&str, usize> for PartOne {
	fn solve(input: &str) -> aoclib::Solution<usize> {
		let mut set = HashSet::<Coord<i8>>::new();
		let mut pos = Coord::new(0, 0);
		for d in input.chars().filter_map(|c| Direction::try_from(c).ok()) {
			pos += d.value();
			set.insert(pos);
		}
		Ok(set.len())
	}
}

impl aoclib::Solvable<&str, usize> for PartTwo {
	fn solve(input: &str) -> aoclib::Solution<usize> {
		let mut set = HashSet::<Coord<i32>>::new();
		let mut s_pos = Coord::new(0, 0);
		let mut r_pos = Coord::new(0, 0);
		let mut is_r = true;
		for d in input.chars().filter_map(|c| Direction::try_from(c).ok()) {
			let pos = if is_r { &mut r_pos } else { &mut s_pos };
			*pos += d.value();
			is_r = !is_r;
			set.insert(*pos);
		}
		Ok(set.len())
	}
}

// For some reason these solutions are slower by ~30%
/*
impl aoclib::Solvable<&str, usize> for PartOne {
	fn solve(input: &str) -> aoclib::Solution<usize> {
		Ok(input
			.chars()
			.filter_map(|c| Direction::try_from(c).ok())
			.fold(
				(HashSet::<Coord<i8>>::new(), Coord::new(0, 0)),
				|mut acc, d| {
					acc.1 += d.value();
					acc.0.insert(acc.1);
					acc
				},
			)
			.0
			.len())
	}
}

impl aoclib::Solvable<&str, usize> for PartTwo {
	fn solve(input: &str) -> aoclib::Solution<usize> {
		Ok(input
			.chars()
			.filter_map(|c| Direction::try_from(c).ok())
			.fold(
				(
					HashSet::<Coord<i32>>::new(),
					Coord::new(0, 0),
					Coord::new(0, 0),
					true,
				),
				|mut acc, d| {
					if acc.3 {
						acc.2 += d.value();
					} else {
						acc.1 += d.value();
					}
					acc.3 = !acc.3;
					acc.0.insert(if acc.3 { acc.2 } else { acc.1 });
					acc
				},
			)
			.0
			.len())
	}
}
*/
