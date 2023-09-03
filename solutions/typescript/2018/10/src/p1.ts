import { task } from '@alexaegis/advent-of-code-lib';
import { max, min } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json';
import type { Boundary } from './boundary.interface.js';
import { interpreter } from './interpreter.function.js';
import { Coord } from './model/coord.class.js';
import type { Vector } from './model/vector.class.js';

export const normalize = (input: Vector[]): Vector[] => {
	const { minX, minY } = boundary(input);
	const norm = new Coord(minX, minY);
	return input.map((vector) => {
		vector.position.sub(norm);
		return vector;
	});
};

export const area = (b: Boundary): number => (b.maxX - b.minX) * (b.maxY - b.minY); // did not terminate correctly
export const verticalArea = (b: Boundary): number => b.maxY - b.minY;

export const boundary = (input: Vector[]): Boundary => {
	return {
		maxX: input.map((vector) => vector.position.x).reduce(max),
		minX: input.map((vector) => vector.position.x).reduce(min),
		maxY: input.map((vector) => vector.position.y).reduce(max),
		minY: input.map((vector) => vector.position.y).reduce(min),
	};
};

export const print = (input: Vector[]): string => {
	const { maxX, minX, maxY, minY } = boundary(input);
	console.log(`maxX: ${maxX}, minX: ${minX}, maxY: ${maxY}, minY: ${minY}`);

	const stars = new Set(input.map((vector) => vector.position.toString()));

	let pic = '';
	for (let y = minY; y <= maxY; y++) {
		let row = '';
		for (let x = minX; x <= maxX; x++) {
			row = row + stars.has(new Coord(x, y).toString()) ? '#' : '.';
		}
		pic = pic + row + '\n';
	}
	return pic;
};

export const p1 = (input: string): number => {
	const vectors = interpreter(input);
	let minArea: number = area(boundary(vectors));
	let i = 0;
	for (;;) {
		for (const vector of vectors) {
			vector.position.add(vector.velocity);
		}
		const currArea = verticalArea(boundary(vectors));
		if (minArea > currArea) {
			minArea = currArea;
		} else break;
		i++;
	}
	for (const vector of vectors) {
		vector.position.sub(vector.velocity);
	}
	console.log(print(vectors)); // result of part one
	return i; // result of part two
};

await task(p1, packageJson.aoc); // KBJHEZCB - 10369 ~305ms
