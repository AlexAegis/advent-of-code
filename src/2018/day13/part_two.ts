import { reader } from './reader.function';
import { interval, Subject } from 'rxjs';
import { flatMap, takeWhile } from 'rxjs/operators';
import { Coord } from './coord.class';
import { Mine } from './mine.class';

export const runner = async (input: 'example' | 'example_two' | 'input' = 'input'): Promise<Coord> =>
	new Promise<Coord>(async res => {
		const mine: Mine = await reader(input);
		const crash = new Subject<Coord>();

		interval()
			.pipe(
				takeWhile(tick => mine.carts.length > 1),
				// tap(tick => (input !== 'input' ? mine.print(tick) : undefined)),
				flatMap(tick =>
					mine.carts.sort((a, b) =>
						a.position.y === b.position.y ? a.position.x - b.position.x : a.position.y - b.position.y
					)
				)
			)
			.subscribe(cart => cart.step(mine, crash))
			.add(() => {
				input !== 'input' ? mine.print(0) : undefined;
				res(mine.carts[0].position);
			});
		crash.pipe(takeWhile(tick => mine.carts.length > 1)).subscribe(coord => {
			mine.crashes.push(coord);
			console.log(`Crash happened on: ${coord}`);
		});
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`Final survivors position is: ${await runner()}`);
		console.timeEnd();
	})(); // 36,123 ~20000ms
}
