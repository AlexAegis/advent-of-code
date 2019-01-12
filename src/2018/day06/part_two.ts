import { createReadStream } from 'fs';
import * as rl from 'readline';
import { Coord } from './coord.class';

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

export const runner = async (input: 'example' | 'input' = 'example'): Promise<number> =>
	new Promise<number>(async res => {
		console.time();
		const points = await read(input);
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

		const boundaryStart: Coord = new Coord(boundaryLeft.x, boundaryTop.y);
		const boundaryEnd: Coord = new Coord(boundaryRight.x, boundaryBottom.y + 1);

		let maxDistance = input === 'example' ? 32 : 10000;
		let area = 0;
		for (let x = boundaryStart.x; x < boundaryEnd.x; x++) {
			for (let y = boundaryStart.y; y < boundaryEnd.y; y++) {
				if (points.map(a => a.manhattan(x, y)).reduce((acc, next) => (acc += next)) < maxDistance) {
					area++;
				}
			}
		}
		res(area);
		console.timeEnd();
	}); // 42998

// (async () => console.log(await runner('input')))();
