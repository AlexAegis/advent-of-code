import { arrayContains } from './array-contains.function.js';

export interface ArrayDiffResult<T> {
	onlyInFirst: T[];
	onlyInSecond: T[];
	bothHas: T[];
}

export const arrayDiff = <T>(first: T[], second: T[]): ArrayDiffResult<T> => {
	const onlyInFirst: T[] = [];
	const onlyInSecond: T[] = [];
	const bothHas: T[] = [];

	for (const itemFromFirst of first) {
		if (arrayContains(second, itemFromFirst)) {
			bothHas.push(itemFromFirst);
		} else {
			onlyInFirst.push(itemFromFirst);
		}
	}

	for (const itemFromSecond of second) {
		if (!arrayContains(first, itemFromSecond)) {
			onlyInSecond.push(itemFromSecond);
		}
	}
	return {
		onlyInFirst,
		onlyInSecond,
		bothHas,
	};
};
