import { interval, Subject } from 'rxjs';
import { takeUntil, take, flatMap } from 'rxjs/operators';
import { Coord } from './coord.class';
import { Mine } from './mine.class';
import { reader } from './reader.function';

export const runner = async (input: 'example' | 'example_two' | 'input' = 'input'): Promise<Coord> =>
	new Promise<Coord>(async res => {
		const mine: Mine = await reader(input);
		const crash = new Subject<Coord>();
		interval()
			.pipe(
				takeUntil(crash),
				// tap(tick => mine.print(tick)),
				flatMap(() =>
					mine.carts.sort((a, b) =>
						a.position.y === b.position.y ? a.position.x - b.position.x : a.position.y - b.position.y
					)
				)
			)
			.subscribe(cart => cart.step(mine, crash));
		crash.pipe(take(1)).subscribe(coord => res(coord));
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`First crash happened at: ${await runner()}`);
		console.timeEnd();
	})(); // 28,107 ~340ms
}
