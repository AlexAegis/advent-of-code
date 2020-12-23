import { ToString } from '@lib/model/to-string.interface';
import { LinkedListNode } from './linked-list-node.class';

export class LinkedList<T> implements ToString {
	public start?: LinkedListNode<T>;
	public end?: LinkedListNode<T>;
	public constructor(...initialData: T[]) {
		for (const item of initialData) {
			this.add(item);
		}
	}

	public add(t: T): void {
		if (!this.start || !this.end) {
			this.start = new LinkedListNode(t);
			this.end = this.start;
		} else {
			const link = new LinkedListNode(t);
			link.prev = this.end;
			this.end.next = link;
			this.end = link;
		}
	}

	*[Symbol.iterator](): IterableIterator<T> {
		let current = this.start;
		while (current !== undefined && current !== this.end) {
			yield current.value;
			current = current.next;
		}
	}

	public toString(): string {
		return [...this].join(',');
	}
}
