import { bench, read, split } from '@lib';
import { sum } from '@lib/math';
import { day, year } from '.';

export const calcSegment = (input: string[]): string => {
	let currentOperator = '+';
	let i = 2;
	while (input.length > 1) {
		i = i % input.length;
		if (!input.find((inp) => inp === '(' || inp === ')' || inp === '+')) {
			currentOperator = '*';
		}
		if (
			/^\d+$/.test(input[i - 2]) &&
			input[i - 1] === currentOperator &&
			/^\d+$/.test(input[i])
		) {
			input[i - 2] = eval(`${input[i - 2]}${input[i - 1]}${input[i]}`);
			input.splice(i - 1, 2);
			i = i - 2;
		}

		if (input[i] === '(') {
			let pc = 1;
			let j = i + 1;
			for (; j < input.length; j++) {
				if (input[j] === '(') {
					pc++;
				} else if (input[j] === ')') {
					pc--;
				}
				if (pc === 0) {
					const r = calcSegment(input.splice(i + 1, j - i - 1));
					input.splice(i + 1, 1);
					input[i] = `${r}`;
					i--;
					break;
				}
			}
		}
		i++;
	}
	return input[0];
};

export const runner = (input: string): number =>
	split(input)
		.map((line) => parseInt(calcSegment(line.replace(/ /g, '').split('')), 10))
		.reduce(sum, 0);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 297139939002972 ~262.85ms
}
