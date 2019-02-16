import { Cave } from './cave.class';

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

	it('Should be normalizing inputs on both ends:', async () => {
		for (let input of inputs) {
			cave.row = input;
			cave.normalize();
			expect(cave.row.startsWith('....#')).toBeTruthy();
			expect(cave.row.endsWith('#....')).toBeTruthy();
		}
	});
});
