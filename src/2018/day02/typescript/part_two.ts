import { bench } from '@root/bench.function';
import { reader } from '@root/reader.function';

export const runner = async (input: string) => {
	const lineCache: Array<string> = [];
	for (const line of input.split(/\r?\n/)) {
		for (const cachedLine of lineCache) {
			let matchingChars = 0;
			let notMatchingPos;
			for (let i = 0; i < cachedLine.length; i++) {
				if (line.charAt(i) === cachedLine.charAt(i)) {
					matchingChars++;
				} else {
					notMatchingPos = i;
				}
			}
			if (matchingChars + 1 === cachedLine.length) {
				return line.slice(0, notMatchingPos) + line.slice(notMatchingPos + 1, line.length + 1);
			}
		}
		lineCache.push(line);
	}
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(2018, 2, 'input.txt'), runner)}`))(); // megsdlpulxvinkatfoyzxcbvq ~9.5ms
}
