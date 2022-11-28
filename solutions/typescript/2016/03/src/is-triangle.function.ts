export type Triangle = [number, number, number];

export const isTriangle = ([a, b, c]: Triangle): boolean => a + b > c && b + c > a && c + a > b;
