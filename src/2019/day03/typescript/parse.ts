import { Direction } from '@lib/model/direction.class';

export class Vector {
	direction!: Direction;
	amount: number;

	constructor(s: string) {
		switch (s[0]) {
			case 'R':
				this.direction = Direction.EAST;
				break;
			case 'L':
				this.direction = Direction.WEST;
				break;
			case 'U':
				this.direction = Direction.NORTH;
				break;
			case 'D':
				this.direction = Direction.SOUTH;
				break;
		}
		this.amount = Number(s.substring(1));
	}
}

export const parse = (input: string): Vector[][] => {
	return input.split(/\r?\n/).map(line =>
		line
			.split(',')
			.filter(c => !!c)
			.map(c => new Vector(c))
			.filter(v => v.direction)
	);
};

export const parseCommaSeparatedNumbers = (input: string): number[] => {
	return input
		.split(',')
		.filter(c => /^(\+|-)?[0-9]+/.test(c))
		.map(c => Number(c));
};

export const parseNewLineSeparatedNumbers = (input: string): number[] => {
	return input
		.split(/\r?\n/)
		.filter(c => /^(\+|-)?[0-9]+/.test(c))
		.map(c => Number(c));
};

export const parseNewLineAndCommaSeparatedNumbers = (input: string): number[][] => {
	return input
		.split(/\r?\n/)
		.filter(line => !!line)
		.map(line =>
			line
				.split(',')
				.filter(c => /^(\+|-)?[0-9]+/.test(c))
				.map(c => Number(c))
		);
};
