import { bench, read } from '@lib';
import { Coord } from '@lib/model/coord.class';
import { directionMarkerAssociations } from '@lib/model/direction-marker-associations.const';
import { day, year } from '.';

export const runner = async (input: string) =>
	input.split(``).reduce(
		(acc, next) => {
			acc.current.add(directionMarkerAssociations[next]);
			const c = acc.current.toString();
			acc.locations.set(c, (acc.locations.get(c) || 0) + 1);
			return acc;
		},
		{ locations: new Map<string, number>([[new Coord(0, 0).toString(), 1]]), current: new Coord(0, 0) }
	).locations.size;

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 2572 ~2.6ms
}
