import { interpret } from './interpret.function';
import { bench } from '@root/bench.function';
import { reader } from '@root/reader.function';
import { year, day } from '.';

export const runner = async (input: string) => {
	const fabric: Map<string, Array<number>> = new Map<string, Array<number>>(); // Contains each claim for each coordinate
	for (const line of input.split(/\r?\n/)) {
		let claim = interpret(line);
		for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
			for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
				const coordKey: string = `${i}_${j}`;
				let claims: Array<number> = [];
				if (fabric.has(coordKey)) {
					claims = fabric.get(coordKey);
				}
				claims.push(claim.id);
				fabric.set(coordKey, claims);
			}
		}
	}
	return [...fabric].filter(([k, v]) => v.length >= 2).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 116920 ~265ms
}
