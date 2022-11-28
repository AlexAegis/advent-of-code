import type { ToString } from '../functions/index.js';
import { CircularLinkedListNode } from './circular-linked-list-node.class.js';

export class CircularLinkedList<T> implements ToString {
	public start: CircularLinkedListNode<T>;
	public end: CircularLinkedListNode<T>;
	public constructor(initialData: T[]) {
		const mainLink = initialData[0];
		this.start = new CircularLinkedListNode(mainLink);
		this.end = this.start;
		let skipped = false;
		for (const item of initialData) {
			if (skipped) {
				this.add(item);
			} else {
				skipped = true;
			}
		}
	}

	public add(t: T): void {
		const link = new CircularLinkedListNode(t, this.end, this.start);
		this.end.next = link;
		this.start.prev = link;
		this.end = link;
	}

	/**
	 * Infinite iterator
	 */
	*[Symbol.iterator](): IterableIterator<T> {
		let current = this.start;
		while (current) {
			yield current.value;
			current = current.next;
		}
	}

	public *singleIteration(): IterableIterator<T> {
		let current = this.start;
		while (current !== this.end) {
			yield current.value;
			current = current.next;
		}
		yield current.value;
	}

	public toString(): string {
		return [...this.singleIteration()].join(',');
	}
}
