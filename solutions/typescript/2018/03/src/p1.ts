import { split, task } from '@alexaegis/advent-of-code-lib';
import type { Vec2String } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import { interpret } from './interpret.function.js';

export const p1 = (input: string): number => {
	const fabric: Map<Vec2String, number[]> = new Map<Vec2String, number[]>(); // Contains each claim for each coordinate
	for (const line of split(input)) {
		const claim = interpret(line);
		for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
			for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
				const coordKey: Vec2String = `${i},${j}`;
				const claims: number[] = fabric.get(coordKey) ?? [];
				claims.push(claim.id);
				fabric.set(coordKey, claims);
			}
		}
	}
	return [...fabric].count(([_, v]) => v.length >= 2);
};

await task(p1, packageJson.aoc); // 116920 ~265ms
