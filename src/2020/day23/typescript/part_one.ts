import { bench, read } from '@lib';
import { CircularLinkedList } from '@lib/linked-list';
import { CircularLinkedListNode } from '@lib/linked-list/circular-linked-list-node.class';
import { max, min } from '@lib/math';
import { day, year } from '.';

export const runner = (iterationCount = 100) => (input: string): number => {
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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner(10))}`))(); // 74698532 ~0.01ms
}
