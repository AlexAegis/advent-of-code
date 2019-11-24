use aoclib::model::coord::Coord;
use aoclib::model::coord::Direction;
use std::collections::HashSet;
use std::convert::TryFrom;

pub struct PartOne;
pub struct PartTwo;

impl aoc::Solvable<&str, usize> for PartOne {
	fn solve(input: &str) -> aoc::Solution<usize> {
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

impl aoc::Solvable<&str, usize> for PartTwo {
	fn solve(input: &str) -> aoc::Solution<usize> {
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
