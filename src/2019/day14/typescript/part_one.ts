import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';
import { Reaction } from './reaction.class';

export enum MainResource {
	ORE = 'ORE',
	FUEL = 'FUEL',
}

export type Resource = MainResource | string;

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

export const runner = (input: string): number | undefined => {
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

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 783895 ~22ms
}
