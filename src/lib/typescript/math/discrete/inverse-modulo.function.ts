import { bigEgcd, egcd } from './egdc.function';
import { mod, modn } from './positive-modulo.function';

export const inverseMod = (a: number, m: number): number => {
	const [g, x] = egcd(a, m);
	if (g !== 1) {
		throw new Error(`Modular invers of ${a} modulo ${m} does not exist`);
	} else {
		return mod(x, m);
	}
};

export const bigInverseMod = (a: bigint, m: bigint): bigint => {
	const [g, x] = bigEgcd(a, m);
	if (g !== 1n) {
		throw new Error(`Modular invers of ${a} modulo ${m} does not exist`);
	} else {
		return modn(x, m);
	}
};
