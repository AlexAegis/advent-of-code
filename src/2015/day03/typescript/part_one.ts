import { bench, read } from '@lib';
import { directionMarkerAssociations } from '@lib/model/direction-marker-associations.const';
import { Vec2 } from '@lib/model/vec2.class';
import { day, year } from '.';

export const runner = (input: string): number =>
	input.split(``).reduce(
		(acc, next) => {
			acc.current.addMut(directionMarkerAssociations[next]);
			const c = acc.current.toString();
			acc.locations.set(c, (acc.locations.get(c) || 0) + 1);
			return acc;
		},
		{
			locations: new Map<string, number>([[new Vec2(0, 0).toString(), 1]]),
			current: new Vec2(0, 0),
		}
	).locations.size;

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 2572 ~2.6ms
}
