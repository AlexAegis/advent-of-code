import { createReadStream } from 'fs';
import { createInterface } from 'readline';

export const runner = async (input: 'example' | 'input' = 'input') =>
	new Promise<string>(async res => {
		const lineCache: Array<string> = [];
		const reader = createInterface({
			input: createReadStream(`src/2018/day02/${input}.txt`)
		});
		reader.on('line', (line: string) => {
			lineCache.forEach(cachedLine => {
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
					res(line.slice(0, notMatchingPos) + line.slice(notMatchingPos + 1, line.length + 1));
					reader.close();
				}
			});
			lineCache.push(line);
		});
	});

if (require.main === module) {
	console.time();
	(async () => {
		console.log(`Resulting checksum: ${await runner()}`);
		console.timeEnd();
	})(); // megsdlpulxvinkatfoyzxcbvq ~20ms
}
