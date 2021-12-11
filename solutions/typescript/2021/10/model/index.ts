export type OpeningTag = '(' | '[' | '{' | '<';
export type ClosingTag = ')' | ']' | '}' | '>';

export const closingTagMap: Record<OpeningTag, ClosingTag> = {
	'(': ')',
	'[': ']',
	'{': '}',
	'<': '>',
};

export const openingTags = Object.keys(closingTagMap);
export const closingTags = Object.values(closingTagMap);

export const isOpeningTag = (char: string): char is OpeningTag => {
	return openingTags.some((closingTag) => closingTag === char);
};

export const isClosingTag = (char: string): char is OpeningTag => {
	return closingTags.some((closingTag) => closingTag === char);
};
