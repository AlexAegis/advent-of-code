import { bench, read } from '@lib';
import { is } from '@lib/functions';
import { Area, Vec2 } from '@lib/model';
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

export const nextState = (v: Vec2, map: Map<string, SeatState>, limit: Area): SeatState => {
	const nextVisible = dirs.map((dir) => {
		for (let next = v.add(dir); next.isWithin(limit); next.addMut(dir)) {
			if (map.has(next.toString())) {
				return map.get(next.toString());
			}
		}
		return undefined;
	});

	const occCount = nextVisible.filter((d) => d === SeatState.OCCUPIED).length;
	const me = map.get(v.toString()) ?? SeatState.FLOOR;
	if (me === SeatState.OCCUPIED && occCount >= 5) {
		return SeatState.EMPTY;
	} else if (me !== SeatState.OCCUPIED && occCount === 0) {
		return SeatState.OCCUPIED;
	} else {
		return me;
	}
};

export const tick = (map: Map<string, SeatState>, limit: Area): Map<string, SeatState> => {
	const nextMap = new Map<string, SeatState>();
	[...map.keys()].forEach((key) => {
		nextMap.set(key, nextState(new Vec2(key), map, limit));
	});
	return nextMap;
};

export const runner = (input: string): number => {
	const { seats, height, width } = parse(input);
	const limit: Area = { cornerA: Vec2.ORIGIN, cornerB: new Vec2(width, height) };

	let map = seats;

	for (;;) {
		const nextMap = tick(map, limit);
		if (map.isTheSameAs(nextMap)) {
			break;
		}
		map = nextMap;
	}

	return [...map.values()].filter(is(SeatState.OCCUPIED)).length;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 2149 ~1300ms
}
