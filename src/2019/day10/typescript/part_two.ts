import { bench, read } from '@lib';
import { rotateArray } from '@lib/functions/rotate-array.function';
import { day, year } from '.';
import { parseLines } from './parse';
import { mostLos } from './part_one';

export const runner = (input: string): number | undefined => {
	const p = parseLines(input);
	let flat = [...p.values()];
	const start = mostLos(flat)?.coord;
	let d = 0;
	if (start) {
		while (d < 200) {
			const sorted = rotateArray(
				start
					.los(flat)
					.map(c => ({ c, angle: start.angle(c) }))
					.sort((a, b) => a.angle - b.angle),
				(_, c) => (c?.angle ?? 0) < -90
			).map(a => a.c);

			for (const s of sorted) {
				d++;
				if (d === 200) {
					return s.x * 100 + s.y;
				}
			}

			flat = flat.filter(fl => !sorted.find(l => l.equals(fl)));
		}
	}
	return undefined;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1205 ~122ms
}
