import { Vector } from './vector.class';
import { reader } from './reader.function';
import { of, concat } from 'rxjs';
import { reduce, map, partition, merge, mergeAll } from 'rxjs/operators';
import { Coord } from './coord.class';

export interface Boundary {
	maxX: number;
	minX: number;
	maxY: number;
	minY: number;
}

export const area = (boundary: Boundary): number => (boundary.maxX - boundary.minX) * (boundary.maxY - boundary.minY);

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
	console.time('legacy');
	let { maxX, minX, maxY, minY } = boundary(input);
	/*
	const maxX = input.map(vector => vector.position.x).reduce(max);
	const minX = input.map(vector => vector.position.x).reduce(min);
	const maxY = input.map(vector => vector.position.y).reduce(max);
	const minY = input.map(vector => vector.position.y).reduce(min);*/
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

	/*
	console.time('rxjs');
	const input$ = of(...input);
	const inputX$ = input$.pipe(map(vector => vector.position.x));
	const inputY$ = input$.pipe(map(vector => vector.position.y));
	const inputMaxX$ = inputX$.pipe(reduce(max));
	const inputMinX$ = inputX$.pipe(reduce(min));
	const inputMaxY$ = inputY$.pipe(reduce(max));
	const inputMinY$ = inputY$.pipe(reduce(min));

	of(inputMaxX$, inputMinX$, inputMaxY$, inputMinY$)
		.pipe(mergeAll())
		.subscribe(result => {
			console.log(`rx result combined: ${result}`);
		})
		.add(() => {
			console.timeEnd('rxjs');
		});*/
};

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const vectors = await reader(input);
		let minArea: number = area(boundary(vectors));

		for (let i = 0; i < 5; i++) {
			vectors.forEach(vector => {
				vector.position.add(vector.velocity);
			});
			let currArea = area(boundary(vectors));
			if (minArea > currArea) {
				minArea = currArea;
			} else break;
		}
		vectors.forEach(vector => {
			vector.position.sub(vector.velocity);
		});
		console.log(print(vectors));
		res(0);
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner('input')}`);
		console.timeEnd();
	})(); // ~ ms
}
