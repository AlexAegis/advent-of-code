import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2021 - Day 16 - Part Two', () => {
	it('should resolve when using the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(10185143721112);
	});

	describe('D2FE28', () => {
		it('should resolve to 2021', async () => {
			expect(await runner('D2FE28')).to.equal(2021);
		});
	});

	describe('38006F45291200', () => {
		it('should resolve to 1', async () => {
			expect(await runner('38006F45291200')).to.equal(1);
		});
	});

	describe('EE00D40C823060', () => {
		it('should resolve to 3', async () => {
			expect(await runner('EE00D40C823060')).to.equal(3);
		});
	});

	describe('8A004A801A8002F478', () => {
		it('should resolve to 15', async () => {
			expect(await runner('8A004A801A8002F478')).to.equal(15);
		});
	});

	describe('620080001611562C8802118E34', () => {
		it('should resolve to 46', async () => {
			expect(await runner('620080001611562C8802118E34')).to.equal(46);
		});
	});

	describe('C0015000016115A2E0802F182340', () => {
		it('should resolve to 46', async () => {
			expect(await runner('C0015000016115A2E0802F182340')).to.equal(46);
		});
	});

	describe('A0016C880162017C3686B18A3D4780', () => {
		it('should resolve to 54', async () => {
			expect(await runner('A0016C880162017C3686B18A3D4780')).to.equal(54);
		});
	});

	describe('C200B40A82', () => {
		it('should resolve to 3', async () => {
			expect(await runner('C200B40A82')).to.equal(3);
		});
	});

	describe('04005AC33890', () => {
		it('should resolve to 54', async () => {
			expect(await runner('04005AC33890')).to.equal(54);
		});
	});

	describe('880086C3E88112', () => {
		it('should resolve to 7', async () => {
			expect(await runner('880086C3E88112')).to.equal(7);
		});
	});

	describe('CE00C43D881120', () => {
		it('should resolve to 9', async () => {
			expect(await runner('CE00C43D881120')).to.equal(9);
		});
	});

	describe('D8005AC2A8F0', () => {
		it('should resolve to 1', async () => {
			expect(await runner('D8005AC2A8F0')).to.equal(1);
		});
	});

	describe('F600BC2D8F', () => {
		it('should resolve to 0', async () => {
			expect(await runner('F600BC2D8F')).to.equal(0);
		});
	});

	describe('9C005AC2F8F0', () => {
		it('should resolve to 0', async () => {
			expect(await runner('9C005AC2F8F0')).to.equal(0);
		});
	});

	describe('9C0141080250320F1802104A08', () => {
		it('should resolve to 1', async () => {
			expect(await runner('9C0141080250320F1802104A08')).to.equal(1);
		});
	});
});
