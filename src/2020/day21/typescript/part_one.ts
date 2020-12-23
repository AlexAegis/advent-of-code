import { bench, read } from '@lib';
import { nonNullish } from '@lib/functions';
import { sum } from '@lib/math';
import { Graph, Node, Vertice } from '@lib/model/graph';
import { Heuristic } from '@lib/model/graph/heuristic.type';
import { day, year } from '.';
import { AllergenicProduct, parse } from './parse.function';

export type Ingredient = string;
export type Allergen = string;
export interface AllergenicIngredient {
	ingredient: Ingredient;
	allergen?: Allergen;
}

/**
 * Yields all the possible unique ingredient and allergen pairings
 *
 * If an ingredient is already on the path, take it out from that product and
 * IF it's allergenic is there at THAT line, take it out too.
 *
 * @param allergenicProducts
 */
function* allergenicIngredientGenerator(
	allergenicProducts: AllergenicProduct[],
	path: AllergenicIngredient[]
): Generator<AllergenicIngredient> {
	const yielded = new Set<string>();
	const domain: AllergenicProduct[] = allergenicProducts.map((ap) => ({
		ingredients: [...ap.ingredients],
		allergens: [...ap.allergens],
	}));
	for (const allergenicProduct of domain) {
		while (allergenicProduct.allergens.length < allergenicProduct.ingredients.length) {
			allergenicProduct.allergens.push('');
		}
	}
	//const allergenFrees = new Set<Ingredient>();
	// pretrim
	for (const allergenicProduct of domain) {
		for (const p of path) {
			if (
				allergenicProduct.ingredients.removeItem(p.ingredient) &&
				p.allergen !== undefined
			) {
				allergenicProduct.allergens.removeItem(p.allergen);
			}
		}

		if (allergenicProduct.allergens.length === 0) {
			// allergenFrees.addAll(allergenicProduct.ingredients);
			for (const allergenicProduct of domain) {
				for (const free of allergenicProduct.ingredients) {
					allergenicProduct.ingredients.removeItem(free);
				}
			}
		}
	}
	//	console.log(
	//		'after pretrim',
	//		JSON.stringify({
	//			forPath: path,
	//			available: domain,
	//			allFree: [...allergenFrees],
	//		})
	//	);
	const y = (allergenicIngredient: AllergenicIngredient) => {
		const serialized = `${allergenicIngredient.ingredient}:${allergenicIngredient.allergen}`;

		if (!yielded.has(serialized)) {
			// console.log('you', JSON.stringify(allergenicIngredient));
			yielded.add(serialized);
			return allergenicIngredient;
		} else return undefined;
	};
	// console.log('for path', JSON.stringify(path), 'available is', JSON.stringify(domain));
	// console.log('allFree', JSON.stringify([...allergenFrees]));
	let yc = 0;
	for (const allergenicProduct of domain) {
		for (const ingredient of allergenicProduct.ingredients) {
			for (const allergen of allergenicProduct.allergens) {
				const r = y({ ingredient, allergen });
				if (r) {
					yc++;
					yield r;
				} else {
					//console.log('ASDAWFAW--------------');
				}
			}
		} /*
		for (const allergen of allergenicProduct.allergens) {
			for (const ingredient of allergenicProduct.ingredients) {
				if (!allergenFrees.has(ingredient)) {
					const r = y({ ingredient, allergen });
					if (r) yield r;
				}
			}
		}*/
		/*while (allergenicProduct.allergens.length) {
			const allergen = allergenicProduct.allergens.splice(0, 1)[0];
			const ingredient = allergenicProduct.ingredients.splice(0, 1)[0];
			const r = y({ ingredient, allergen });
			if (r) yield r;
		}
		while (allergenicProduct.ingredients.length) {
			const ingredient = allergenicProduct.ingredients.splice(0, 1)[0];
			const r = y({ ingredient, allergen: undefined });
			// for (const ap of domain) {
			// 	ap.ingredients.removeItem(ingredient);
			// }
			if (r) yield r;
		}*/
	}
	console.log('y++++++++++++++++++++th', yc);
}

/**
 * A nodes value is a single the ingredient => allergen combos that has ben discovered
 * The end is determined if the node chain is as long as many allergens there are
 * the path then will be all the different combinations
 */
export const runner = (input: string): number => {
	const entries = parse(input);

	const allAllergens = new Set(entries.flatMap((e) => e.allergens));
	const allIngredients = new Set(entries.flatMap((e) => e.ingredients));
	console.log('allAllergens', allAllergens.size, [...allAllergens]);
	console.log('allIngredients', allIngredients.size, [...allIngredients]);
	/*
	const everyCombo = [...allergenicIngredientGenerator(entries)];
	console.log('everycombo size', everyCombo.length);
*/
	const g = new Graph<AllergenicIngredient>();

	// At the starting node we know nothing
	const startingNode = new Node<AllergenicIngredient>();
	g.nodes.set(':', startingNode);
	const heuristic: Heuristic<typeof startingNode> = (_a, path) => path.size;

	const isGoal = (_n: typeof startingNode, path: Node<AllergenicIngredient>[]) => {
		return path.length > allIngredients.size;
	};
	// This one has to generate a node, that:
	// havent been generated before
	// makes sense from the entries
	// reachable from the current node ? (What does this mean here?) Lets ignore this for now
	/*	const createNodeCreator = (entries: AllergenicProduct[]) => {
		const pairGenerator = allergenicIngredientGenerator(entries);
		return (_graph: typeof g, _path: Map<typeof startingNode, typeof startingNode>): typeof startingNode | undefined => {
			const next = pairGenerator.next().value as AllergenicIngredient | undefined;
			if(next) {
				return new Node<AllergenicIngredient>({ allergen: next.allergen, ingredient: next.ingredient });
			} else {
				return undefined;
			}
		};
	};
	const generateNode = createNodeCreator(entries);
*/

	function* verticeGenerator(
		nodeMap: Map<string, Node<AllergenicIngredient>>,
		from: Node<AllergenicIngredient>,
		path: Node<AllergenicIngredient>[]
	): Generator<Vertice<Node<AllergenicIngredient>>> {
		// const pathIngredients = new Set(path.map((e) => e.value?.ingredient).filter(nonNullish));
		// const pathAllergens = new Set(path.map((e) => e.value?.allergen).filter(nonNullish));
		const pathAi = path.map((p) => p.value).filter(nonNullish);
		for (const ai of allergenicIngredientGenerator(entries, pathAi)) {
			// const serialized =
			// 	`${ai.ingredient}:${ai.allergen}` +
			// 	JSON.stringify([...pathIngredients]) +
			// 	JSON.stringify([...pathAllergens]);
			///const serialized =
			///	`${ai.ingredient}:${ai.allergen}` + JSON.stringify(path.map((p) => p.value));

			const serialized = `${ai.ingredient}:${ai.allergen}`;
			console.log('can go from', JSON.stringify(pathAi), 'to', serialized);
			const to = nodeMap.getOrAdd(serialized, () => new Node(ai));
			yield { from, to, weight: 1 };
		}
	}

	// During traversal, from a node you can only go to other nodes where none
	// the allergen and the ingredient is present on the path you already
	// travelled !!!!!!!!!!!!!!!!!!!!!!!
	const result = g.aStar(startingNode, isGoal, {
		heuristic,
		verticeGenerator,
	});

	const allergenicIngredients = result.map((r) => r.value).filter(nonNullish);
	console.log('allergenicIngredients', result.length, JSON.stringify(allergenicIngredients));

	const nonAllergenicIngredients = [...allIngredients.values()].filter(
		(i) => !allergenicIngredients.find((ai) => ai.ingredient === i)
	);
	console.log(
		'nonAllergenicIngredients',
		nonAllergenicIngredients.length,
		JSON.stringify(nonAllergenicIngredients)
	);

	const allIngredientAppearances = entries.flatMap((e) => e.ingredients);

	const solution = nonAllergenicIngredients
		.map((nai) => allIngredientAppearances.filter((aia) => nai === aia).length)
		.reduce(sum, 0);
	console.log('solution', solution);
	return 0;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	//	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))();
}
// TOO HIGH 3053
