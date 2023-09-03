export const isNumber = (n: unknown): n is number => typeof n === 'number';
export const isNumberArray = (n: unknown[]): n is number[] => n.every(isNumber);
export const isBigint = (n: unknown): n is bigint => typeof n === 'bigint';
export type Numeric = number | bigint;
export const isNumeric = (n: unknown): n is Numeric => isNumber(n) || isBigint(n);
