import { Claim } from './model/claim.interface';
import { interpret } from './interpret.function';
import { bench, reader } from '@root';
import { year, day } from '.';

export const runner = async (input: string) => {
	const fabric: Map<string, Array<number>> = new Map<string, Array<number>>(); // Contains each claim for each coordinate
	const claims: Array<Claim> = [];

	for (const line of input.split(/\r?\n/)) {
		const claim = interpret(line);
		claims.push(claim);
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

	let goodClaim: Claim;
	for (let claim of claims) {
		let good = true;
		for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
			for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
				good = good && fabric.get(`${i}_${j}`).length === 1;
			}
		}
		if (good) {
			goodClaim = claim;
			break;
		}
	}
	return goodClaim.id;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 382 ~234ms
}
