import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';
import type { Reaction } from './reaction.class.js';
import { MainResource } from './resource.type.js';

export const p2 = (input: string): number | undefined => {
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

	let cargo = 1000000000000;

	const surplus = new Map<string, number>();
	// surplus.set('ORE', cargo);
	// const asd = calcOreForSurplus(surplus, reactions);
	// console.log('', asd);

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
				console.log(i, surplus.size, lf);
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

	return undefined;
};

await task(p2, packageJson.aoc, 'example.5.txt'); // 165 ~0ms
