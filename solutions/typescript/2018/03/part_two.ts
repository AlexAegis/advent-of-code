import { bench, read, split } from '@lib';
import { day, year } from '.';
import { interpret } from './interpret.function';
import { Claim } from './model/claim.interface';

export const runner = (input: string): number | undefined => {
	const fabric: Map<string, number[]> = new Map<string, number[]>(); // Contains each claim for each coordinate
	const claims: Claim[] = [];

	for (const line of split(input)) {
		const claim = interpret(line);
		claims.push(claim);
		for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
			for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
				const coordKey = `${i}_${j}`;
				const c: number[] = fabric.get(coordKey) || [];
				c.push(claim.id);
				fabric.set(coordKey, c);
			}
		}
	}

	for (const claim of claims) {
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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 382 ~234ms
}
