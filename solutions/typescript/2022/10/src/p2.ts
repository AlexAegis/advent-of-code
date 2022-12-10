import { renderMatrix, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

const CRT_WIDTH = 40;
const CRT_HEIGHT = 6;

export const p2 = (input: string): string => {
	const instructions = parse(input);
	let x = 1;
	let cycle = 0;

	const display: string[][] = Array.from({ length: CRT_HEIGHT }, () =>
		Array.from({ length: CRT_WIDTH }, () => '.')
	);

	for (const instruction of instructions) {
		const currentRow = Math.floor(cycle / CRT_WIDTH);
		const currentPixelInRow = cycle % CRT_WIDTH;

		if (x.isBetween(currentPixelInRow - 1, currentPixelInRow + 1)) {
			display[currentRow][currentPixelInRow] = '#';
		}

		cycle += 1;
		if (typeof instruction === 'number') {
			x += instruction;
		}
	}

	return renderMatrix(display);
};

await task(p2, packageJson.aoc); // PZULBAUA ~0.06ms
