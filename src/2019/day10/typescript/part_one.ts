import { bench, read } from '@lib';
import { Coord } from '@lib/model';
import { day, year } from '.';
import { Field, FieldType, intoMap, parseLines } from './parse';

export const mostLos = (flat: Field[]): Field => {
	flat.forEach(f => {
		f.lineOfSight = flat
			.filter(fo => !fo.pos.equal(f.pos))
			.map(o => [...f.pos.reach(o.pos)].filter(l => flat.find(fl => fl.pos.equal(l))).length)
			.filter(n => n === 0).length;
	});
	return flat.reduce((a, n) => (n.lineOfSight > a.lineOfSight ? n : a), flat[0]);
};
export const runner = async (input: string) => {
	const p = parseLines(input);

	const map = intoMap(p);
	const flat = [...map.values()];

	return mostLos(flat).lineOfSight;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 230 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 8 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.2.txt'), runner)}`))(); // 33 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.3.txt'), runner)}`))(); // 35 ~0ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.4.txt'), runner)}`))(); // 41 ~0ms// (async () => console.log(`Result: ${await bench(read(year, day, 'example.5.txt'), runner)}`))(); // 210 ~0ms
}
