import { createReadStream } from 'fs';
import * as rl from 'readline';

export const reader = (input: string = 'input'): Promise<any> =>
	new Promise<any>(res =>
		rl
			.createInterface({
				input: createReadStream(`src/2018/day10/${input}.txt`)
			})
			.on('line', line => {
				const input = line.split(' ');
				res(input);
			})
	);
