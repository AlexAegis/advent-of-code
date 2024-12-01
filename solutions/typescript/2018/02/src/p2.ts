import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): string | undefined => {
	const lineCache: string[] = [];
	for (const line of input.split(/\r?\n/)) {
		for (const cachedLine of lineCache) {
			let matchingChars = 0;
			let notMatchingPos = -1;
			for (let i = 0; i < cachedLine.length; i++) {
				if (line.charAt(i) === cachedLine.charAt(i)) {
					matchingChars++;
				} else {
					notMatchingPos = i;
				}
			}
			if (matchingChars + 1 === cachedLine.length) {
				return (
					line.slice(0, notMatchingPos) + line.slice(notMatchingPos + 1, line.length + 1)
				);
			}
		}
		lineCache.push(line);
	}
	return undefined;
};

await task(p2, packageJson.aoc); // megsdlpulxvinkatfoyzxcbvq ~9.6ms
