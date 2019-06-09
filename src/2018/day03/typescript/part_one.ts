import { interpret } from './interpret.function';
import { bench, reader, split } from '@root';
import { year, day } from '.';

export const runner = async (input: string) => {
	const fabric: Map<string, Array<number>> = new Map<string, Array<number>>(); // Contains each claim for each coordinate
	for (const line of split(input)) {
		let claim = interpret(line);
		for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
			for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
				const coordKey: string = `${i}_${j}`;
				const claims: Array<number> = fabric.get(coordKey) || [];
				claims.push(claim.id);
				fabric.set(coordKey, claims);
			}
		}
	}
	return [...fabric].filter(([_, v]) => v.length >= 2).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 116920 ~265ms
}
