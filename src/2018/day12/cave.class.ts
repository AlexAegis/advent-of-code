export class Cave {
	row: string;
	rules: Array<string> = [];

	normalize() {
		const start = this.countFromEnds(this.row, '.');
		const end = this.countFromEnds(this.row, '.', true);
		this.row = '.'.repeat(Math.max(0, 4 - start)) + this.row.slice(Math.max(0, start - 4), this.row.length);
		this.row = this.row.slice(0, this.row.length - Math.max(0, end - 4)) + '.'.repeat(Math.max(0, 4 - end));
	}

	countFromEnds(input: string, match: string, invert: boolean = false): number {
		let i = 0;
		while (i < input.length) {
			if (input[(invert ? input.length - 1 : 0) - i * (invert ? 1 : -1)] !== match) {
				break;
			}
			i++;
		}
		return i;
	}
}
