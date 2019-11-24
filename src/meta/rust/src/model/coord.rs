use crate::math::abs;
use num_traits::identities::One;
use num_traits::identities::Zero;
use std::cmp::Eq;
use std::cmp::Ord;
use std::cmp::PartialEq;
use std::convert::TryFrom;
use std::fmt;
use std::fmt::Debug;
use std::ops::Add;
use std::ops::AddAssign;
use std::ops::Mul;
use std::ops::Neg;
use std::ops::Sub;
use std::str::FromStr;

#[derive(Debug, Copy, Clone, Hash, Eq, PartialEq)]
pub enum Direction<T = i8> {
	North(Coord<T>),
	South(Coord<T>),
	East(Coord<T>),
	West(Coord<T>),
}

impl<T: One + Zero + Copy + Neg<Output = T> + Debug> Direction<T> {
	pub fn value(self) -> Coord<T> {
		match self {
			Direction::North(c) => c,
			Direction::West(c) => c,
			Direction::South(c) => c,
			Direction::East(c) => c,
		}
	}
}

impl<T: One + Zero + Copy + Neg<Output = T> + Debug> fmt::Display for Direction<T> {
	fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
		write!(f, "{:?}", self.value())
	}
}

impl<T: One + Zero + Copy + Neg<Output = T> + Debug> TryFrom<char> for Direction<T> {
	type Error = aoc::ReaderError;
	fn try_from(e: char) -> Result<Self, aoc::ReaderError> {
		match e {
			'^' => Ok(Direction::North(north())),
			'>' => Ok(Direction::East(east())),
			'v' => Ok(Direction::South(south())),
			'<' => Ok(Direction::West(west())),
			_ => Err(aoc::ReaderError::new("Not a direction")),
		}
	}
}

#[derive(Debug, Copy, Clone, Hash, Eq, PartialEq)]
pub struct Coord<T> {
	pub x: T,
	pub y: T,
}

impl<T> Coord<T> {
	pub fn new(x: T, y: T) -> Self {
		Coord { x, y }
	}
}

impl<T: One + Zero + Copy + Sub<Output = T>> One for Coord<T> {
	fn one() -> Self {
		Coord {
			x: T::one(),
			y: T::zero(),
		}
	}
}

impl<T: Zero + Eq> Zero for Coord<T> {
	fn zero() -> Self {
		Coord {
			x: T::zero(),
			y: T::zero(),
		}
	}

	fn is_zero(&self) -> bool {
		self.x == T::zero() && self.y == T::zero()
	}
}

trait Stepper<T> {
	type Output;
	fn step(self, step: Coord<T>, amount: T) -> Self::Output;
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

impl<T: Copy + Mul<Output = T> + Add<Output = T>> Stepper<T> for Coord<T> {
	type Output = Coord<T>;
	fn step(self, step: Coord<T>, amount: T) -> Coord<T> {
		self + (step * amount)
	}
}

impl<T: Copy + Mul<Output = T> + Add<Output = T>> Stepper<T> for &mut Coord<T> {
	type Output = Coord<T>;
	fn step(self, step: Coord<T>, amount: T) -> Coord<T> {
		*self + (step * amount)
	}
}

impl<T: Copy + Mul<Output = T> + Add<Output = T>> Stepper<T> for &mut &Coord<T> {
	type Output = Coord<T>;
	fn step(self, step: Coord<T>, amount: T) -> Coord<T> {
		**self + (step * amount)
	}
}

impl<T: Copy + Mul<Output = T> + Add<Output = T>> Stepper<T> for &Coord<T> {
	type Output = Coord<T>;
	fn step(self, step: Coord<T>, amount: T) -> Coord<T> {
		*self + (step * amount)
	}
}

impl<T: Add<Output = T> + Sub<Output = T> + Neg<Output = T> + Ord + Default> Coord<T> {
	pub fn manhattan(self, coord: Coord<T>) -> T {
		abs(coord.x - self.x) + abs(coord.y - self.y)
	}
}

impl<T: Add<Output = T>> Add<Coord<T>> for Coord<T> {
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

/// Complex multiplication
impl<T: Copy + Mul<Output = T> + Sub<Output = T> + Add<Output = T>> Mul<Coord<T>> for Coord<T> {
	type Output = Self;
	fn mul(self, rhs: Self) -> Self {
		Coord {
			x: ((self.x * rhs.x) - (self.y * rhs.y)),
			y: ((self.x * rhs.y) + (self.y * rhs.x)),
		}
	}
}

/// Scalar multiplication
impl<T: Copy + Mul<Output = T>> Mul<T> for Coord<T> {
	type Output = Coord<T>;
	fn mul(self, rhs: T) -> Coord<T> {
		Coord {
			x: self.x * rhs,
			y: self.y * rhs,
		}
	}
}

impl<T: Neg<Output = T>> Neg for Coord<T> {
	type Output = Self;

	fn neg(self) -> Self::Output {
		Coord {
			x: -self.x,
			y: -self.y,
		}
	}
}

impl<
		T: Neg<Output = T> + One + Zero + Mul<Output = T> + Copy + Sub<Output = T> + Add<Output = T>,
	> Coord<T>
{
	pub fn rotate_left(self) -> Coord<T> {
		self * north::<T>()
	}

	pub fn rotate_right(self) -> Coord<T> {
		self * -north::<T>()
	}
}

pub fn north<T: Zero + One>() -> Coord<T> {
	Coord {
		x: T::zero(),
		y: T::one(),
	}
}

pub fn south<T: Neg<Output = T> + Zero + One>() -> Coord<T> {
	Coord {
		x: T::zero(),
		y: -(T::one()),
	}
}

pub fn east<T: Zero + One>() -> Coord<T> {
	Coord {
		x: T::one(),
		y: T::zero(),
	}
}

pub fn west<T: Neg<Output = T> + Zero + One>() -> Coord<T> {
	Coord {
		x: -(T::one()),
		y: T::zero(),
	}
}
