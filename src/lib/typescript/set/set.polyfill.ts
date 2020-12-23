import { addAllToSet } from './add-all-to-set.function';

declare global {
	interface Set<T> {
		addAll(items: T[]): Set<T>;
	}
}

Set.prototype.addAll = function <T>(items: T[]): Set<T> {
	return addAllToSet(items, this);
};
