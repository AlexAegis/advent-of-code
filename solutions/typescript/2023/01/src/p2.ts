import { NEWLINE, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p2 = (input: string): number => {
	return input
		.split(NEWLINE)
		.map((line) => {
			let bufferForFirst = '';
			for (const l of line.chars()) {
				bufferForFirst += l;
				bufferForFirst = bufferForFirst
					.replaceAll('one', '1')
					.replaceAll('two', '2')
					.replaceAll('three', '3')
					.replaceAll('four', '4')
					.replaceAll('five', '5')
					.replaceAll('six', '6')
					.replaceAll('seven', '7')
					.replaceAll('eight', '8')

					.replaceAll('nine', '9');
			}

			let bufferForLast = '';
			for (const l of line.chars().reverse()) {
				bufferForLast = l + bufferForLast;
				bufferForLast = bufferForLast
					.replaceAll('one', '1')
					.replaceAll('two', '2')
					.replaceAll('three', '3')
					.replaceAll('four', '4')
					.replaceAll('five', '5')
					.replaceAll('six', '6')
					.replaceAll('seven', '7')
					.replaceAll('eight', '8')

					.replaceAll('nine', '9');
			}

			const f = bufferForFirst
				.chars()
				.find((l) => /\d/.test(l))
				?.toInt()
				.toString();

			const l = bufferForLast
				.chars()
				.reverse()
				.find((l) => /\d/.test(l))
				?.toInt()
				.toString();

			return f && l ? (f + l).toInt() : 0;
		})
		.sum();
};

await task(p2, packageJson.aoc); // 53348 ~?ms
