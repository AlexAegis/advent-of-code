import { createReadStream } from 'fs';
import * as rl from 'readline';
import { interval, Subject } from 'rxjs';
import { takeUntil, take, flatMap, tap } from 'rxjs/operators';

export class Coord {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(coord: Coord) {
		this.x += coord.x;
		this.y -= coord.y; // Psst, you didn't see me.
		return this;
	}

	toString(): string {
		return `${this.x},${this.y}`;
	}
}

export const read = (input: 'example' | 'input' = 'example'): Promise<Array<Coord>> =>
	new Promise<Array<Coord>>(res => {
		const points: Array<Coord> = new Array();
		rl.createInterface({
			input: createReadStream(`src/2018/day06/${input}.txt`)
		})
			.on('line', line => {
				const lineSplit = line.split(', ');
				points.push(new Coord(Number(lineSplit[0]), Number(lineSplit[1])));
			})
			.on('close', () => res(points));
	});

export const autorun = (async (input: 'example' | 'input' = 'example'): Promise<any> =>
	new Promise<any>(async res => {
		console.time();
		const points = await read(input);
		console.log(points);

		console.timeEnd();
	}))();
