export const collapse = (sequence: string): string =>
	[...sequence].reduce((acc, curr) =>
		acc && acc.at(-1) !== curr && acc.at(-1)?.toLowerCase() === curr.toLowerCase()
			? acc.slice(0, -1)
			: acc + curr,
	);
