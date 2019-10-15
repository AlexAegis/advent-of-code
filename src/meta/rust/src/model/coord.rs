use crate::math::abs;
use std::cmp::Ord;
use std::fmt::Debug;
use std::ops::Add;
use std::ops::AddAssign;
use std::ops::Neg;
use std::ops::Sub;
use std::str::FromStr;

// #[derive(Debug, PartialEq)]
pub struct Coord<T> {
	pub x: T,
	pub y: T,
}

impl<T: FromStr> FromStr for Coord<T> {
	type Err = T::Err;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		let coords: Vec<&str> = s
			.trim_matches(|p| p == '(' || p == ')')
			.split(',')
			.map(|s| s.trim())
			.collect();

		let x_fromstr = coords[0].parse::<T>()?;
		let y_fromstr = coords[1].parse::<T>()?;

		Ok(Coord {
			x: x_fromstr,
			y: y_fromstr,
		})
	}
}

impl<T: Debug> Debug for Coord<T> {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "Coord {{ x: {:?}, y: {:?} }}", self.x, self.y)
	}
}

impl<T: Add<Output = T> + Sub<Output = T> + Neg<Output = T> + Ord + Default> Coord<T> {
	fn manhattan(self, coord: Coord<T>) -> T {
		abs(coord.x - self.x) + abs(coord.y - self.y)
	}
}

impl<T: Add<Output = T>> Add for Coord<T> {
	type Output = Self;

	fn add(self, other: Self) -> Self::Output {
		Self {
			x: self.x + other.x,
			y: self.y + other.y,
		}
	}
}

impl<T: Add<Output = T> + Copy> AddAssign for Coord<T> {
	fn add_assign(&mut self, other: Self) {
		*self = Self {
			x: self.x + other.x,
			y: self.y + other.y,
		};
	}
}
