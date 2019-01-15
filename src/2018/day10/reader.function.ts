import { createReadStream } from 'fs';
import * as rl from 'readline';
import { Vector } from './vector.class';

export const reader = (input: string = 'input'): Promise<Array<Vector>> =>
	new Promise<Array<Vector>>(res => {
		const vectors: Array<Vector> = [];
		rl.createInterface({
			input: createReadStream(`src/2018/day10/${input}.txt`)
		})
			.on('line', line => vectors.push(Vector.parse(line)))
			.on('close', () => res(vectors));
	});
