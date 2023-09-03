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
		if (m.size > 0) {
			ex = calcOreForSurplus(m, reactions);
		}
		return ocm * v + a + ex;
	}, 0);
};

export const p1 = (input: string): number | undefined => {
	const reactions = parse(input);
	const fuelReact = reactions.find((r) => r.to === (MainResource.FUEL as string));

	for (const r of reactions) {
		for (const [pre, q] of reactions
			.filter((pre) => r.from.has(pre.to))
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			.map((pre) => [pre, r.from.get(pre.to)!])) {
			r.preceeding.add([pre as Reaction, q as number]);
		}
	}

	const surplus = new Map<string, number>();
	if (fuelReact) {
		const a = fuelReact.oreCost(surplus);
		// const asd = calcOreForSurplus(surplus, reactions);
		return a;
	}

	return undefined;
};

await task(p1, packageJson.aoc); // 783895 ~22ms
