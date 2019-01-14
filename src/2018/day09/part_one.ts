import { reader } from './reader.function';
import { interval, Subject } from 'rxjs';
import { takeUntil, take, flatMap, tap } from 'rxjs/operators';

export const runner = async (input: 'example' | 'input' = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const setup = await reader(input);

		let ring: Array<number> = [];
		let current: number = 0;

		interval()
			.pipe(take(26))
			.subscribe(marble => {
				if (marble !== 0 && marble % 23 === 0) {
					current = current - 7;
					if (current < 0) {
						current = ring.length + current;
					}
					let removed = ring.splice(current - 1, 1);
				} else {
					ring.splice(current + 1, 0, marble);
					current = (current + 2) % ring.length;
				}
				console.log(`${JSON.stringify(ring)}`);
			});
		res('0');
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); //  ~ms
}
