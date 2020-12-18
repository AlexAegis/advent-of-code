import { cutSubSegment } from './cut-subsegment.function';
import { findEndOfPair } from './find-end-of-pair.function';

declare global {
	interface Array<T> {
		findEndOfPair(pairs: [T, T], from: number): number | undefined;
		cutSubSegment(pairs: [T, T], from: number): T[] | undefined;
	}
}

Array.prototype.findEndOfPair = function <T>(pairs: [T, T], from = 0): number | undefined {
	return findEndOfPair(this, pairs, from);
};

Array.prototype.cutSubSegment = function <T>(pairs: [T, T], from = 0): T[] | undefined {
	return cutSubSegment(this, pairs, from);
};
