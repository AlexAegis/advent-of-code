export type SizedTuple<T, N extends number> = N extends N
	? number extends N
		? T[]
		: _SizedTupleOf<T, N, []>
	: never;
type _SizedTupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
	? R
	: _SizedTupleOf<T, N, [T, ...R]>;
