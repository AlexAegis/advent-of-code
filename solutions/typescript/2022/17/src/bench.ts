import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { defaultBench } from '@alexaegis/advent-of-code-lib/benchmark';
import { add } from 'benny';
import packageJson from '../package.json';
import { p1 } from './p1.js';
import { p2 } from './p2.js';

await defaultBench(
	'2022 - Day 17',
	add('Part One', async () => {
		const { input } = await loadTaskResources(packageJson.aoc);
		return () => p1(input);
	}),
	add('Part Two', async () => {
		const { input } = await loadTaskResources(packageJson.aoc);
		return () => p2(input);
	})
);
