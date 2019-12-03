import { bench, read } from '@lib';
import { Coord } from '@lib/model/coord.class';
import { observeOn } from 'rxjs/operators';
import { day, year } from '.';
import {
	parse,
	parseCommaSeparatedNumbers,
	parseNewLineAndCommaSeparatedNumbers,
	parseNewLineSeparatedNumbers
} from './parse';

export const runner = async (input: string) => {
	const p = parse(input);
	const map = new Map<string, { pos: Coord; step: number }[]>();
	// 	const longer = p.map(n => n.length).reduce((a, n) => n > a ? n : a, 0);
	//
	// 	for(let i = 0; i< longer; i++) {
	//
	// 	}

	for (const wire of p) {
		wire.reduce(
			(a, n) => {
				for (let d = 0; d < n.amount; d++) {
					a.c = new Coord(a.c).add(n.direction);
					a.steps += 1;
					const c = map.get(a.c.toString());
					if (c) {
						map.set(a.c.toString(), [...c, { pos: new Coord(a.c), step: a.steps }]);
					} else {
						map.set(a.c.toString(), [{ pos: new Coord(a.c), step: a.steps }]);
					}
				}
				return a;
			},
			{ c: new Coord(0, 0), steps: 0 }
		);
	}

	console.log('map', map);
	const short = [...map.values()]
		.filter(e => e.length > 1)
		.filter(([a, b]) => a.step + b.step !== 0)
		.reduce((acc, [a, b]) => {
			console.log('ASD,', a.step, b.step, a.step + b.step);
			return a.step + b.step <= acc ? a.step + b.step : acc;
		}, Infinity);
	console.log(short);

	return short;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await runner('R8,U5,L5,D3\nU7,R6,D4,L4')}`))();

	(async () =>
		console.log(
			`Result: ${await runner('R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83')}`
		))();
	/*
	(async () =>
		console.log(
			`Result: ${await runner(
				'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
			)}`
		))();
*/
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1195 ~0ms
}
// ! 7682
