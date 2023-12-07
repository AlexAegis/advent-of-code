import { Interval, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse, type Range } from './parse.js';

export const getRangeEnd = (range: Range): number => {
	return range.destinationRange + range.rangeLength;
};

/**
 * Takes a set of mappings, and reduces the right side to only the effective ones
 *
 *
 */
export const refract = (left: Range[], right: Range[]): Range[] => {
	const middle = Interval.merge(left.map((l) => l.to));
	// first, this is the set of sections that are mapping to another region
	const results = right.filterMap<Range>((r) => {
		const intersection = Interval.intersect([r.from, ...middle]);
		return intersection
			? {
					from: intersection,
					slope: r.slope,
					sourceRangeStart: intersection.low,
					destinationRange: intersection.low + r.slope,
					rangeLength: r.rangeLength,
					to: new Interval(intersection.low, intersection.high, {
						highQualifier: intersection.highQualifier,
						lowQualifier: intersection.lowQualifier,
					}),
			  }
			: undefined;
	});

	const nonMapping = Interval.complement(
		results.map((r) => r.from),
		middle,
	);

	results.push(
		...nonMapping.map<Range>((interval) => ({
			from: interval,
			to: interval,
			destinationRange: interval.low,
			rangeLength: interval.length,
			slope: 0,
			sourceRangeStart: interval.low,
		})),
	);
	return results;
};

export const p2 = (input: string): number => {
	const data = parse(input);
	const seedRanges = data.seeds.slideWindow(2, 2).map(([seedStart, seedCount]) => ({
		sourceRangeStart: seedStart,
		destinationRange: seedStart,
		rangeLength: seedCount,
		from: Interval.closed(seedStart, seedStart + seedCount - 1),
		to: Interval.closed(seedStart, seedStart + seedCount - 1),
		slope: 0,
	}));

	console.log(
		'seedRanges',
		seedRanges.map((r) => `from: ${r.from.toString()} to: ${r.to.toString()}`).join('\n'),
	);

	const seedToSoilRefraction = refract(seedRanges, data.seedToSoilMap);

	console.log(
		'seedToSoilRefraction',
		seedToSoilRefraction
			.map((r) => `from: ${r.from.toString()} to: ${r.to.toString()}`)
			.join('\n'),
	);

	const soilToFertilizerRefraction = refract(seedToSoilRefraction, data.soilToFertilizerMap);

	const fertilizerToWaterRefraction = refract(
		soilToFertilizerRefraction,
		data.fertilizerToWaterMap,
	);

	const waterToLightRefraction = refract(fertilizerToWaterRefraction, data.waterToLightMap);

	const lightToTemperatureRefraction = refract(
		waterToLightRefraction,
		data.lightToTemperatureMap,
	);

	const temperatureToHumidityRefraction = refract(
		lightToTemperatureRefraction,
		data.temperatureToHumidityMap,
	);

	const humidityToLocationRefraction = refract(
		temperatureToHumidityRefraction,
		data.humidityToLocationMap,
	);

	const result = humidityToLocationRefraction.map((range) => range.sourceRangeStart).min();
	console.log(result);
	return 0;
};

await task(p2, packageJson.aoc, 'example.1.txt'); // 84470622 ~4.36ms
