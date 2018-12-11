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

const interpret = (line: string): Claim => {
	let parts = line.split(/#|@|,|:|x/).map(e => e.trim());
	return {
		id: Number(parts[1]),
		starting: { x: Number(parts[2]), y: Number(parts[3]) },
		size: { x: Number(parts[4]), y: Number(parts[5]) }
	};
};

const read = new Promise<number>(async res => {
	const fabric: Map<Coord, Array<number>> = new Map(); // Contains each claim for each coordinate
	const reader = createInterface({
		input: createReadStream('src/2018/day3/input.txt')
	});
	reader
		.on('line', (line: string) => {
			let claim = interpret(line);
			for (let i = claim.starting.x; i < claim.starting.x + claim.size.x; i++) {
				for (let j = claim.starting.y; j < claim.starting.y + claim.size.y; j++) {
					const coord: Coord = { x: i, y: j };
					let claims: Array<number> = [];
					if (fabric.has(coord)) {
						// overlap
						claims = fabric.get(coord);
					}
					claims.push(claim.id);
					fabric.set(coord, claims);
				}
			}
		})
		.on('close', () => {
			console.log(`File read.`);
			res([...fabric].filter(([k, v]) => v.length >= 2).length);
		});
});

(async function() {
	console.log(`Result: ${await read}`);
})(); //
