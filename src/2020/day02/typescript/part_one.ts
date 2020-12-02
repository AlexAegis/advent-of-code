import { bench, read, split } from '@lib';
import { day, year } from '.';

export const lineMatcher = /(\d+)-(\d+) ([a-z]): ([a-z]+)/;

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

export const runner = (input: string): number =>
	split(input)
		.map(parseLine)
		.filter(({ low, high, letter, password }) => {
			const characterCount = password.split(letter).length - 1;
			return characterCount >= low && characterCount <= high;
		}).length;

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 493 ~2.6ms
}
