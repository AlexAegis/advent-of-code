export * from './common';
export * from './discrete';
export * from './huffman';
export * from './lz';

export const max = (a: number, b: number): number => (a < b ? b : a);
export const min = (a: number, b: number): number => (a > b ? b : a);
export const sum = (a: number, b: number): number => a + b;
export const mult = (a: number, b: number): number => a * b;
export const dup = (a: number): number => a * 2;
export const add = (a: number, b: number): number => a + b;
export const sub = (a: number, b: number): number => a - b;
export const desc = add;
export const asc = sub;
export const isBetween = (n: number | bigint, l: number | bigint, h: number | bigint): boolean =>
	n >= l && n <= h;
