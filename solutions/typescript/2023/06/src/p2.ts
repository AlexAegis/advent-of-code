import { quadratic, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parseAsOneRace } from './parse.js';

export const p2 = (input: string): number => {
	const race = parseAsOneRace(input);
	const [low, high] = quadratic(1, -race.time, race.distance);
	return Math.floor(high) - Math.ceil(low) + 1;
};

await task(p2, packageJson.aoc); // 46561107 ~7μs
