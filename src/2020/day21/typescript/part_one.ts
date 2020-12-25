import { bench, read, split } from '@lib';
import { sum } from '@lib/math';
import { day, year } from '.';

export const runner = (input: string): number => {
	const lines = split(input);

	const certainAllergens = new Map<string, string>();
	const allIngredients = new Set<string>();
	const entries: { ingredients: string[]; allergens: string[] }[] = [];
	for (const line of lines) {
		const [rawIngredients, rawAllergens] = line.split(' (contains ');
		const ingredients = rawIngredients.split(' ');
		const allergens = rawAllergens.substring(0, rawAllergens.length - 1).split(', ');
		// console.log('ing', JSON.stringify(ingredients), 'all', JSON.stringify(allergens));
		entries.push({ ingredients, allergens });
		ingredients.forEach((i) => allIngredients.add(i));
	}

	const findSingleOverlap = () => {
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
				let commonAllergen = a.allergens.find((aa) => b.allergens.find((ba) => aa == ba));

				if (!commonAllergen) {
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

	//let i = 0;
	for (;;) {
		const next = findSingleOverlap();
		if (next) {
			// remove from everywhere else
			for (const item of entries) {
				item.ingredients.removeItem(next.commonIngredient);
			}
			certainAllergens.set(next.commonIngredient, next.commonAllergen);
			entries[next.i].allergens.removeItem(next.commonAllergen);
			entries[next.j].allergens.removeItem(next.commonAllergen);
		} else {
			//console.log('NATURAL');
			break;
		}
		// console.log('next', JSON.stringify(next, undefined, 2));
		// console.log('ENTRIES', JSON.stringify(entries, undefined, 2));
		//if (i > 20) {
		//	console.log('INFINITE');
		//	break;
		//}
		//i++;
	}

	//console.log('ENTRIES', JSON.stringify(entries, undefined, 2));

	//console.log('certainAllergens', JSON.stringify([...certainAllergens.entries()]));

	const allergenFreeIngredients = [...allIngredients].filter((i) => !certainAllergens.has(i));
	console.log('allergenFreeIngredients', JSON.stringify(allergenFreeIngredients));
	return allergenFreeIngredients
		.map((afi) =>
			entries.map((e) => e.ingredients.filter((i) => i === afi).length).reduce(sum, 0)
		)
		.reduce(sum, 0);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 265 ~0.3ms
}
// TOO HIGH 3053

/** TACS 3
 *
 *  nincs átfedés, 1 elemet leszámítva akkor az allergén amelyik mindkét sorba szerepel az azé az egyé
 *
 *  * ezután ki lehet venni mind az allergént ebből a két sorból (!) és az összetevőt az összesből
 *
 * mxmxvkd kfcds sqjhc nhms (dairy, fish)
 * trh fvjkl sbzzf mxmxvkd (dairy)
 * sqjhc fvjkl (soy)
 * sqjhc mxmxvkd sbzzf (fish)
 *
 * kfcds sqjhc nhms (fish)
 * trh fvjkl sbzzf
 * sqjhc fvjkl (soy)
 * sqjhc sbzzf (fish)
 *
 * kfcds nhms ()
 * trh fvjkl sbzzf
 * fvjkl (soy)
 * sbzzf ()
 *
 * kfcds nhms ()
 * trh sbzzf
 *
 * sbzzf ()
 *
 * Addig amíg az allergén lista mindenhol üres
 */

/** TACS 3
 *
 *  nincs átfedés, 1 elemet leszámítva akkor az allergén amelyik mindkét sorba szerepel az azé az egyé
 *
 *  * ezután ki lehet venni mind az allergént ebből a két sorból (!) és az összetevőt az összesből
 *
 * trh fvjkl sbzzf mxmxvkd (dairy)
 * sqjhc fvjkl (soy)
 * sqjhc mxmxvkd sbzzf (fish)
 * mxmxvkd kfcds sqjhc nhms (dairy, fish)
 *
 * trh fvjkl sbzzf mxmxvkd (dairy)
 * sqjhc fvjkl (soy)
 * sqjhc mxmxvkd sbzzf (fish)
 * mxmxvkd kfcds sqjhc nhms (dairy, fish)

 */
