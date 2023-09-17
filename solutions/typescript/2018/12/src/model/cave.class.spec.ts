import { describe, expect, it } from 'vitest';
import { Cave } from './cave.class.js';

describe('2018 - Day 12 - Cave', () => {
	const inputs: string[] = [
		'....#.#....',
		'#.#',
		'#.#.',
		'.#.#',
		'.#.#.',
		'..#.#..',
		'...#.#...',
		'....#.#',
		'#.#....',
		'......#.#......',
		'......#.#',
	];

	it('Should be normalizing inputs on both ends:', () => {
		for (const input of inputs) {
			const cave = new Cave(input);
			cave.normalize();
			expect(cave.row.startsWith('....#')).toEqual(true);
			expect(cave.row.endsWith('#....')).toEqual(true);
		}
	});

	it('Should be a score of 325:', () => {
		const cave = new Cave('.#....##....#####...#######....#.#..##.');
		cave.offset = -3;
		expect(cave.score()).toEqual(325);
	});
});
