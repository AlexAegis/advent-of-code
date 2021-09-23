import { createHash } from 'crypto';

const HASH = 'md5';
const DIGEST = 'hex';

export const hashSearch =
	(zeroes: number) =>
	(input: string): number => {
		const lead = '0'.repeat(zeroes);
		let i = 1;
		let hash = '';
		while (!hash.startsWith(lead)) {
			hash = createHash(HASH, {}).update(`${input}${i}`).digest(DIGEST);
			i++;
		}
		return i - 1;
	};
