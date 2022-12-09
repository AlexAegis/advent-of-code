export const collapse = (sequence: string): string =>
	[...sequence].reduce((acc, curr) =>
		acc &&
		acc.charAt(acc.length - 1) !== curr &&
		acc.charAt(acc.length - 1).toLowerCase() === curr.toLowerCase()
			? acc.substring(0, acc.length - 1)
			: acc + curr
	);
