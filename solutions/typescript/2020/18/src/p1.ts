import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const processSegment = (line: string[]): string => {
	let value: string | undefined = undefined;
	let lastOperator: '+' | '*' | undefined = undefined;
	for (let i = 0; i < line.length; i++) {
		const item = line[i];
		if (item === '+') {
			lastOperator = item;
		} else if (item === '*') {
			lastOperator = item;
		} else if (item === '(') {
			const j = line.findEndOfPair(['(', ')'], i);
			const segmentResult = processSegment(line.slice(i + 1, j));
			if (value === undefined) {
				value = segmentResult;
			} else {
				value = eval(`${value}${lastOperator}${segmentResult}`);
			}
			i = j ?? i;
		} else {
			if (value === undefined) {
				value = item;
			} else {
				value = eval(`${value}${lastOperator}${item}`);
			}
		}
	}
	return value ?? '0';
};

export const runner = (input: string): number =>
	split(input)
		.map((line) => parseInt(processSegment(line.replace(/ /g, '').split('')), 10))
		.reduce(sum, 0);

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 25190263477788 ~256.62ms
}
