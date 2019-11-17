import { bench, read } from '@root';
import { day, year } from '.';
import { hashSearch } from './hash-search.function';

export const runner = hashSearch(6);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 9958218 ~18622ms
}
