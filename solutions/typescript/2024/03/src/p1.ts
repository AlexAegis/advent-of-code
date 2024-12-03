import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const mulRegex = /mul\((\d+),(\d+)\)/g;

export const p1 = (input: string): number => {
	const mulMatches = [...input.matchAll(mulRegex)];

	return mulMatches.map((m) => parseInt(m[1] ?? '1', 10) * parseInt(m[2] ?? '1', 10)).sum();
};

await task(p1, packageJson.aoc); // 179834255 ~0.09ms
