import { bench, read, split } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const [n, data] = split(input);
	const timestamp = parseInt(n, 10);

	const sort = data
		.split(',')
		.filter((id) => id !== 'x')
		.map((sid) => {
			const id = parseInt(sid, 10);
			const turns = Math.floor(timestamp / id);
			const last = turns * id;
			const next = last + id;
			const diff = next - timestamp;
			return { id, diff };
		})
		.sort((a, b) => a.diff - b.diff);

	return sort[0].id * sort[0].diff;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 136 ~0.22ms
}
