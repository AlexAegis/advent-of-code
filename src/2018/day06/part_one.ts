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

	manhattanCoord(coord: Coord): number {
		return this.manhattan(coord.x, coord.y);
	}

	manhattan(x: number, y: number): number {
		return Math.abs(x - this.x) + Math.abs(y - this.y);
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
				points.push(new Coord(Number(lineSplit[1]), Number(lineSplit[0])));
			})
			.on('close', () => res(points));
	});

export const runner = async (input: 'example' | 'input' = 'example'): Promise<any> =>
	new Promise<any>(async res => {
		console.time();
		const points = await read(input);
		console.log(points);

		/*	PLAN- BOUNDING BOX

			get the bounding box of all the points and pad it by 1.
			start iterating from the center in circles until the bounding box is complete
			while iterating, for each point get the manhattan distance for each point, get the lowest ones 
			if there is only one, then put that point in the area of that point, if there are multiple ones, ignore it, its a boundary. 

		*/

		let boundaryTop: Coord;
		let boundaryRight: Coord;
		let boundaryBottom: Coord;
		let boundaryLeft: Coord;

		points.forEach(point => {
			if (boundaryTop === undefined || boundaryTop.y >= point.y) {
				boundaryTop = point;
			}
			if (boundaryRight === undefined || boundaryRight.x <= point.x) {
				boundaryRight = point;
			}
			if (boundaryBottom === undefined || boundaryBottom.y <= point.y) {
				boundaryBottom = point;
			}
			if (boundaryLeft === undefined || boundaryLeft.x >= point.x) {
				boundaryLeft = point;
			}
		});

		const boundaryStart: Coord = new Coord(boundaryLeft.x - 10, boundaryTop.y - 10);
		const boundaryEnd: Coord = new Coord(boundaryRight.x + 20, boundaryBottom.y + 20);
		// 40:52 - 353:358
		const bucket: Map<string, Array<Coord>> = new Map();
		const associations: Map<string, string> = new Map();
		let i = 0;
		for (let point of points) {
			bucket.set(point.toString(), []);
			associations.set(point.toString(), String.fromCharCode(64 + i)); // 97
			i++;
		}
		let map: Array<string> = [];
		for (let x = boundaryStart.x; x < boundaryEnd.x; x++) {
			let row = '';
			for (let y = boundaryStart.y; y < boundaryEnd.y; y++) {
				let ordered: Array<Coord> = points.sort((a, b) => a.manhattan(x, y) - b.manhattan(x, y));
				if (ordered[0].manhattan(x, y) !== ordered[1].manhattan(x, y)) {
					bucket.get(ordered[0].toString()).push(new Coord(x, y));
					let assoc = associations.get(ordered[0].toString());
					if (ordered[0].toString() === new Coord(x, y).toString()) {
						assoc = assoc.toUpperCase();
					}
					row = row + assoc;
				} else {
					row = row + '.';
				}
			}
			map.push(row);
		}
		//map.forEach(row => console.log(row));
		const bound: Array<number> = [];
		bucket.forEach(territory => {
			if (
				!territory.some(
					point =>
						point.x <= boundaryStart.x + 10 ||
						point.y <= boundaryStart.y + 20 ||
						point.x >= boundaryEnd.x - 20 ||
						point.y >= boundaryEnd.y - 20
				)
			) {
				bound.push(territory.length);
			}
		});
		let sortedBound = bound.sort((a, b) => a - b);

		const max = bound.reduce((acc, next) => (acc === undefined || next > acc ? next : acc));
		res(max);
		console.timeEnd();
	}); // 3006 the partitioning of the plane is good, but the way I determine which is infinite or not is not.

(async () => console.log(await runner('input')))();
