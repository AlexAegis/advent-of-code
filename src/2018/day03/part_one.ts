import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { interpret } from './interpret.function';

export const runner = async (input: 'example' | 'input' = 'input') =>
	new Promise<number>(res => {
		const fabric: Map<string, Array<number>> = new Map<string, Array<number>>(); // Contains each claim for each coordinate
		const reader = createInterface({
			input: createReadStream(`src/2018/day03/${input}.txt`)
		});
		reader
			.on('line', (line: string) => {
				let claim = interpret(line);
				for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
					for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
						const coordKey: string = `${i}_${j}`; // I used string as keys as the coordinates themselves because even if the object looks the same as the key, it's not the exact same key.
						let claims: Array<number> = [];
						if (fabric.has(coordKey)) {
							claims = fabric.get(coordKey);
						}
						claims.push(claim.id);
						fabric.set(coordKey, claims);
					}
				}
			})
			.on('close', () => res([...fabric].filter(([k, v]) => v.length >= 2).length));
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`Resulting checksum: ${await runner()}`);
		console.timeEnd();
	})(); // 116920 ~290ms
}
