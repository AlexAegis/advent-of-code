import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { findPossibleCombinations } from './p1.js';
import { parse } from './parse.function.js';

export interface AllergenicIngredient {
	ingredient: string;
	allergen: string;
}

export const p2 = (input: string): string => {
	const entries = parse(input);

	const possibleCombinations = findPossibleCombinations(entries);

	const sorted = [...possibleCombinations.entries()]
		.map<[string, string[]]>(([a, b]) => [a, [...b]])
		.sort((a, b) => (a[0] > b[0] ? 1 : -1));

	const allergenicIngredients = new Set(
		[...possibleCombinations.values()].flatMap((a) => [...a]),
	);

	const candidates = function* (
		existingPath: AllergenicIngredient[] = [],
	): Generator<AllergenicIngredient> {
		for (const combo of sorted) {
			if (!existingPath.some((p) => p.allergen === combo[0])) {
				for (const i of combo[1]) {
					if (!existingPath.some((p) => p.ingredient === i)) {
						yield { ingredient: i, allergen: combo[0] };
					}
				}
			}
		}
	};

	const bt = (path: AllergenicIngredient[] = []): AllergenicIngredient[] | undefined => {
		const nextCandidates = [...candidates(path)];
		if (allergenicIngredients.size === path.length) {
			return path;
		}
		if (nextCandidates.length === 0) {
			return undefined;
		}
		for (const nextCandidate of nextCandidates) {
			return bt([...path, nextCandidate]);
		}
		return undefined;
	};

	return [...(bt() ?? [])]
		.sort((a, b) => (a.allergen > b.allergen ? 1 : -1))
		.map((a) => a.ingredient)
		.join(',');
};

await task(p2, packageJson.aoc); // xlxknk,cskbmx,cjdmk,bmhn,jrmr,tzxcmr,fmgxh,fxzh ~0.53ms
