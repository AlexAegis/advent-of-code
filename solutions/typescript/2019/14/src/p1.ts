import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';
import type { Reaction } from './reaction.class.js';
import { MainResource } from './resource.type.js';

export const calcOreForSurplus = (surplus: Map<string, number>, reactions: Reaction[]): number => {
	return [...surplus.entries()].reduce((a, [k, v]) => {
		const m = new Map<string, number>();
		const ocm = reactions.find((r) => r.to === k)?.oreCost(m) ?? 0;
		let ex = 0;
		if (m.size) {
			ex = calcOreForSurplus(m, reactions);
		}
		return ocm * v + a + ex;
	}, 0);
};

export const p1 = (input: string): number | undefined => {
	const reactions = parse(input);
	const fuelReact = reactions.find((r) => r.to === MainResource.FUEL);

	reactions.forEach((r) => {
		reactions
			.filter((pre) => r.from.has(pre.to))
			.map((pre) => [pre, r.from.get(pre.to) as number])
			.forEach(([pre, q]) => {
				r.preceeding.add([pre as Reaction, q as number]);
			});
	});

	const surplus = new Map<string, number>();
	if (fuelReact) {
		const a = fuelReact.oreCost(surplus);
		// const asd = calcOreForSurplus(surplus, reactions);
		return a;
	}

	return undefined;
};

await task(p1, packageJson.aoc); // 783895 ~22ms
