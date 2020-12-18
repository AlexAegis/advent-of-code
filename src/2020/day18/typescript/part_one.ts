import { bench, read, split } from '@lib';
import { sum } from '@lib/math';
import { day, year } from '.';

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
			let pc = 1;
			let j = i + 1;
			for (; j < line.length; j++) {
				if (line[j] === '(') {
					pc++;
				} else if (line[j] === ')') {
					pc--;
				}
				if (pc === 0) {
					const segmentResult = processSegment(line.slice(i + 1, j));
					if (value === undefined) {
						value = segmentResult;
					} else {
						value = eval(`${value}${lastOperator}${segmentResult}`);
					}
					break;
				}
			}
			i = j;
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

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 25190263477788 ~256.62ms
}
