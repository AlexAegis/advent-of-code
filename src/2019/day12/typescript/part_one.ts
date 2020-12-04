import { bench, read } from '@lib';
import { pairs } from '@lib/functions';
import { clamp } from '@lib/math';
import { day, year } from '.';
import { Moon } from './model';
import { parseLines } from './parse';

export const runner = (target = 1000) => (input: string): number => {
	const ms = parseLines(input).map((m) => new Moon(m));
	const ps = pairs(ms);
	for (let i = 0; i < target; i++) {
		ps.forEach(([a, b]) => {
			const x = clamp(b.pos.x - a.pos.x);
			a.vel.x += x;
			b.vel.x -= x;

			const y = clamp(b.pos.y - a.pos.y);
			a.vel.y += y;
			b.vel.y -= y;

			const z = clamp(b.pos.z - a.pos.z);
			a.vel.z += z;
			b.vel.z -= z;
		});
		ms.forEach((m) => m.step());
	}
	return ms.reduce((acc, m) => acc + m.totalEnergy(), 0);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner())}`))(); // 8625 ~3ms
}
