import { Cave } from '../model/cave.class';
import { expect } from 'chai';

describe('Day 12, Cave', () => {
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
			const cave = new Cave(input);
			cave.normalize();
			expect(cave.row.startsWith('....#')).to.be.true;
			expect(cave.row.endsWith('#....')).to.be.true;
		}
	});

	it('Should be a score of 325:', () => {
		const cave = new Cave('.#....##....#####...#######....#.#..##.');
		cave.offset = -3;
		expect(cave.score()).to.equal(325);
	});
});
