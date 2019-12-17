/**
 * LZ78 compression
 */
export class LZW {
	private tape!: string[];
	private dictionary = new Map<string, number>();
	private symbolSize = 0;
	public constructor(input: (string | number)[]) {
		this.tape = input.map(i => i.toString());
		for (const [i, fragment] of [...this.tape.reduce((a, n) => a.add(n), new Set<string>()).values()].entries()) {
			this.dictionary.set(fragment, i);
		}
		this.symbolSize = this.dictionary.size;
	}

	public multiPass(untilDistinctResultSize: number = 3): [number[], string[]] {
		const res = this.compress(1);
		const lzw = new LZW(res);
		if (res.reduce((a, n) => a.add(n), new Set<number>()).size <= untilDistinctResultSize) {
			return [res, res.map(r => r.toString())];
		} else {
			const [r, look] = lzw.multiPass(untilDistinctResultSize);

			return [r, look];
		}
	}

	public reverse(result: number[]): (string | number)[] {
		return result.map(re => [...this.dictionary.keys()][re]);
	}

	public compress(rounds: number = 1, maxDistinctKeys: number = Infinity): number[] {
		let p = this.tape[0];
		let result!: number[];
		let i = 0;
		let r = rounds ?? 1;
		let prevDictLength = this.dictionary.size;
		while (
			i < r &&
			(maxDistinctKeys === Infinity ||
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
					this.dictionary.set(pc, this.symbolSize++);
					p = c;
				}
			}
			if (maxDistinctKeys !== Infinity && this.dictionary.size > prevDictLength) {
				prevDictLength = this.dictionary.size;
				r++;
			}
			if (p) {
				result.push(this.dictionary.get(p) as number);
			}
			i++;
		}
		return result;
	}
}
