import { mod, modBigInt } from './positive-modulo.function';

export const egcd = (a: number, b: number): [number, number, number] => {
	if (a === 0) {
		return [b, 0, 1];
	} else {
		const [g, y, x] = egcd(mod(b, a), a);
		return [g, x - (b / a) * y, y];
	}
};

export const egdcBigInt = (a: bigint, b: bigint): [bigint, bigint, bigint] => {
	if (a === 0n) {
		return [b, 0n, 1n];
	} else {
		const [g, y, x] = egdcBigInt(modBigInt(b, a), a);
		return [g, x - (b / a) * y, y];
	}
};
