import type { Deque } from 'js-sdsl';
import type { QueueLike } from './queue-like.interface.js';

export const rotateQueue = function <N>(queue: QueueLike<N>, n: number): void {
	for (let i = 0; i < Math.abs(n); i++) {
		if (n < 0) {
			const next = queue.shift();
			if (next !== undefined) {
				queue.push(next);
			}
		} else {
			const next = queue.pop();
			if (next !== undefined) {
				queue.unshift(next);
			}
		}
	}
};

export const rotateDeque = function <N>(queue: Deque<N>, n: number): void {
	// if (queue.length === 0) {
	// 	return;
	// }

	for (let i = 0; i < Math.abs(n); i++) {
		if (n < 0) {
			const next = queue.popFront();
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			queue.pushBack(next!);
		} else {
			const next = queue.popBack();
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			queue.pushFront(next!);
		}
	}
};
