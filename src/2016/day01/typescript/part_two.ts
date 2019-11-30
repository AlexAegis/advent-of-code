import { bench, read } from '@root/lib/typescript';
import { Coord } from '@root/lib/typescript/model/coord.class';
import { Direction } from '@root/lib/typescript/model/direction.class';
import { day, year } from '.';

export const runner = (input: string) => {
	const acc = { position: Coord.ORIGO, direction: Direction.NORTH, history: new Set<string>() };
	loop: for (const next of input.split(', ')) {
		if (next[0] === 'R') acc.direction = acc.direction.right();
		if (next[0] === 'L') acc.direction = acc.direction.left();
		for (let i = 0; i < Number(next.substring(1)); i++) {
			acc.position.add(acc.direction);
			const coordString = acc.position.toString();
			if (acc.history.has(coordString)) break loop;
			acc.history.add(coordString);
		}
	}
	return acc.position.manhattan(Coord.ORIGO);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 159 ~0.48ms
}
