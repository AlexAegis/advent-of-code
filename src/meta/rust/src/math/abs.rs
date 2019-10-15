use std::cmp::Ord;
use std::ops::Neg;

pub fn abs<T: Neg<Output = T> + Ord + Default>(a: T) -> T {
	if a >= T::default() {
		a
	} else {
		-a
	}
}
