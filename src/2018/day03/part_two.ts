import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { Claim } from './claim.interface';
import { interpret } from './interpret.function';

export const runner = async (input: 'example' | 'input' = 'input') =>
	new Promise<number>(res => {
		const fabric: Map<string, Array<number>> = new Map<string, Array<number>>(); // Contains each claim for each coordinate
		const reader = createInterface({
			input: createReadStream(`src/2018/day03/${input}.txt`)
		});
		const claims: Array<Claim> = [];
		reader
			.on('line', (line: string) => {
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
			})
			.on('close', () => {
				let goodClaim: Claim;
				// Absolutely barbaric
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
				res(goodClaim.id);
			});
	});

if (require.main === module) {
	console.time();
	(async () => {
		console.log(`Resulting checksum: ${await runner()}`);
		console.timeEnd();
	})(); // 382 ~240ms
}
