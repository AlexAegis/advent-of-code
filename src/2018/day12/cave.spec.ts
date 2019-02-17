import { Cave } from './cave.class';
import { expect } from 'chai';

describe('Day 12, Cave', () => {
	const cave: Cave = new Cave();

	const inputs: Array<string> = [
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
		'......#.#'
	];

	it('Should be normalizing inputs on both ends:', () => {
		for (let input of inputs) {
			cave.row = input;
			cave.normalize();
			expect(cave.row.startsWith('....#')).to.be.true;
			expect(cave.row.endsWith('#....')).to.be.true;
		}
	});

	it('Should be a score of 325:', () => {
		cave.offset = -3;
		cave.row = '.#....##....#####...#######....#.#..##.';
		expect(cave.score()).to.equal(325);
	});
});
