import { split, task } from '@alexaegis/advent-of-code-lib';
import { usingMap } from '@alexaegis/advent-of-code-lib/functions';
import { max } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };
import type { PlanePartition } from './p1.js';

const partitionMap: Record<PlanePartition, '0' | '1'> = {
	F: '0',
	B: '1',
	L: '0',
	R: '1',
};

export const calculateSeatId = (line: string): number =>
	parseInt(([...line] as PlanePartition[]).map(usingMap(partitionMap)).join(''), 2);

export const p1 = (input: string): number => split(input).map(calculateSeatId).reduce(max);

await task(p1, packageJson.aoc); // 848 ~0.8ms
