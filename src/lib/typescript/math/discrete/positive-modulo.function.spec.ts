export const posMod = (n: number, m: number): number => {
	return ((n % m) + m) % m;
};

export const posModBigInt = (n: bigint, m: bigint): bigint => {
	return ((n % m) + m) % m;
};
