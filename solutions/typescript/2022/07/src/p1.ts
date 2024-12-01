import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { ExpeditionFileSystem } from './expedition-file-system.class.js';

export const p1 = (input: string): number => {
	const fs = new ExpeditionFileSystem().interpret(split(input));
	return [...fs.root.walkDirectories()]
		.map((dir) => dir.size)
		.filter((size) => size <= 100_000)
		.sum();
};

await task(p1, packageJson.aoc); // 1743217 ~0.67ms
