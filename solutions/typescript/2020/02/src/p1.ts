import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const lineMatcher = /^(\d+)-(\d+) (\w): (\w+)$/;

export interface TobogganPasswordPolicy {
	low: number;
	high: number;
	letter: string;
	password: string;
}

export const parseLine = (line: string): TobogganPasswordPolicy => {
	const [, lows, highs, letter, password] = line.match(lineMatcher) ?? [];
	const low = parseInt(lows, 10);
	const high = parseInt(highs, 10);
	return { low, high, letter, password };
};

export const p1 = (input: string): number =>
	split(input)
		.map(parseLine)
		.filter(({ low, high, letter, password }) => {
			const characterCount = password.split(letter).length - 1;
			return characterCount >= low && characterCount <= high;
		}).length;

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 493 ~2.6ms
}
