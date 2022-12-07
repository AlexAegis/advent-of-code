import { split, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { ExpeditionFileSystem } from './expedition-file-system.class.js';

const TOTAL_DISK_SPACE = 70000000;
const REQUIRED_FREE_SPACE = 30000000;

export const p2 = (input: string): number => {
	const fs = new ExpeditionFileSystem().interpret(split(input));

	const currentSize = fs.root.size;
	const currentFreeSpace = TOTAL_DISK_SPACE - currentSize;
	const freeTreshold = REQUIRED_FREE_SPACE - currentFreeSpace;

	const deleteCandidates = [...fs.root.walkDirectories()]
		.filter((dir) => dir.size >= freeTreshold)
		.sort((a, b) => a.size - b.size);

	return deleteCandidates[0].size;
};

await task(p2, packageJson.aoc); // 8319096 ~0.65ms
