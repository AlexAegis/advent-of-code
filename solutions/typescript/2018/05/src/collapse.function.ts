export const collapse = (sequence: string): string =>
	[...sequence].reduce((acc, curr) =>
		acc && acc.endsWith(curr) && acc.at(-1)?.toLowerCase() === curr.toLowerCase()
			? acc.slice(0, Math.max(0, acc.length - 1))
			: acc + curr,
	);
