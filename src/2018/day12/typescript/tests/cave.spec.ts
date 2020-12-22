import { expect } from 'chai';
import { Cave } from '../model/cave.class';

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
			// tslint:disable-next-line: no-unused-expression
			expect(cave.row.startsWith('....#')).to.be.true;
			// tslint:disable-next-line: no-unused-expression
			expect(cave.row.endsWith('#....')).to.be.true;
		}
	});

	it('Should be a score of 325:', () => {
		const cave = new Cave('.#....##....#####...#######....#.#..##.');
		cave.offset = -3;
		expect(cave.score()).to.equal(325);
	});
});
