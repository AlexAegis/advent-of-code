import { bench, read } from '@lib';
import { Coord } from '@lib/model';
import { listenerCount } from 'cluster';
import { day, year } from '.';
import { Field, FieldType, intoMap, parseLines } from './parse';
import { mostLos } from './part_one';

export const runner = async (input: string) => {
	const p = parseLines(input);
	const lx = p.length;
	const ly = p[0].length;
	console.log(lx, ly);
	const targets = [];
	for (let x = 0; x < lx; x++) {
		targets.push(new Coord(x, 0));
	}

	for (let y = 0; y < ly; y++) {
		targets.push(new Coord(lx, y));
	}

	for (let x = lx; x > 0; x--) {
		targets.push(new Coord(x, ly));
	}

	for (let y = ly; y > 0; y--) {
		targets.push(new Coord(0, y));
	}

	console.log(targets.map(a => a.toString()).join('; '));

	// const start = new Coord(8, 3);

	// const start = new Coord(13, 11);

	// Rotating targets
	// while (targets[0].y !== 0 && targets[0].x !== start.x) {
	// 	targets.push(targets.shift() as Coord);
	// }

	const map = intoMap(p);
	let flat = [...map.values()];
	const start = mostLos(flat).pos;
	console.log('AST NUM', flat.length);

	// https://stackoverflow.com/questions/51074984/sorting-according-to-clockwise-point-coordinates
	let lastDestr: Coord | undefined;
	let d = 0;
	o: while (d < 400 && flat.length > 0) {
		// console.log('-------------fl', flat.map(s => s.pos.toString()).join('; '));
		// console.log('.............os', los.map(s => s.toString()).join('; '));

		const sortedLol = start
			.los2(flat.map(a => a.pos))
			.map(c => ({ c, angle: (Math.atan2(c.y - start.y, c.x - start.x) * 180) / Math.PI }))
			.sort((a, b) => a.angle - b.angle);

		console.log('sLolLEn', flat.length, sortedLol.length, ' - = ', flat.length - sortedLol.length);

		if (sortedLol[0] === undefined) {
			break o;
		}
		while (sortedLol[0].angle < -90) {
			// console.log(sortedLol.map(s => `${s.angle.toString()} ${s.c.toString()}`).join('; '));
			sortedLol.push(sortedLol.shift() as any);
		}
		const sorted = sortedLol.map(a => a.c);

		// console.log(sorted.map(s => s.toString()).join('; '));

		for (const s of sorted) {
			d++;
			lastDestr = s;
			if (s.x === 8 && s.y === 2) {
				console.log('SHOULD BE', s);
			}

			if (s.x === 2 && s.y === 8) {
				console.log('A SHOULD BE', s);
			}
			console.log('d', d, 's', s.toString());
			if (d === 200) {
				break o;
			}
		}

		flat = flat.filter(fl => !sorted.find(l => l.equal(fl.pos)));
	}

	// console.log(p, map, flat);
	return lastDestr ? lastDestr.x * 100 + lastDestr.y : -1;
	// return flat.reduce((a, n) => (n.lineOfSight > a.lineOfSight ? n : a), flat[0]).lineOfSight;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1205 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 8 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.2.txt'), runner)}`))(); // 33 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.3.txt'), runner)}`))(); // 35 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.4.txt'), runner)}`))(); // 802 ~0ms// (async () => console.log(`Result: ${await bench(read(year, day, 'example.5.txt'), runner)}`))(); // 210 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.5.txt'), runner)}`))(); // 802 ~0ms// (async () => console.log(`Result: ${await bench(read(year, day, 'example.5.txt'), runner)}`))(); // 210 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.6.txt'), runner)}`))(); // 802 ~0ms// (async () => console.log(`Result: ${await bench(read(year, day, 'example.5.txt'), runner)}`))(); // 210 ~0ms
}
