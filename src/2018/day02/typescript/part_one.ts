import { bench, read, split } from '@lib';
import { day, year } from '.';

/**
 * Returns how many character repeats exactly 'times' times in the given string
 */
const charRepeats = (line: string, times: number = 2): number => {
	const processed: Map<string, number> = new Map();
	for (const letter of line) {
		if (!processed.has(letter)) {
			processed.set(letter, line.split(letter).length - 1);
		}
	}
	return [...processed].filter(([_, v]) => v === times).length;
};

const atLeastOne = (n: number): boolean => n >= 1;

export const runner = (input: string): number => {
	let twiceAppearCount = 0;
	let thriceAppearCount = 0;
	for (const line of split(input)) {
		twiceAppearCount += atLeastOne(charRepeats(line)) ? 1 : 0;
		thriceAppearCount += atLeastOne(charRepeats(line, 3)) ? 1 : 0;
	}
	return twiceAppearCount * thriceAppearCount;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 5456 ~9ms
}
