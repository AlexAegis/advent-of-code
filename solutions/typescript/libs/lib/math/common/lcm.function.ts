import { gcd } from './gcd.function.js';

/**
 * Least common multiple
 */
const lcmOverTwo = (x?: number, y?: number): number =>
	!x || !y ? 0 : Math.abs((x * y) / gcd(x, y));

export const lcm = (x?: number | number[], y?: number): number =>
	Array.isArray(x) ? x.reduce((a, n) => lcmOverTwo(a, n), 1) : lcmOverTwo(x, y);
