import { addAllToSet } from './add-all-to-set.function.js';

declare global {
	interface Set<T> {
		addAll(items: T[]): Set<T>;
		flip(item: T): boolean;
		valueArray(): T[];
	}
}

Set.prototype.valueArray = function <T>(): T[] {
	return [...this.values()] as T[];
};

Set.prototype.addAll = function <T>(items: T[]): Set<T> {
	return addAllToSet(items, this);
};

Set.prototype.flip = function <T>(item: T): boolean {
	const hasItem = this.has(item);
	if (hasItem) {
		this.delete(item);
	} else {
		this.add(item);
	}
	return !hasItem;
};
