export type OpeningTag = '(' | '[' | '{' | '<';
export type ClosingTag = ')' | ']' | '}' | '>';

export const closingTagMap: Record<OpeningTag, ClosingTag> = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>',
} as const;

export const openingTags = Object.keys(closingTagMap) as OpeningTag[];
export const closingTags = Object.values(closingTagMap);

export const isOpeningTag = (char: string): char is OpeningTag => {
	return openingTags.includes(char as OpeningTag);
};

export const isClosingTag = (char: string): char is ClosingTag => {
	return closingTags.includes(char as ClosingTag);
};
