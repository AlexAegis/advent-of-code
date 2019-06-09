import { Claim } from './model/claim.interface';
import { interpret } from './interpret.function';
import { bench, reader, split } from '@root';
import { year, day } from '.';

export const runner = (input: string): number | undefined => {
	const fabric: Map<string, Array<number>> = new Map<string, Array<number>>(); // Contains each claim for each coordinate
	const claims: Array<Claim> = [];

	for (const line of split(input)) {
		const claim = interpret(line);
		claims.push(claim);
		for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
			for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
				const coordKey: string = `${i}_${j}`;
				const claims: Array<number> = fabric.get(coordKey) || [];
				claims.push(claim.id);
				fabric.set(coordKey, claims);
			}
		}
	}

	for (let claim of claims) {
		let good = true;
		for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
			for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
				good = good && (fabric.get(`${i}_${j}`) || []).length === 1;
			}
		}
		if (good) {
			return claim.id;
		}
	}
	return undefined;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 382 ~234ms
}
