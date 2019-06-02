import { promises } from 'fs';

/**
 * Factory function to create an input supplier
 *
 * @param year of the task
 * @param day of the task
 * @param file in the resources folder of the task
 */
export const reader = (year: number, day: number, file: string) => () =>
	promises.readFile(`src/${year}/day${day < 10 ? '0' + day : day}/resources/${file}`, {
		encoding: 'UTF-8'
	}) as Promise<string>;
