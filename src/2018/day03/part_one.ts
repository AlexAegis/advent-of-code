import { createReadStream } from 'fs';
import { createInterface } from 'readline';

interface Claim {
	id: number;
	starting: Coord;
	size: Coord;
}

interface Coord {
	x: number;
	y: number;
}

// `${parts[4]}_${parts[5]}`
const interpret = (line: string): Claim => {
	let parts = line.split(/#|@|,|:|x/).map(e => e.trim());
	return {
		id: Number(parts[1]),
		starting: { x: Number(parts[2]), y: Number(parts[3]) },
		size: { x: Number(parts[4]), y: Number(parts[5]) }
	};
};

export const read = new Promise<number>(res => {
	const fabric: Map<string, Array<number>> = new Map<string, Array<number>>(); // Contains each claim for each coordinate
	const reader = createInterface({
		input: createReadStream('src/2018/day3/input.txt')
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
		.on('close', () => {
			console.log(`File read.`);
			res([...fabric].filter(([k, v]) => v.length >= 2).length);
		});
});

(async () => console.log(`Result: ${await read}`))(); // 116920
