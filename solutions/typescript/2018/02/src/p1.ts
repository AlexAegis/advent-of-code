import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

/**
 * Returns how many character repeats exactly 'times' times in the given string
 */
const charRepeats = (line: string, times = 2): number => {
	const processed = new Map<string, number>();
	for (const letter of line) {
		if (!processed.has(letter)) {
			processed.set(letter, line.split(letter).length - 1);
		}
	}
	return [...processed].count(([_, v]) => v === times);
};

const atLeastOne = (n: number): boolean => n >= 1;

export const p1 = (input: string): number => {
	let twiceAppearCount = 0;
	let thriceAppearCount = 0;
	for (const line of split(input)) {
		twiceAppearCount += atLeastOne(charRepeats(line)) ? 1 : 0;
		thriceAppearCount += atLeastOne(charRepeats(line, 3)) ? 1 : 0;
	}
	return twiceAppearCount * thriceAppearCount;
};

await task(p1, packageJson.aoc); // 5456 ~9ms
