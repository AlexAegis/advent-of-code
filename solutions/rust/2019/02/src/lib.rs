use std::cmp::{Eq, PartialEq};

pub struct PartOne;
pub struct PartTwo;

#[derive(Debug, PartialEq, Eq)]
pub enum Instruction {
	ADD,
	MUL,
}

impl Instruction {
	fn new(from: usize) -> Option<Instruction> {
		match from {
			1 => Some(Instruction::ADD),
			2 => Some(Instruction::MUL),
			_ => None,
		}
	}
}

pub fn compute(mut v: Vec<usize>) -> Option<usize> {
	let mut cursor: usize = 0;
	while let Some(i) = Instruction::new(v[cursor]) {
		let index = v[cursor + 3];
		v[index] = match i {
			Instruction::ADD => v[v[cursor + 1]] + v[v[cursor + 2]],
			Instruction::MUL => v[v[cursor + 1]] * v[v[cursor + 2]],
		};
		cursor += 4;
	}
	v.get(0).copied()
}

pub fn parse(input: &str) -> Vec<usize> {
	input
		.split(',')
		.filter_map(|c| c.parse::<usize>().ok())
		.collect::<Vec<usize>>()
}

impl aoclib::Solvable<&str, usize> for PartOne {
	fn solve(input: &str) -> aoclib::Solution<usize> {
		let mut v = parse(input);
		v[1] = 12;
		v[2] = 2;
		compute(v).ok_or_else(|| aoclib::SolutionError::from("Not found"))
	}
}

impl aoclib::Solvable<&str, usize> for PartTwo {
	fn solve(input: &str) -> aoclib::Solution<usize> {
		let vec = parse(input);
		let target: usize = 19_690_720;
		(0..=100)
			.flat_map(|noun| (0..=100).map(move |verb| (noun, verb)))
			.filter_map(|(noun, verb)| {
				let mut v = vec.clone();
				v[1] = noun;
				v[2] = verb;
				compute(v).map(|r| (noun, verb, r))
			})
			.find(|(_, _, r)| *r == target)
			.map(|(noun, verb, _)| 100 * noun + verb)
			.ok_or_else(|| aoclib::SolutionError::from("Not found"))
	}
}
