import { Coord } from './coord.class';
import { ripple } from './ripple.function';
import { range } from './range.generator';
/*
describe('Day 11, Coord neightbour iterator', () => {
	it('Should be only 9 of them:', async () => {
		console.log(ripple(2, 3, 4));
		//expect(count).toEqual(9);
	});
});*/

let ripstr = ripple(5, 3, 4).map(c => c.toString());
console.log(ripstr.length);
for (let x = -4; x <= 10; x++) {
	let line = '';
	for (let y = -4; y <= 10; y++) {
		if (ripstr.indexOf(new Coord(x, y).toString()) >= 0) {
			line += 'X';
		} else {
			line += '.';
		}
	}
	console.log(line);
}
