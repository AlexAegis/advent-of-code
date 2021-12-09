import { read } from '@lib';
import { defaultBench } from '@lib/benchmark';
import { add } from 'benny';
import { day, year } from '.';
import { runner as partOneRunner } from './part_one';
import { runner as partTwoRunner } from './part_two';

defaultBench(
	'2021 - Day 9',
	add('Part One', async () => {
		const input = (await read(year, day)()).input;
		return () => partOneRunner(input);
	}),
	add('Part Two', async () => {
		const input = (await read(year, day)()).input;
		return () => partTwoRunner(input);
	})
);
