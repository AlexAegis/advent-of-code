import type { ToString } from '../model/index.js';
import { CircularLinkedListNode } from './circular-linked-list-node.class.js';

export class CircularLinkedList<T> implements ToString {
	public head: CircularLinkedListNode<T>;

	public constructor(initialData: T[]) {
		const mainLink: T = initialData[0] as T;
		this.head = new CircularLinkedListNode(mainLink);

		let skipped = false;
		for (const item of initialData) {
			if (skipped) {
				this.add(item);
			} else {
				skipped = true;
			}
		}
	}

	public length(): number {
		return [...this.singleIterationNodes()].length;
	}

	public add(t: T): CircularLinkedListNode<T> {
		return new CircularLinkedListNode(t, this.head.prev, this.head);
	}

	public find(t: T): CircularLinkedListNode<T> {
		let cursor = this.head;
		while (cursor.value !== t) {
			cursor = cursor.next;
		}
		return cursor;
	}

	/**
	 * Infinite iterator
	 */
	*[Symbol.iterator](): IterableIterator<T> {
		let current = this.head;
		for (;;) {
			yield current.value;
			current = current.next;
		}
	}

	public *singleIteration(): IterableIterator<T> {
		let current = this.head;
		do {
			yield current.value;
			current = current.next;
		} while (current !== this.head);
	}

	public *singleIterationNodes(): IterableIterator<CircularLinkedListNode<T>> {
		let current = this.head;
		do {
			yield current;
			current = current.next;
		} while (current !== this.head);
	}

	public toString(): string {
		return [...this.singleIteration()].join(',');
	}
}
