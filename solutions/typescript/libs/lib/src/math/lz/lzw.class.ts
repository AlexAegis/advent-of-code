/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * LZ78 compression
 */
export class LZW {
	private tape!: string[];
	private dictionary = new Map<string, number>();
	private symbolSize = 0;
	public constructor(input: (string | number)[]) {
		this.tape = input.map((i) => i.toString());
		for (const [i, fragment] of [
			...this.tape.reduce((a, n) => a.add(n), new Set<string>()).values(),
		].entries()) {
			this.dictionary.set(fragment, i);
		}
		this.symbolSize = this.dictionary.size;
	}

	public multiPass(untilDistinctResultSize = 3): [number[], string[]] {
		const res = this.compress(1);
		const lzw = new LZW(res);
		if (res.reduce((a, n) => a.add(n), new Set<number>()).size <= untilDistinctResultSize) {
			return [res, res.map((r) => r.toString())];
		} else {
			const [r, look] = lzw.multiPass(untilDistinctResultSize);

			return [r, look];
		}
	}

	public reverse(result: number[]): (string | number)[] {
		return result.map((re) => [...this.dictionary.keys()][re]!);
	}

	public compress(rounds = 1, maxDistinctKeys = Number.POSITIVE_INFINITY): number[] {
		let p: string | undefined = this.tape[0];
		let result: number[] = [];
		let i = 0;
		let r = rounds;
		let prevDictLength = this.dictionary.size;
		while (
			i < r &&
			(maxDistinctKeys === Number.POSITIVE_INFINITY ||
				result.reduce((a, n) => a.add(n), new Set<number>()).size > maxDistinctKeys)
		) {
			const localTape = [...this.tape];
			p = localTape.shift();
			result = [];
			for (const c of localTape) {
				const pc = p + c;
				if (this.dictionary.has(pc)) {
					p = pc;
				} else if (p !== undefined) {
					result.push(this.dictionary.get(p)!);
					this.dictionary.set(pc, this.symbolSize++);
					p = c;
				}
			}
			if (
				maxDistinctKeys !== Number.POSITIVE_INFINITY &&
				this.dictionary.size > prevDictLength
			) {
				prevDictLength = this.dictionary.size;
				r++;
			}
			if (p) {
				result.push(this.dictionary.get(p)!);
			}
			i++;
		}
		return result;
	}
}
