/**
 *
 * @deprecated
 */
export const rightSplit = (s: string, delimiter = ' '): [string, string] | [string] => {
	return delimiter
		? (s.split(new RegExp(`${delimiter}(?=[^${delimiter}]+$)`)) as [string, string])
		: ([s] as [string]);
};
