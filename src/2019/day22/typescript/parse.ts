import { NEWLINE } from '@lib/regex';

export const parse = (input: string): string[] => {
	return input.split(NEWLINE);
};
