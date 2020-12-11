import { bench, read } from '@lib';
import { is } from '@lib/functions';
import { Vec2 } from '@lib/model';
import { day, year } from '.';
import { parse, SeatState } from './parse.function';

const dirs = [
	new Vec2(0, 1),
	new Vec2(1, 1),
	new Vec2(1, 0),
	new Vec2(1, -1),
	new Vec2(0, -1),
	new Vec2(-1, -1),
	new Vec2(-1, 0),
	new Vec2(-1, 1),
];

export const nextState = (v: Vec2, map: Map<string, SeatState>): SeatState => {
	const occCount = dirs.filter((d) => map.get(v.add(d).toString()) === SeatState.OCCUPIED).length;
	const me = map.get(v.toString()) ?? SeatState.FLOOR;
	if (me === SeatState.OCCUPIED && occCount >= 4) {
		return SeatState.EMPTY;
	} else if (me !== SeatState.OCCUPIED && occCount === 0) {
		return SeatState.OCCUPIED;
	} else {
		return me;
	}
};

export const tick = (map: Map<string, SeatState>): Map<string, SeatState> => {
	const nextMap = new Map<string, SeatState>();
	[...map.keys()].forEach((key) => {
		nextMap.set(key, nextState(new Vec2(key), map));
	});
	return nextMap;
};

export const areTheSameMaps = <K, V>(a: Map<K, V>, b: Map<K, V>): boolean => {
	return [...a.keys()].every((key) => a.get(key) === b.get(key));
};

export const runner = (input: string): number => {
	const { seats } = parse(input);

	let map = seats;

	for (;;) {
		const nextMap = tick(map);
		if (map.isTheSameAs(nextMap)) {
			break;
		}
		map = nextMap;
	}

	return [...map.values()].filter(is(SeatState.OCCUPIED)).map((a) => a).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 2406 ~900ms
}
