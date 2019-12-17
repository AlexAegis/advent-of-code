import { LZPointer } from './lz-pointer.class';

/**
 * LZ78 compression
 */
export class LZW {
	private tape!: string[];
	private dictionary = new Map<string, number>();
	private dictionarySize = 0;
	public constructor(input: string[]) {
		this.tape = input;
		for (const [i, fragment] of [...input.reduce((a, n) => a.add(n), new Set<string>()).values()].entries()) {
			this.dictionary.set(fragment, i);
		}
		this.dictionarySize = this.dictionary.size;
		console.log(this.dictionarySize, this.dictionary);
	}

	public compress(rounds: number = 1, maxDistinctKeys: number = Infinity): number[] {
		let p = this.tape[0];
		let result!: number[];
		let i = 0;
		let r = rounds ?? 1;
		let prevDictLength = this.dictionary.size;
		while (
			i < r &&
			(!maxDistinctKeys ||
				!result ||
				(result && result.reduce((a, n) => a.add(n), new Set<number>()).size > maxDistinctKeys))
		) {
			const localTape = [...this.tape];
			p = localTape.shift() as string;
			result = [];
			for (const c of localTape) {
				const pc = p + c;
				if (this.dictionary.has(pc)) {
					p = pc;
				} else {
					result.push(this.dictionary.get(p) as number);
					this.dictionary.set(pc, this.dictionarySize++);
					p = c;
				}
			}
			if (this.dictionary.size > prevDictLength) {
				prevDictLength = this.dictionary.size;
				r++;
			}
			//
			if (p) {
				result.push(this.dictionary.get(p) as number);
			}
			const bak = result.map(r => [...this.dictionary.keys()][r]).join('');
			console.log(this.dictionarySize, this.dictionary);
			console.log(bak);
			i++;
		}

		// result = result.slice(result.length - rounds)

		return result;
	}
}

/*
  PSEUDOCODE
  1     Initialize table with single character strings
  2     P = first input character
  3     WHILE not end of input stream
  4          C = next input character
  5          IF P + C is in the string table
  6            P = P + C
  7          ELSE
  8            output the code for P
  9          add P + C to the string table
  10           P = C
  11         END WHILE
  12    output code for P
 */
