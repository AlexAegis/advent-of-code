export const parseLines = (input: string): string[][] => {
	return input
		.split(/\r?\n/)
		.filter(line => !!line)
		.map(line => line.split(''));
};

class A {
	x = 1;

	lol(a: A): number {
		return this.x + a.x;
	}
}

const a = new A();
const b = new A();

console.log(a.lol(b));

console.log(A.prototype.lol.bind(a)(b));
