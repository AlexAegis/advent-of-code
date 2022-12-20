// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = abstract new (...args: any[]) => T;

export type InstanceTypeOfConstructorTuple<C extends Constructor<unknown>[]> = {
	[K in keyof C]: C[K] extends C[number] ? InstanceType<C[K]> : never;
};
