export class Cave {
	public rules: string[] = [];
	public offset = 0;

	public constructor(public row: string) {}

	public normalize(): void {
		const start = this.countFromEnds(this.row, '.');
		const end = this.countFromEnds(this.row, '.', true);
		this.offset += start - 4;
		this.row = '.'.repeat(Math.max(0, 4 - start)) + this.row.slice(Math.max(0, start - 4), this.row.length);
		this.row = this.row.slice(0, this.row.length - Math.max(0, end - 4)) + '.'.repeat(Math.max(0, 4 - end));
	}

	public count(): number {
		return (this.row.match(/#/g) || []).length;
	}

	public score(): number {
		return [...this.row].reduce((acc, pot, i) => (pot === `#` ? (acc += i + this.offset) : acc), 0);
	}

	public invert(char: string): string {
		return char === '.' ? '#' : '.';
	}

	public countFromEnds(input: string, match: string, invert: boolean = false): number {
		let i = 0;
		while (i < input.length) {
			if (input[(invert ? input.length - 1 : 0) - i * (invert ? 1 : -1)] !== match) {
				break;
			}
			i++;
		}
		return i;
	}

	public toString(): string {
		return `${this.row} count: ${this.count()} offset: ${this.offset} score: ${this.score()}`;
	}
}
