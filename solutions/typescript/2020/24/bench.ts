import { read } from '@lib';
import { defaultBench } from '@lib/benchmark';
import { add } from 'benny';
import { day, year } from '.';
import { runner as partOneRunner } from './part_one';
import { runner as partOneGraphRunner } from './part_one.graph';
import { runner as partTwoRunner } from './part_two';

defaultBench(
	'2020 - Day 24',
	add('Part One - Graph', async () => {
		const input = (await read(year, day)()).input;
		return () => partOneGraphRunner(input);
	}),
	add('Part One - Vec', async () => {
		const input = (await read(year, day)()).input;
		return () => partOneRunner(input);
	}),
	add('Part Two - Graph', async () => {
		const input = (await read(year, day)()).input;
		return () => partTwoRunner(input);
	})
);
