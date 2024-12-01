import { BoundingBox, Vec2, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpreter } from './interpreter.function.js';

import type { MotionVector } from './model/motion-vector.class.js';

export const normalize = (input: MotionVector[]): MotionVector[] => {
	const aabb = BoundingBox.fromVectors(input.map((i) => i.position));
	return input.map((vector) => {
		vector.position.subMut(aabb.size);
		return vector;
	});
};

export const print = (input: MotionVector[]): string => {
	const aabb = BoundingBox.fromVectors(input.map((i) => i.position));
	const stars = new Set(input.map((vector) => vector.position.toString()));

	let pic = '';
	for (let y = aabb.top; y <= aabb.bottom; y++) {
		let row = '';
		for (let x = aabb.left; x <= aabb.right; x++) {
			row = row + (stars.has(new Vec2(x, y).toString()) ? '#' : '.');
		}
		pic = pic + row + '\n';
	}
	return pic;
};

export const p1 = (input: string): number => {
	const vectors = interpreter(input);
	const aabb = BoundingBox.fromVectors(vectors.map((i) => i.position));
	let minArea: number = aabb.area();
	let i = 0;
	for (;;) {
		for (const vector of vectors) {
			vector.position.addMut(vector.velocity);
		}
		const aabb = BoundingBox.fromVectors(vectors.map((i) => i.position));
		const currArea = aabb.vertical.length;
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
