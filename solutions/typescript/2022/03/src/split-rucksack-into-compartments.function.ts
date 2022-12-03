export const splitRucksackIntoCompartments = (rucksack: string): readonly [string, string] => {
	const middle = Math.floor(rucksack.length / 2);
	return [rucksack.substring(0, middle), rucksack.substring(middle)] as const;
};
