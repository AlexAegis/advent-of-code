import { bench, read } from '@lib';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';

export const runner = (input: string): number => {
	const acc = {
		position: Vec2.ORIGIN.clone(),
		direction: Direction.NORTH,
		history: new Set<string>(),
	};
	loop: for (const next of input.split(', ')) {
		if (next[0] === 'R') acc.direction = acc.direction.right();
		else if (next[0] === 'L') acc.direction = acc.direction.left();
		for (let i = 0; i < Number(next.substring(1)); i++) {
			acc.position.addMut(acc.direction);
			const coordString = acc.position.toString();
			if (acc.history.has(coordString)) break loop;
			acc.history.add(coordString);
		}
	}
	return acc.position.manhattan(Vec2.ORIGIN);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 159 ~0.48ms
}
