import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const lines = split(input);
	console.log('lines', lines);
	return 1;
};

// await task(p1, packageJson.aoc); // MQTPGLLDN ~0.29ms
await task(p2, packageJson.aoc, 'example.1.txt'); // MQTPGLLDN ~0.29ms
