import { bench, read } from '@lib';
import { Coord } from '@lib/model/coord.class';
import { day, year } from '.';
import {
	parse,
	parseCommaSeparatedNumbers,
	parseNewLineAndCommaSeparatedNumbers,
	parseNewLineSeparatedNumbers
} from './parse';

export const runner = async (input: string) => {
	const p = parse(input);
	const map = new Map<string, Coord[]>();

	for (const wire of p) {
		wire.reduce((a, n) => {
			for (let d = 0; d < n.amount; d++) {
				const c = map.get(a.toString());
				if (c) {
					map.set(a.toString(), [...c, a]);
				} else {
					map.set(a.toString(), [a]);
				}
				a = new Coord(a).add(n.direction);
			}
			return a;
		}, new Coord(0, 0));
	}

	const short = [...map.values()]
		.filter(e => e.length > 1)
		.map(e => e[0])
		.filter(c => c.toString() !== '0,0')
		.reduce((acc, n) => {
			console.log(n);
			return acc === undefined || Coord.ORIGO.manhattan(n) <= Coord.ORIGO.manhattan(acc as Coord) ? n : acc;
		}, undefined as Coord | undefined);
	console.log(short);

	return Coord.ORIGO.manhattan(short as Coord);
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await runner('R8,U5,L5,D3\nU7,R6,D4,L4')}`))();
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1195 ~0ms
}
