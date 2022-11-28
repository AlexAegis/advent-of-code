import { gcd } from './gcd.function.js';

/**
 * Least common multiple
 */
export const lcm = (x?: number, y?: number): number =>
	!x || !y ? 0 : Math.abs((x * y) / gcd(x, y));
