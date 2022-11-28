import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): number => {
	const lines = input.lines();
	const bitCount = lines[0].length;

	const gammaResult: string[] = [];
	const epsilonResult: string[] = [];

	for (let bitIndex = 0; bitIndex < bitCount; bitIndex++) {
		let c0 = 0;
		let c1 = 0;
		for (const line of lines) {
			if (line[bitIndex] === '0') {
				c0++;
			} else {
				c1++;
			}
		}

		if (c1 >= c0) {
			gammaResult.push('0');
			epsilonResult.push('1');
		} else {
			gammaResult.push('1');
			epsilonResult.push('0');
		}
	}
	const gammaRate = parseInt(gammaResult.join(''), 2);
	const epsilonRate = parseInt(epsilonResult.join(''), 2);
	return gammaRate * epsilonRate;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 2648450 ~0.12ms
}
