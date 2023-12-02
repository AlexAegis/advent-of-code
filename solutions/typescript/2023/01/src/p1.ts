import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	return input
		.lines(false)
		.map((line) => {
			let firstDigit: string | undefined;
			let lastDigit: string | undefined;
			for (let i = 0; i < line.length; i++) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const maybeFirstDigit = line[i]!;
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const maybeLastDigit = line[line.length - i - 1]!;

				if (firstDigit === undefined && /\d/.test(maybeFirstDigit)) {
					firstDigit = maybeFirstDigit;
				}

				if (lastDigit === undefined && /\d/.test(maybeLastDigit)) {
					lastDigit = maybeLastDigit;
				}

				if (firstDigit !== undefined && lastDigit !== undefined) {
					break;
				}
			}

			return ((firstDigit ?? '') + (lastDigit ?? '')).toInt();
		})
		.sum();
};
await task(p1, packageJson.aoc); // 54644 ~0.19ms
