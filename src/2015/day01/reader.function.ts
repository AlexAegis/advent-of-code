import { promises } from 'fs';

export const reader = () => promises.readFile(`src/2015/day01/input.txt`, { encoding: 'UTF-8' }) as Promise<string>;
