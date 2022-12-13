export type DiscreteComparatorResult = -1 | 0 | 1;

export type Comparator<T> = (a: T, b: T) => number;

export type DiscreteComparator<T> = (a: T, b: T) => DiscreteComparatorResult;
