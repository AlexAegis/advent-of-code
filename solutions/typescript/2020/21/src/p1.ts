import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { AllergenicProduct, parse } from './parse.function.js';

export const findPossibleCombinations = (
	entries: AllergenicProduct[]
): Map<string, Set<string>> => {
	const possibleCombinations: Map<string, Set<string>> = new Map();

	for (const { allergens, ingredients } of entries) {
		for (const allergen of allergens) {
			const a = possibleCombinations.get(allergen);
			if (a) {
				for (const ingredient of a) {
					if (!ingredients.has(ingredient)) {
						a.delete(ingredient);
					}
				}
			} else {
				possibleCombinations.set(allergen, new Set(ingredients));
			}
		}
	}
	return possibleCombinations;
};

export const p1 = (input: string): number => {
	const entries = parse(input);

	const possibleCombinations = findPossibleCombinations(entries);

	const allergenicIngredients = new Set(
		[...possibleCombinations.values()].flatMap((a) => [...a])
	);

	return entries.flatMap((a) => a.ingredients).filter((i) => !allergenicIngredients.has(i))
		.length;
};

await task(p1, packageJson.aoc); // 2724 ~1.01ms
