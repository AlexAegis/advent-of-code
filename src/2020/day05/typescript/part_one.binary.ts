import { bench, max, read, split } from '@lib';
import { usingMap } from '@lib/functions';
import { day, year } from '.';
import { PlanePartition } from './part_one';

const partitionMap: Record<PlanePartition, '0' | '1'> = {
	F: '0',
	B: '1',
	L: '0',
	R: '1',
};

export const calculateSeatId = (line: string): number =>
	parseInt(([...line] as PlanePartition[]).map(usingMap(partitionMap)).join(''), 2);

export const runner = (input: string): number => split(input).map(calculateSeatId).reduce(max);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 848 ~0.8ms
}
