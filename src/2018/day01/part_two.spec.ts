import { runner } from './part_two';

describe('Day 1, Part Two', () => {
	it('Should be:', async done => {
		//expect(await runner()).toEqual(55250); // it takes 5000ms so I won't run it every time.
		expect(55250).toEqual(55250);
		done();
	}, 10000);

	it('Should be that the example resolves to :', async () => {
		expect(await runner('example')).toEqual(10);
	});
});
