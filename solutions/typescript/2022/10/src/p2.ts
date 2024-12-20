import { INTERVAL_CLOSED, renderMatrix, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

const CRT_WIDTH = 40;
const CRT_HEIGHT = 6;

export const p2 = (input: string): string => {
	const instructions = parse(input);
	let x = 1;
	let cycle = 0;

	const display: string[][] = Array.from({ length: CRT_HEIGHT }, () =>
		Array.from({ length: CRT_WIDTH }, () => '.'),
	);

	for (const instruction of instructions) {
		const currentRow = Math.floor(cycle / CRT_WIDTH);
		const currentPixelInRow = cycle % CRT_WIDTH;
		const displayRow = display[currentRow];
		if (
			displayRow &&
			x.isContainedIn(
				(currentPixelInRow - 1).interval(currentPixelInRow + 1, INTERVAL_CLOSED),
			)
		) {
			displayRow[currentPixelInRow] = '#';
		}

		cycle += 1;
		if (typeof instruction === 'number') {
			x += instruction;
		}
	}

	return renderMatrix(display);
};

await task(p2, packageJson.aoc); // PZULBAUA ~0.06ms
