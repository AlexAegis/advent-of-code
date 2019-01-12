import { Coord } from './coord.class';
import { createReadStream } from 'fs';
import * as rl from 'readline';

export const reader = (input: 'example' | 'input' = 'input'): Promise<Array<Coord>> =>
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
