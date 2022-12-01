import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { hexagonalAxialDirections, parse } from './parse.function.js';

export const p1 = (input: string): number =>
	parse(input)
		.map((ttf) =>
			ttf
				.reduce((acc, a) => acc.addMut(hexagonalAxialDirections[a]), Vec2.ORIGIN.clone())
				.toString()
		)
		.reduce((blacks, toFlip) => {
			blacks.flip(toFlip.toString());
			return blacks;
		}, new Set<string>()).size;

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
	console.log(`Result: ${await benchTask(p1, resources)}`); // 479 ~1.22ms
}
