import { bench, read } from '@alexaegis/advent-of-code-lib';
import {
	CircularLinkedList,
	CircularLinkedListNode,
} from '@alexaegis/advent-of-code-lib/linked-list';
import { max, min } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const runner =
	(iterationCount = 100) =>
	(input: string): number => {
		const circle = input.split('').map((s) => parseInt(s, 10));
		const high = circle.reduce(max);
		const low = circle.reduce(min);
		const ll = new CircularLinkedList<number>(circle);

		let cursor = ll.start;

		const m = new Map<number, CircularLinkedListNode<number>>();
		for (const link of [...cursor.forward()]) {
			m.set(link.value, link);
		}

		for (let i = 0; i < iterationCount; i++) {
			// pick up three cups
			const front = cursor.next;
			cursor.next = front.next.next.next;

			// select destination
			let destination: CircularLinkedListNode<number> | undefined;
			let val = cursor.value;
			let sub = 1;
			while (
				!destination ||
				destination === front ||
				destination === front.next ||
				destination === front.next.next
			) {
				destination = m.get(val - sub);
				sub++;
				if (val - sub < low) {
					sub = 0;
					val = high;
				}
			}

			// reinsert at destination
			const after = destination.next;
			destination.next = front;
			front.prev = destination;

			after.prev = front.next.next.next;
			front.next.next.next = after;

			// next
			cursor = cursor.next;
		}

		let first = m.get(1)!.next;

		let result = '';
		while (first.value !== 1) {
			result += first.value;
			first = first.next;
		}
		return parseInt(result, 10);
	};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner(10))}`); // 783895 ~22ms
}
