import { ToString } from '@lib/model/to-string.interface';
import { LinkedListNode } from './linked-list-node.class';

export class LinkedList<T> implements ToString {
	public start?: LinkedListNode<T>;
	public end?: LinkedListNode<T>;

	#length = 0;

	public constructor(...initialData: T[]) {
		for (const item of initialData) {
			this.add(item);
		}
	}

	public add(...ts: T[]): void {
		for (const t of ts) {
			if (!this.start || !this.end) {
				this.start = new LinkedListNode(t);
				this.end = this.start;
			} else {
				const link = new LinkedListNode(t);
				link.prev = this.end;
				this.end.next = link;
				this.end = link;
			}
			this.#length++;
		}
	}

	get length(): number {
		return this.#length;
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
