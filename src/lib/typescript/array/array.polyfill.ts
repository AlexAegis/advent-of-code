import { addAllToSet } from '@lib/set';
import { cutSubSegment } from './cut-subsegment.function';
import { findEndOfPair } from './find-end-of-pair.function';
import { matrixFlipFlop } from './flip-flop.generator';
import { flipMatrix } from './flip-matrix.function';
import { rotateMatrix } from './rotate-matrix.function';

declare global {
	interface Array<T> {
		findEndOfPair(pairs: [T, T], from: number): number | undefined;
		cutSubSegment(pairs: [T, T], from: number): T[] | undefined;
		removeItem(item: T): boolean;
		flipMatrix<T>(axis: 'y' | 'x'): T[][];
		rotateMatrix<T>(direction: 'r' | 'l'): T[][];
		flipFlop<T>(): Generator<T[][]>;
		contains(item: T): boolean;
		intoSet(set?: Set<T>): Set<T>;
	}
}

Array.prototype.intoSet = function <T>(set?: Set<T>): Set<T> {
	return addAllToSet(this, set);
};

Array.prototype.contains = function <T>(item: T): boolean {
	return this.find((i) => i === item) !== undefined;
};

Array.prototype.flipFlop = function* <T>(): Generator<T[][]> {
	yield* matrixFlipFlop(this);
};

Array.prototype.flipMatrix = function <T>(axis: 'y' | 'x' = 'x'): T[][] {
	return flipMatrix(this, axis);
};

Array.prototype.rotateMatrix = function <T>(direction: 'r' | 'l' = 'r'): T[][] {
	return rotateMatrix(this, direction);
};

Array.prototype.findEndOfPair = function <T>(pairs: [T, T], from = 0): number | undefined {
	return findEndOfPair(this, pairs, from);
};

Array.prototype.cutSubSegment = function <T>(pairs: [T, T], from = 0): T[] | undefined {
	return cutSubSegment(this, pairs, from);
};

Array.prototype.removeItem = function <T>(item: T): boolean {
	const index = this.findIndex((e) => e === item);
	if (index >= 0) {
		this.splice(index, 1);
	}
	return index >= 0;
};
