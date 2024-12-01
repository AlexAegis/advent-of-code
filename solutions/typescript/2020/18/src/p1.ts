import { split, task } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const processSegment = (line: string[]): string => {
	let value: string | undefined = undefined;
	let lastOperator: '+' | '*' | undefined = undefined;
	for (let i = 0; i < line.length; i++) {
		const item = line[i];
		switch (item) {
			case '+': {
				lastOperator = item;

				break;
			}
			case '*': {
				lastOperator = item;

				break;
			}
			case '(': {
				const j = line.findEndOfPair(['(', ')'], i);
				const segmentResult = processSegment(line.slice(i + 1, j));
				value =
					value === undefined
						? segmentResult
						: (eval(`${value}${lastOperator}${segmentResult}`) as string);
				i = j ?? i;

				break;
			}
			default: {
				value =
					value === undefined ? item : (eval(`${value}${lastOperator}${item}`) as string);
			}
		}
	}
	return value ?? '0';
};

export const p1 = (input: string): number =>
	split(input)
		.map((line) => Number.parseInt(processSegment([...line.replaceAll(' ', '')]), 10))
		.reduce(sum, 0);

await task(p1, packageJson.aoc); // 25190263477788 ~256.62ms
