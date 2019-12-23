import { NEWLINE } from '@lib/regex';

export const parse = (input: string): string[] => input.split(NEWLINE);
