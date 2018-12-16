import { createReadStream } from 'fs';
import { createInterface } from 'readline';

/**
 * Returns how many character repeats exactly 'times' times in the given string
 *
 * @param line
 * @param times
 */
const charRepeats = (line: string, times: number = 2): number => {
	let result = 0;
	const processed: Map<string, number> = new Map();
	for (let letter of line) {
		if (!processed.has(letter)) {
			processed.set(letter, line.split(letter).length - 1);
		}
	}
	return [...processed].filter(([k, v]) => v === times).length;
};

const atLeastOne = (n: number): boolean => n && n >= 1;

export const read = new Promise<number>(async res => {
	let twiceAppearCount = 0;
	let thriceAppearCount = 0;
	const reader = createInterface({
		input: createReadStream('src/2018/day2/input.txt')
	});
	reader
		.on('line', (line: string) => {
			twiceAppearCount += atLeastOne(charRepeats(line)) ? 1 : 0;
			thriceAppearCount += atLeastOne(charRepeats(line, 3)) ? 1 : 0;
		})
		.on('close', () => {
			res(twiceAppearCount * thriceAppearCount);
		});
});

// IIFEs rule!
(async () => console.log(`Resulting checksum: ${await read}`))(); // 5456
