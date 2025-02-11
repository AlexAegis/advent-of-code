/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { split, task } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const calcSegment = (input: string[]): string => {
	let currentOperator = '+';
	let i = 2;
	while (input.length > 1) {
		i = i % input.length;
		if (!input.some((inp) => inp === '(' || inp === ')' || inp === '+')) {
			currentOperator = '*';
		}
		if (
			/^\d+$/.test(input[i - 2]!) &&
			input[i - 1] === currentOperator &&
			/^\d+$/.test(input[i]!)
		) {
			input[i - 2] = eval(`${input[i - 2]}${input[i - 1]}${input[i]}`) as string;
			input.splice(i - 1, 2);
			i = i - 2;
		}

		if (input[i] === '(') {
			const segment = input.cutSubSegment(['(', ')'], i);
			if (segment) {
				const r = calcSegment(segment);
				input.splice(i, 0, r); // Splice the result back
				i--;
			}
		}

		i++;
	}
	return input[0]!;
};

export const p2 = (input: string): number =>
	split(input)
		.map((line) => Number.parseInt(calcSegment([...line.replaceAll(' ', '')]), 10))
		.reduce(sum, 0);

await task(p2, packageJson.aoc); // 297139939002972 ~262.85ms
