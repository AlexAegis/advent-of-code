import { nonNullish } from '@alexaegis/advent-of-code-lib/functions';
import { PairTree, type NestedPairs, type PairSide } from '@alexaegis/advent-of-code-lib/model';

export type SnailfishNumber = PairTree<number>;

const splitSnailfish = (n: SnailfishNumber, side: PairSide): void => {
	const val = n.getSide(side) as number;
	if (typeof val !== 'number') {
		throw new Error(`Cannot split ${val}`);
	}
	const half = val / 2;
	n.setSide(side, new PairTree(Math.floor(half), Math.ceil(half)));
};

/**
 * Triggers a **single** explosion
 * @returns true if explosion happened
 */
export const triggerExplosion = (n: SnailfishNumber): boolean => {
	if (n.leftTree && triggerExplosion(n.leftTree)) {
		return true;
	} else if (n.rightTree && triggerExplosion(n.rightTree)) {
		return true;
	}

	if (n.depth > 4 && nonNullish(n.leftValue) && nonNullish(n.rightValue)) {
		const toTheRight = n.inOrderSuccessor();
		if (toTheRight) {
			if (toTheRight.leftTree) {
				toTheRight.rightValue = (toTheRight.rightValue ?? 0) + n.rightValue;
			} else {
				toTheRight.leftValue = (toTheRight.leftValue ?? 0) + n.rightValue;
			}
		}
		const toTheLeft = n.inOrderPredecessor();
		if (toTheLeft) {
			if (toTheLeft.rightTree) {
				toTheLeft.leftValue = (toTheLeft.leftValue ?? 0) + n.leftValue;
			} else {
				toTheLeft.rightValue = (toTheLeft.rightValue ?? 0) + n.leftValue;
			}
		}
		n.replace(0);
		return true;
	} else {
		return false;
	}
};

/**
 * Triggers a **single** split
 * @returns true if split happened
 */
export const triggerSplit = (number: SnailfishNumber): boolean => {
	for (const node of number.leftToRightNodes()) {
		if (nonNullish(node.leftValue) && node.leftValue > 9) {
			splitSnailfish(node, 'left');
			return true;
		} else if (nonNullish(node.rightValue) && node.rightValue > 9) {
			splitSnailfish(node, 'right');
			return true;
		}
	}
	return false;
};

const snailfishActions = [triggerExplosion, triggerSplit];
/**
 * From description:
 * During reduction, at most one action applies, after which the process
 * returns to the top of the list of actions. For example, if split produces
 * a pair that meets the explode criteria, that pair explodes before other
 * splits occur.
 */
export const reduceSnailfishNumber = (number: SnailfishNumber): SnailfishNumber => {
	let actionHappened = false;
	do {
		actionHappened = false;
		for (const action of snailfishActions) {
			if (action(number)) {
				actionHappened = true;
				break;
			}
		}
	} while (actionHappened);
	return number;
};

export const getMagnitude = (number: SnailfishNumber): number => {
	let leftValue = number.leftValue ?? 0;
	if (number.leftTree) {
		leftValue = getMagnitude(number.leftTree);
	}
	let rightValue = number.rightValue ?? 0;
	if (number.rightTree) {
		rightValue = getMagnitude(number.rightTree);
	}
	return 3 * leftValue + 2 * rightValue;
};

export const parseSnailfishNumber = (line: string): SnailfishNumber => {
	const rawFish = JSON.parse(line) as NestedPairs<number>;
	return PairTree.fromNestedPairs(rawFish);
};

export const addSnailfishNumbers = (...numbers: SnailfishNumber[]): SnailfishNumber => {
	const [first, ...rest] = numbers;
	if (first) {
		let base = first;
		for (const next of rest) {
			base = reduceSnailfishNumber(base.join(next));
		}
		return base;
	} else {
		throw new Error('At least one SnailfishNumber is required!');
	}
};
