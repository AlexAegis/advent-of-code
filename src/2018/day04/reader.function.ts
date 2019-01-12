import { Event } from './event.interface';
import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { interpret } from './interpret.function';

export const reader = async (input: 'example' | 'input' = 'input') =>
	new Promise<Array<Event>>(res => {
		const events: Array<Event> = [];
		createInterface({
			input: createReadStream(`src/2018/day04/${input}.txt`)
		})
			.on('line', (line: string) => events.push(interpret(line)))
			.on('close', () =>
				res(
					events.sort((a, b) => {
						return a.year - b.year !== 0
							? a.year - b.year
							: a.month - b.month !== 0
							? a.month - b.month
							: a.day - b.day !== 0
							? a.day - b.day
							: a.hour - b.hour !== 0
							? a.hour - b.hour
							: a.minute - b.minute !== 0
							? a.minute - b.minute
							: 0;
					})
				)
			);
	});
