import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';
import { Reaction } from './reaction.class';

export enum MainResource {
	ORE = 'ORE',
	FUEL = 'FUEL'
}

export type Resource = MainResource | string;

export const calcOreForSurplus = (surplus: Map<string, number>, reactions: Reaction[]): number => {
	return [...surplus.entries()].reduce((a, [k, v]) => {
		const m = new Map<string, number>();
		const ocm = reactions.find(r => r.to === k)?.oreCost(m) ?? 0;
		let ex = 0;
		if (m.size) {
			ex = calcOreForSurplus(m, reactions);
		}
		return ocm * v + a + ex;
	}, 0);
};

export const runner = async (input: string) => {
	const reactions = parse(input);
	const fuelReact = reactions.find(r => r.to === MainResource.FUEL);

	const oreReacts = reactions.filter(r => r.from.has(MainResource.ORE));
	const rex = reactions.find(r => r.to === 'AB');

	reactions.forEach(r => {
		reactions
			.filter(pre => r.from.has(pre.to))
			.map(pre => [pre, r.from.get(pre.to) as number])
			.forEach(([pre, q]) => {
				r.preceeding.add([pre as Reaction, q as number]);
			});
	});

	const surplus = new Map<string, number>();
	if (fuelReact) {
		console.log(fuelReact.to);
		// return rex.oreCost(surplus);
		const a = fuelReact.oreCost(surplus);
		const asd = calcOreForSurplus(surplus, reactions);
		console.log(surplus, asd);
		return a;

		// console.log('Ore: ', oreReacts[0].toString(), 'COST: ', oreReacts[0].oreCost());
		// console.log('Ore: ', rex.toString(), 'COST: ', rex.oreCost(surplus));
		// 	console.log('Cost: ', fuelReact.indirectCost());
	}

	return null;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 31 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.5.txt'), runner)}`))(); // 165 ~0ms
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
