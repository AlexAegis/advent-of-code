import { createReadStream } from 'fs';
import * as rl from 'readline';

export const reader = (input: 'example' | 'input' = 'input'): Promise<Array<number>> =>
	new Promise<Array<number>>(res => {
		let result: Array<number>;
		rl.createInterface({
			input: createReadStream(`src/2018/day08/${input}.txt`)
		}).on('line', line => res(line.split(' ').map(o => Number(o))));
	});
