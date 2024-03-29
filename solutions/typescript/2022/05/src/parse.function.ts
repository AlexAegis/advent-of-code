import { split, type SizedTuple } from '@alexaegis/advent-of-code-lib';

export interface Command {
	count: number;
	from: number;
	to: number;
}

export type Crate = string;
export type Stack = (Crate | undefined)[];
export type StockPile = Stack[];

export const parseStacks = (rawStacks: string): StockPile =>
	split(rawStacks).reduce<StockPile>((stockPile, stackLine) => {
		for (let i = 0; i < stackLine.length; i += 4) {
			const crateId = stackLine[i + 1];
			const stock = stockPile[i / 4] ?? [];
			if (crateId && /[A-Z]/.test(crateId)) {
				stock.push(crateId);
			}
			stockPile[i / 4] = stock;
		}
		return stockPile;
	}, []);

export const parseCommands = (rawCommands: string): Command[] =>
	split(rawCommands).map((line) => {
		const splitLine = line.split(' ') as SizedTuple<string, 6>;
		return {
			count: Number.parseInt(splitLine[1], 10),
			from: Number.parseInt(splitLine[3], 10) - 1,
			to: Number.parseInt(splitLine[5], 10) - 1,
		} as Command;
	});
