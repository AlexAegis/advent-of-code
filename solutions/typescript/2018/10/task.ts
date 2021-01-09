import { bench, read } from '@lib';
import { max, min } from '@lib/math';
import { day, year } from '.';
import { Boundary } from './boundary.interface';
import { interpreter } from './interpreter.function';
import { Coord } from './model/coord.class';
import { Vector } from './model/vector.class';

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

	const stars = input.map((vector) => vector.position.toString());

	let pic = '';
	for (let y = minY; y <= maxY; y++) {
		let row = '';
		for (let x = minX; x <= maxX; x++) {
			row = row.concat(stars.indexOf(new Coord(x, y).toString()) >= 0 ? `#` : '.');
		}
		pic = pic.concat(row.concat('\n'));
	}
	return pic;
};

export const runner = (input: string): number => {
	const vectors = interpreter(input);
	let minArea: number = area(boundary(vectors));
	let i = 0;
	for (;;) {
		vectors.forEach((vector) => {
			vector.position.add(vector.velocity);
		});
		const currArea = verticalArea(boundary(vectors));
		if (minArea > currArea) {
			minArea = currArea;
		} else break;
		i++;
	}
	vectors.forEach((vector) => {
		vector.position.sub(vector.velocity);
	});
	console.log(print(vectors)); // result of part one
	return i; // result of part two
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // KBJHEZCB - 10369 ~305ms
}
