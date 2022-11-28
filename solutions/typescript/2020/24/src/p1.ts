import { bench, read } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { hexagonalAxialDirections, parse } from './parse.function.js';

export const runner = (input: string): number =>
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
	const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt');
	console.log(`Result: ${await bench(input, runner)}`); // 479 ~1.22ms
}
