import { gcd } from './gcd.function';

/**
 * Least common multiple
 */
export const lcm = (x?: number, y?: number): number => {
	return !x || !y ? 0 : Math.abs((x * y) / gcd(x, y));
};
