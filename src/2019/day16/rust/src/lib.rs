pub struct PartOne;
pub struct PartTwo;

pub const PATTERN: [isize; 4] = [0, 1, 0, -1];

fn pattern_get(n: usize, phase: usize) -> isize {
	PATTERN[(n / (phase + 1) + 1 / (phase + 1)) % PATTERN.len()]
}

fn ftt(inp: &mut Vec<isize>, offset: usize) -> String {
	let mut a: Vec<isize> = inp.to_vec();
	println!("{:?}", inp);
	println!("{:?}", a);
	for _ in 0..100 {
		let mut p: Vec<isize> = a.to_vec();
		println!("{:?}", p);
		for (r, _g) in a.iter().enumerate() {
			let mut s: isize = 0;
			for i in 0..a.len() {
				s += (*a.get(i).unwrap() as isize * pattern_get(i, r)) % 10;
			}
			p[r] = (s % 10).abs();
		}
		a = p;
	}

	let from = offset % a.len();
	let mut to = (8 + offset) % a.len();
	while to <= from {
		to += a.len();
	}
	println!("{:?}", a);
	std::iter::repeat(a.iter())
		.flatten()
		.skip(from)
		.take(8)
		.map(|i| i.to_string())
		.collect::<String>()
}
impl aoclib::Solvable<&str, String> for PartOne {
	fn solve(input: &str) -> aoclib::Solution<String> {
		let mut a = input
			.repeat(1)
			.chars()
			.map(|c| c.to_string().parse::<isize>().unwrap())
			.collect::<Vec<isize>>();

		Ok(ftt(&mut a, 0))
	}
}

impl aoclib::Solvable<&str, i32> for PartTwo {
	fn solve(_input: &str) -> aoclib::Solution<i32> {
		Ok(0)
	}
}
