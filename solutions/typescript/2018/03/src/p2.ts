import { split, task } from '@alexaegis/advent-of-code-lib';
import type { Vec2String } from '@alexaegis/advent-of-code-lib/model';
import { interpret } from './interpret.function.js';
import type { Claim } from './model/claim.interface.js';

import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number | undefined => {
	const fabric: Map<Vec2String, number[]> = new Map<Vec2String, number[]>(); // Contains each claim for each coordinate
	const claims: Claim[] = [];

	for (const line of split(input)) {
		const claim = interpret(line);
		claims.push(claim);
		for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
			for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
				const coordKey: Vec2String = `${i},${j}`;
				const c: number[] = fabric.get(coordKey) ?? [];
				c.push(claim.id);
				fabric.set(coordKey, c);
			}
		}
	}

	for (const claim of claims) {
		let good = true;
		for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
			for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
				good = good && (fabric.get(`${i},${j}`) ?? []).length === 1;
			}
		}
		if (good) {
			return claim.id;
		}
	}
	return undefined;
};

await task(p2, packageJson.aoc); // 382 ~234ms
