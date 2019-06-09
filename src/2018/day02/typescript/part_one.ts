import { bench, reader } from '@root';
import { year, day } from '.';

/**
 * Returns how many character repeats exactly 'times' times in the given string
 *
 * @param line
 * @param times
 */
const charRepeats = (line: string, times: number = 2): number => {
	const processed: Map<string, number> = new Map();
	for (let letter of line) {
		if (!processed.has(letter)) {
			processed.set(letter, line.split(letter).length - 1);
		}
	}
	return [...processed].filter(([k, v]) => v === times).length;
};

const atLeastOne = (n: number): boolean => n >= 1;

export const runner = (input: string): number => {
	let twiceAppearCount = 0;
	let thriceAppearCount = 0;
	for (const line of input.split(/\r?\n/)) {
		twiceAppearCount += atLeastOne(charRepeats(line)) ? 1 : 0;
		thriceAppearCount += atLeastOne(charRepeats(line, 3)) ? 1 : 0;
	}
	return twiceAppearCount * thriceAppearCount;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 5456 ~8ms
}
