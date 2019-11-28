pub fn strip_top_lvl_brackets(s: &str) -> String {
	s.chars()
		.fold((0, "".to_string()), |mut acc, n| {
			if acc.0 == 0 {
				if n == '[' {
					acc.0 += 1;
				} else {
					acc.1 = format!("{}{}", acc.1, n);
				}
			} else if acc.0 == 1 {
				if n == ']' {
					acc.0 -= 1;
				} else {
					acc.1 = format!("{}{}", acc.1, n);
				}
			} else if n == '[' {
				acc.0 += 1;
				acc.1 = format!("{}{}", acc.1, n);
			} else if n == ']' {
				acc.0 -= 1;
				acc.1 = format!("{}{}", acc.1, n);
			} else {
				acc.1 = format!("{}{}", acc.1, n);
			}
			acc
		})
		.1
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn paran_test() -> std::result::Result<(), Box<dyn std::error::Error>> {
		let t = "[a][a[a]]";
		let res = strip_top_lvl_brackets(t);
		assert_eq!("aa[a]", res);
		Ok(())
	}
}
