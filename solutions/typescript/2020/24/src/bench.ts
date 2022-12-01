import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { defaultBench } from '@alexaegis/advent-of-code-lib/benchmark';
import { add } from 'benny';
import packageJson from '../package.json' assert { type: 'json' };
import { p1g } from './p1.graph.js';
import { p1 } from './p1.js';
import { p2 } from './p2.js';

defaultBench(
	'2020 - Day 24',
	add('Part One - Graph', async () => {
		const { input } = await loadTaskResources(packageJson.aoc);
		return () => p1g(input);
	}),
	add('Part One - Vec', async () => {
		const { input } = await loadTaskResources(packageJson.aoc);
		return () => p1(input);
	}),
	add('Part Two - Graph', async () => {
		const { input } = await loadTaskResources(packageJson.aoc);
		return () => p2(input);
	})
);
