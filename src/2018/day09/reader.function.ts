import { createReadStream } from 'fs';
import * as rl from 'readline';

export interface Setup {
	players: number;
	lastMarble: number;
}

export const reader = (input: string = 'input'): Promise<Setup> =>
	new Promise<Setup>(res =>
		rl
			.createInterface({
				input: createReadStream(`src/2018/day09/${input}.txt`)
			})
			.on('line', line => {
				const input = line.split(' ');
				res({ players: Number(input[0]), lastMarble: Number(input[6]) });
			})
	);
