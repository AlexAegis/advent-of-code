use aoclib::model::coord::Coord;
use aoclib::model::coord::Direction;
use std::collections::HashSet;
use std::convert::TryFrom;

pub struct PartOne;
pub struct PartTwo;

impl aoc::Solvable<&str, usize> for PartOne {
	fn solve(input: &str) -> aoc::Solution<usize> {
		let mut set = HashSet::<Coord<i8>>::new();
		input
			.chars()
			.filter_map(|c| Direction::try_from(c).ok())
			.fold(Coord::new(0, 0), |mut acc, d| {
				acc += d.value();
				set.insert(acc);
				acc
			});
		Ok(set.len())
	}
}

impl aoc::Solvable<&str, usize> for PartTwo {
	fn solve(input: &str) -> aoc::Solution<usize> {
		let mut set = HashSet::<Coord<i32>>::new();
		let mut s_pos = Coord::new(0, 0);
		let mut r_pos = Coord::new(0, 0);
		let mut is_r = true;
		input
			.chars()
			.filter_map(|c| Direction::try_from(c).ok())
			.for_each(|d| {
				if is_r {
					r_pos += d.value();
				} else {
					s_pos += d.value();
				}
				is_r = !is_r;
				set.insert(if is_r { r_pos } else { s_pos });
			});
		Ok(set.len())
	}
}
