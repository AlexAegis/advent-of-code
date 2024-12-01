import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2021 - Day 16 - Part One', () => {
	it('should resolve when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(920);
	});

	describe('D2FE28', () => {
		it('should resolve to 6', () => {
			expect(p1('D2FE28')).toEqual(6);
		});
	});

	describe('38006F45291200', () => {
		it('should resolve to 9', () => {
			expect(p1('38006F45291200')).toEqual(9);
		});
	});

	describe('EE00D40C823060', () => {
		it('should resolve to 14', () => {
			expect(p1('EE00D40C823060')).toEqual(14);
		});
	});

	describe('8A004A801A8002F478', () => {
		it('should resolve to 16', () => {
			expect(p1('8A004A801A8002F478')).toEqual(16);
		});
	});

	describe('620080001611562C8802118E34', () => {
		it('should resolve to 12', () => {
			expect(p1('620080001611562C8802118E34')).toEqual(12);
		});
	});

	describe('C0015000016115A2E0802F182340', () => {
		it('should resolve to 23', () => {
			expect(p1('C0015000016115A2E0802F182340')).toEqual(23);
		});
	});

	describe('A0016C880162017C3686B18A3D4780', () => {
		it('should resolve to 31', () => {
			expect(p1('A0016C880162017C3686B18A3D4780')).toEqual(31);
		});
	});

	describe('C200B40A82', () => {
		it('should resolve to 14', () => {
			expect(p1('C200B40A82')).toEqual(14);
		});
	});

	describe('04005AC33890', () => {
		it('should resolve to 8', () => {
			expect(p1('04005AC33890')).toEqual(8);
		});
	});

	describe('880086C3E88112', () => {
		it('should resolve to 15', () => {
			expect(p1('880086C3E88112')).toEqual(15);
		});
	});

	describe('CE00C43D881120', () => {
		it('should resolve to 11', () => {
			expect(p1('CE00C43D881120')).toEqual(11);
		});
	});

	describe('D8005AC2A8F0', () => {
		it('should resolve to 13', () => {
			expect(p1('D8005AC2A8F0')).toEqual(13);
		});
	});

	describe('F600BC2D8F', () => {
		it('should resolve to 19', () => {
			expect(p1('F600BC2D8F')).toEqual(19);
		});
	});

	describe('9C005AC2F8F0', () => {
		it('should resolve to 16', () => {
			expect(p1('9C005AC2F8F0')).toEqual(16);
		});
	});

	describe('9C0141080250320F1802104A08', () => {
		it('should resolve to 20', () => {
			expect(p1('9C0141080250320F1802104A08')).toEqual(20);
		});
	});
});
