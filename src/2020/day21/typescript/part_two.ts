import { bench, read, split } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const lines = split(input);

	for (const line of lines) {
		const [rawIngredients, rawAllergens] = line.split(' (contains ');
		const ingredients = rawIngredients.split(' ');
		const allergens = rawAllergens.substring(0, rawAllergens.length - 1).split(', ');
		console.log('ing', JSON.stringify(ingredients), 'all', JSON.stringify(allergens));
	}

	return 0;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 265 ~0.3ms
}
