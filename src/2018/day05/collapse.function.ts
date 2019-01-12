export const collapse = (sequence: string) =>
	[...sequence].reduce((acc, curr) =>
		acc && acc.charAt(acc.length - 1) !== curr && acc.charAt(acc.length - 1).toLowerCase() === curr.toLowerCase()
			? acc.substr(0, acc.length - 1)
			: acc + curr
	);
