import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2, passportChecks } from './p2.js';

describe('2020 - Day 4 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).toEqual(224);
	});

	it('should solve the first example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p2(resources.input)).toEqual(2);
	});

	it('should solve the all valid example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.valid.txt');
		expect(p2(resources.input)).toEqual(4);
	});

	it('should solve the all invalid example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.invalid.txt');
		expect(p2(resources.input)).toEqual(0);
	});

	it('should solve for the second input', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'input.2.txt');
		expect(p2(resources.input)).toEqual(198);
	});

	it('should have a working byr check', () => {
		expect(passportChecks.byr('2002')).toEqual(true);
		expect(passportChecks.byr('2003')).toEqual(false);
	});

	it('should have a working hgt check', () => {
		expect(passportChecks.hgt('60in')).toEqual(true);
		expect(passportChecks.hgt('190cm')).toEqual(true);
		expect(passportChecks.hgt('190in')).toEqual(false);
		expect(passportChecks.hgt('190')).toEqual(false);
	});

	it('should have a working hcl check', () => {
		expect(passportChecks.hcl('#123abc')).toEqual(true);
		expect(passportChecks.hcl('#123abz')).toEqual(false);
		expect(passportChecks.hcl('123abc')).toEqual(false);
	});

	it('should have a working pid check', () => {
		expect(passportChecks.pid('000000001')).toEqual(true);
		expect(passportChecks.pid('0123456789')).toEqual(false);
	});
});
