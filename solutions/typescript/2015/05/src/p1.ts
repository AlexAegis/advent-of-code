import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const vowels = 'aeiou';
const forbidden = ['ab', 'cd', 'pq', 'xy'];

export const isNice = (line: string): boolean => {
	let prev: string | undefined;
	let vowelsCount = 0;
	let hasForbidden = false;
	let hasDouble = false;
	for (const n of [...line]) {
		if (vowelsCount <= 3 && vowels.search(n) >= 0) {
			vowelsCount++;
		}
		if (prev) {
			if (!hasDouble && prev === n) {
				hasDouble = true;
			}
			if (forbidden.find((f) => f === `${prev}${n}`)) {
				hasForbidden = true;
				break;
			}
		}

		prev = n;
	}
	return !hasForbidden && vowelsCount >= 3 && hasDouble;
};

export const runner = (input: string): number => {
	return input.split('\n').reduce((a, n) => a + (isNice(n) ? 1 : 0), 0);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 236 ~13ms
}
