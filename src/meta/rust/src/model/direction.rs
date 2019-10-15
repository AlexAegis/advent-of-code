use crate::model;
use crate::model::Coord;
use num_traits::identities::One;
use num_traits::identities::Zero;
use std::ops::Add;
use std::ops::Mul;
use std::ops::Neg;
use std::ops::Sub;
///
/// Describes a Direction a field of T's
///
///
#[derive(Debug, Copy, Clone)]
pub struct Direction<T> {
	/// This vector represents the direction
	pub delta: Coord<T>,
}

impl<T: Copy + Mul<Output = T> + Sub<Output = T> + Add<Output = T>> Mul for Direction<T> {
	type Output = Self;
	fn mul(self, rhs: Self) -> Self {
		Direction {
			delta: Coord {
				x: ((self.delta.x * rhs.delta.x) - (self.delta.y * rhs.delta.y)),
				y: ((self.delta.x * rhs.delta.y) + (self.delta.y * rhs.delta.x)),
			},
		}
	}
}

impl<T: Neg<Output = T>> Neg for Direction<T> {
	type Output = Self;

	fn neg(self) -> Self::Output {
		Direction {
			delta: Coord {
				x: -self.delta.x,
				y: -self.delta.y,
			},
		}
	}
}

impl<
		T: Neg<Output = T> + One + Zero + Mul<Output = T> + Copy + Sub<Output = T> + Add<Output = T>,
	> Direction<T>
{
	pub fn left(self) -> Direction<T> {
		self * north::<T>()
	}

	pub fn right(self) -> Direction<T> {
		self * -north::<T>()
	}
}

pub fn north<T: Zero + One>() -> Direction<T> {
	Direction {
		delta: model::coord::north::<T>(),
	}
}

pub fn south<T: Neg<Output = T> + Zero + One>() -> Direction<T> {
	Direction {
		delta: model::coord::south::<T>(),
	}
}

pub fn east<T: Zero + One>() -> Direction<T> {
	Direction {
		delta: model::coord::east::<T>(),
	}
}

pub fn west<T: Neg<Output = T> + Zero + One>() -> Direction<T> {
	Direction {
		delta: model::coord::west::<T>(),
	}
}
