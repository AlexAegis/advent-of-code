import { bench, read, sum } from '@lib';
import { day, year } from '.';
import { parse } from './parse';
import { Reaction } from './reaction.class';

export enum MainResource {
	ORE = 'ORE',
	FUEL = 'FUEL'
}

export type Resource = MainResource | string;

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

	let cargo = 1000000000000;

	const surplus = new Map<string, number>();

	if (fuelReact) {
		console.log(fuelReact.to);
		// return rex.oreCost(surplus);

		let i = 0;
		let s = 0;
		let lf = 0;
		while (i === 0 || surplus.size !== 0) {
			lf = fuelReact.oreCost(surplus);
			s += lf;
			i++;

			if (i % 1000 === 0) {
				console.log(i, surplus.size);
			}
		}
		// i--;
		// 	s -= lf;

		const lel = Math.floor(cargo / s);
		console.log('i:', i, s, lel);
		cargo -= lel * s;

		i *= lel;
		while (cargo > 0) {
			const fc = fuelReact.oreCost(surplus);
			s += fc;
			cargo -= fc;
			i++;
		}

		console.log(lel * s);
		console.log(lel);

		return i - 1; // 82892753

		// console.log('Ore: ', oreReacts[0].toString(), 'COST: ', oreReacts[0].oreCost());
		// console.log('Ore: ', rex.toString(), 'COST: ', rex.oreCost(surplus));
		// 	console.log('Cost: ', fuelReact.indirectCost());
	}

	return null;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.0.txt'), runner)}`))(); // 31 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.3.txt'), runner)}`))(); // 31 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.4.txt'), runner)}`))(); // 31 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.5.txt'), runner)}`))(); // 165 ~0ms
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
