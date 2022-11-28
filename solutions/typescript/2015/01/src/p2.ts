import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number => {
	let a = 0;
	let i = 0;
	for (const char of [...input].filter((c) => c === '(' || c === ')')) {
		a += char === '(' ? 1 : -1;
		i++;
		if (a < 0) break;
	}
	return i;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 1795 ~1.2ms
}
