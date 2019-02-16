import { createReadStream } from 'fs';
import * as rl from 'readline';
import { Cave } from './cave.class';

export const reader = (input: string = 'input'): Promise<Cave> =>
	new Promise<Cave>(res => {
		const cave = new Cave();
		rl.createInterface({
			input: createReadStream(`src/2018/day12/${input}.txt`)
		})
			.on('line', line => {
				if (line.startsWith('initial state:')) {
					cave.row = line.split(': ')[1];
				} else if (line.indexOf('=>') > 0) {
					const split = line.split(' => ');
					if (split[0][2] !== split[1]) {
						cave.rules.push(split[0]);
					}
				}
			})
			.on('close', () => res(cave));
	});
