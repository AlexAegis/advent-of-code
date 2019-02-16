import { Vector } from './vector.class';
import { reader } from './reader.function';
import { Coord } from './coord.class';
import { Boundary } from './boundary.interface';

export const normalize = (input: Array<Vector>): Array<Vector> => {
	let { maxX, minX, maxY, minY } = boundary(input);
	let norm = new Coord(minX, minY);
	return input.map(vector => {
		vector.position.sub(norm);
		return vector;
	});
};

export const area = (boundary: Boundary): number => (boundary.maxX - boundary.minX) * (boundary.maxY - boundary.minY); // did not terminate correctly
export const verticalArea = (boundary: Boundary): number => boundary.maxY - boundary.minY;

export const boundary = (input: Array<Vector>): Boundary => {
	return {
		maxX: input.map(vector => vector.position.x).reduce(max),
		minX: input.map(vector => vector.position.x).reduce(min),
		maxY: input.map(vector => vector.position.y).reduce(max),
		minY: input.map(vector => vector.position.y).reduce(min)
	};
};

export const max = (acc: number, next: number) => (acc < next ? next : acc);
export const min = (acc: number, next: number) => (acc > next ? next : acc);

export const print = (input: Array<Vector>): string => {
	let { maxX, minX, maxY, minY } = boundary(input);
	console.log(`maxX: ${maxX}, minX: ${minX}, maxY: ${maxY}, minY: ${minY}`);

	const stars = input.map(vector => vector.position.toString());

	let pic = '';
	for (let y = minY; y <= maxY; y++) {
		let row: string = '';
		for (let x = minX; x <= maxX; x++) {
			row = row.concat(stars.indexOf(new Coord(x, y).toString()) >= 0 ? `#` : '.');
		}
		pic = pic.concat(row.concat('\n'));
	}
	return pic;
};

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const vectors = await reader(input);
		let minArea: number = area(boundary(vectors));
		for (var i = 0; true; i++) {
			vectors.forEach(vector => {
				vector.position.add(vector.velocity);
			});
			let currArea = verticalArea(boundary(vectors));
			if (minArea > currArea) {
				minArea = currArea;
			} else break;
		}
		vectors.forEach(vector => {
			vector.position.sub(vector.velocity);
		});
		console.log(print(vectors)); // result of part one
		res(i); // result of part two
	});

if (require.main === module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); // KBJHEZCB - 10369 ~ 170ms
}
