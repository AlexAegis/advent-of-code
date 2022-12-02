import { task } from '@alexaegis/advent-of-code-lib';
import { pairs } from '@alexaegis/advent-of-code-lib/functions';
import { clamp, lcm } from '@alexaegis/advent-of-code-lib/math';
import { Vec3 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { Moon } from './model/moon.class.js';
import { parseLines } from './parse.js';

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
		if (ms.every((m) => m.vel.equals(Vec3.ORIGIN))) {
			return 2 + i * 2;
		}
	}
};

export const p2 = (input: string): number => {
	const ms = parseLines(input).map((m) => new Moon(m));
	const ps = pairs(ms);
	const cx = findCycle(ms, ps, 'x');
	const cy = findCycle(ms, ps, 'y');
	const cz = findCycle(ms, ps, 'z');
	return lcm(lcm(cx, cy), cz);
};

await task(p2, packageJson.aoc); // 332477126821644 ~89ms
