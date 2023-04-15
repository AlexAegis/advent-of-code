import { split, stringPair } from '@alexaegis/advent-of-code-lib';

export type AllergenicProduct = { ingredients: string[]; allergens: string[] };

export const parse = (input: string): AllergenicProduct[] => {
	const entries: AllergenicProduct[] = [];

	for (const line of split(input)) {
		const [rawIngredients, rawAllergens] = stringPair.assert(line.split(' (contains '));
		const ingredients = rawIngredients.split(' ');
		const allergens = rawAllergens.substring(0, rawAllergens.length - 1).split(', ');
		entries.push({ ingredients, allergens });
	}
	return entries;
};
