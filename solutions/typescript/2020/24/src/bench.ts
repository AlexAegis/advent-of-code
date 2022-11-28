import { read } from '@alexaegis/advent-of-code-lib';
import { defaultBench } from '@alexaegis/advent-of-code-lib/benchmark';
import { add } from 'benny';
import packageJson from '../package.json' assert { type: 'json' };
import { runner as partOneGraphRunner } from './p1.graph.js';
import { runner as partOneRunner } from './p1.js';
import { runner as partTwoRunner } from './p2.js';

defaultBench(
	'2020 - Day 24',
	add('Part One - Graph', async () => {
		const input = (await read(packageJson.aoc.year, packageJson.aoc.day)()).input;
		return () => partOneGraphRunner(input);
	}),
	add('Part One - Vec', async () => {
		const input = (await read(packageJson.aoc.year, packageJson.aoc.day)()).input;
		return () => partOneRunner(input);
	}),
	add('Part Two - Graph', async () => {
		const input = (await read(packageJson.aoc.year, packageJson.aoc.day)()).input;
		return () => partTwoRunner(input);
	})
);
