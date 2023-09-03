import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const lineMatcher = /^(\d+)-(\d+) (\w): (\w+)$/;

export interface TobogganPasswordPolicy {
	low: number;
	high: number;
	letter: string;
	password: string;
}

export const parseLine = (line: string): TobogganPasswordPolicy => {
	const [, lows, highs, letter, password] = line.match(lineMatcher) ?? [];
	const low = Number.parseInt(lows ?? '0', 10);
	const high = Number.parseInt(highs ?? '0', 10);
	return { low, high, letter: letter ?? '', password: password ?? '' };
};

export const p1 = (input: string): number =>
	split(input)
		.map(parseLine)
		.filter(({ low, high, letter, password }) => {
			const characterCount = password.split(letter).length - 1;
			return characterCount >= low && characterCount <= high;
		}).length;

await task(p1, packageJson.aoc); // 493 ~2.6ms
