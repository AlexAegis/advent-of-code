import { cutSubSegment } from './cut-subsegment.function';
import { findEndOfPair } from './find-end-of-pair.function';

declare global {
	interface Array<T> {
		findEndOfPair(pairs: [T, T], from: number): number | undefined;
		cutSubSegment(pairs: [T, T], from: number): T[] | undefined;
		removeItem(item: T): this;
	}
}

Array.prototype.findEndOfPair = function <T>(pairs: [T, T], from = 0): number | undefined {
	return findEndOfPair(this, pairs, from);
};

Array.prototype.cutSubSegment = function <T>(pairs: [T, T], from = 0): T[] | undefined {
	return cutSubSegment(this, pairs, from);
};

Array.prototype.removeItem = function <T>(item: T): Array<T> {
	const index = this.findIndex((e) => e === item);
	if (index >= 0) {
		this.splice(index, 1);
	}
	return this;
};
