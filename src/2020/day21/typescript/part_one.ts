import { bench, read, split } from '@lib';
import { sum } from '@lib/math';
import { day, year } from '.';

export const runner = (input: string): number => {
	const lines = split(input);

	const certainAllergens = new Map<string, string>();
	const allIngredientsAppearences = new Map<string, number>();
	const entries: { ingredients: string[]; allergens: string[] }[] = [];

	for (const line of lines) {
		const [rawIngredients, rawAllergens] = line.split(' (contains ');
		const ingredients = rawIngredients.split(' ');
		const allergens = rawAllergens.substring(0, rawAllergens.length - 1).split(', ');
		// console.log('ing', JSON.stringify(ingredients), 'all', JSON.stringify(allergens));
		entries.push({ ingredients, allergens });

		for (const ingredient of ingredients) {
			allIngredientsAppearences.set(
				ingredient,
				(allIngredientsAppearences.get(ingredient) ?? 0) + 1
			);
		}
	}

	const findSingleOverlap = (uncommonAllowed = false) => {
		for (let i = 0; i < entries.length; i++) {
			const a = entries[i];
			for (let j = i + 1; j < entries.length; j++) {
				const b = entries[j];
				const aAppear = a.ingredients.map((ac) => ({
					ing: ac,
					appC: b.ingredients.filter((bc) => ac === bc).length,
				}));
				const app0 = aAppear.filter((ac) => ac.appC === 0);
				const app1 = aAppear.filter((ac) => ac.appC === 1);
				const commonAllergens = b.allergens.filter((aa) =>
					a.allergens.find((ba) => aa == ba)
				);
				let commonAllergen: string | undefined = undefined;
				if (commonAllergens.length === 1) {
					commonAllergen = commonAllergens[0];
				}

				if (uncommonAllowed && !commonAllergen) {
					if (a.allergens.length === 0 && b.allergens.length === 1) {
						commonAllergen = b.allergens[0];
					} else if (a.allergens.length === 1 && b.allergens.length === 0) {
						commonAllergen = a.allergens[0];
					}
				}

				if (
					app1.length + app0.length === aAppear.length &&
					app1.length === 1 &&
					commonAllergen
				) {
					const commonIngredient = app1[0].ing;
					return { commonIngredient, i, j, commonAllergen };
				}
			}
		}
		return undefined;
	};

	let i = 0;
	let uncommon = false;
	while (entries.some((e) => e.allergens.length > 0)) {
		const next = findSingleOverlap(uncommon);

		console.log('trz', uncommon);
		if (next) {
			// remove from everywhere else
			for (const item of entries) {
				item.ingredients.removeItem(next.commonIngredient);
			}
			// entries[next.i].ingredients.removeItem(next.commonIngredient);
			// entries[next.j].ingredients.removeItem(next.commonIngredient);

			if (next.commonAllergen) {
				certainAllergens.set(next.commonIngredient, next.commonAllergen);
				entries[next.i].allergens.removeItem(next.commonAllergen);
				entries[next.j].allergens.removeItem(next.commonAllergen);
			}

			uncommon = false;
		} else if (uncommon === false) {
			uncommon = true;
		} else {
			break;
		}

		if (i > 1000) {
			console.log('INFINITE');
			break;
		}
		i++;
	}
	//console.log('certainAllergens', JSON.stringify([...certainAllergens.entries()]));

	const allergenFreeIngredients = [...allIngredientsAppearences.keys()].filter(
		(i) => !certainAllergens.has(i)
	);

	return allergenFreeIngredients
		.map((afi) => allIngredientsAppearences.get(afi) ?? 0)
		.reduce(sum, 0);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 265 ~0.3ms
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.2.txt'), runner)}`))();
}
// TOO HIGH 3053
