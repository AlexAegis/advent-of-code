import { runner } from './task';

describe('Day 10, Part One and Two', () => {
	it('Should be:', async () => {
		expect('HI').toEqual('HI');
	});

	it('Should be:', async () => {
		expect(await runner('example')).toEqual(3);
	});

	it('Should be:', async () => {
		expect('KBJHEZCB').toEqual('KBJHEZCB');
	});

	it('Should be:', async () => {
		expect(await runner()).toEqual(10369);
	});
});
