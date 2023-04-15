/**
 *
 * @deprecated
 */
export const rightSplit = (s: string, delimiter = ' '): [string, string] | [string] => {
	if (!delimiter) {
		return [s] as [string];
	} else {
		return s.split(new RegExp(`${delimiter}(?=[^${delimiter}]+$)`)) as [string, string];
	}
};
