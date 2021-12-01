import { SizedTuple } from '@lib/model';

export function* slideWindow<T, N extends number>(
	array: T[],
	windowSize: N = 2 as N
): Generator<SizedTuple<T, N>> {
	const window = [];
	for (const element of array) {
		window.push(element);
		if (window.length === windowSize) {
			yield [...window] as SizedTuple<T, N>;
			window.shift();
		}
	}
	return [];
}
