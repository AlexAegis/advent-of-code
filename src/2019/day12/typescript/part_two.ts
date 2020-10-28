import { bench, read } from '@lib';
import { clamp, lcm, pairs } from '@lib/functions';
import { Vec3 } from '@lib/model/vec3.class';
import { day, year } from '.';
import { Moon } from './model';
import { parseLines } from './parse';

// export const planeState = (moons: Moon[], plane: 'x' | 'y' | 'z'): string =>
// 	moons.map(m => `${m.pos[plane]},${m.vel[plane]}`).join(';');

export const findCycle = (ms: Moon[], ps: Moon[][], plane: 'x' | 'y' | 'z'): number | undefined => {
	for (let i = 0; ; i++) {
		ps.forEach(([a, b]) => {
			const d = clamp(b.pos[plane] - a.pos[plane]);
			a.vel[plane] += d;
			b.vel[plane] -= d;
		});
		ms.forEach((m) => m.step(plane));
		if (ms.every((m) => m.vel.equals(Vec3.ORIGO))) {
			return 2 + i * 2;
		}
	}
};

export const runner = (input: string): number => {
	const ms = parseLines(input).map((m) => new Moon(m));
	const ps = pairs(ms);
	const cx = findCycle(ms, ps, 'x');
	const cy = findCycle(ms, ps, 'y');
	const cz = findCycle(ms, ps, 'z');
	return lcm(lcm(cx, cy), cz);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 332477126821644 ~89ms
}
