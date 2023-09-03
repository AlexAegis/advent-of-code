export const splitRucksackIntoCompartments = (rucksack: string): readonly [string, string] => {
	const middle = Math.floor(rucksack.length / 2);
	return [rucksack.slice(0, Math.max(0, middle)), rucksack.slice(Math.max(0, middle))] as const;
};
