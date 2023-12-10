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
	const middleColumn = Interval.merge(left.map((l) => l.to));
	console.log('middle\t\t', middleColumn.toString());
	console.log('rightFrom\t', right.map((r) => r.from).toString());
	console.log('rightTo\t\t', right.map((r) => r.to).toString());

	// first, this is the set of sections that are mapping to another region
	const reachableRightMappers = right.flatMap<Range>((rightMapper) => {
		const reachableRightMappers = middleColumn.filterMap((middleSection) =>
			Interval.intersection(middleSection, rightMapper.from),
		);
		return reachableRightMappers.map((reachableRightMapper) => {
			const res = {
				from: reachableRightMapper,
				slope: rightMapper.slope,
				sourceRangeStart: reachableRightMapper.low,
				destinationRange: reachableRightMapper.low + rightMapper.slope,
				rangeLength:
					reachableRightMapper.length -
					(reachableRightMapper.highQualifier === 'closed' ? 1 : 0),
				to: new Interval(
					reachableRightMapper.low + rightMapper.slope,
					reachableRightMapper.high + rightMapper.slope,
					{
						highQualifier: reachableRightMapper.highQualifier,
						lowQualifier: reachableRightMapper.lowQualifier,
					},
				),
			};

			//console.log(
			//	'INTERSEC',
			//	rightMapper.from.toString(),
			//	'->',
			//	rightMapper.to.toString(),
			//	'intersection:',
			//	reachableRightMapper?.toString() ?? 'NONE',
			//	'=>',
			//	res?.to.toString(),
			//);
			return res;
		});
	});

	const nonMapping = Interval.complement(
		reachableRightMappers.map((r) => r.from),
		middleColumn.map(
			(m) =>
				new Interval(m.low, m.high, {
					lowQualifier: 'open',
					highQualifier: 'open',
				}),
		),
	).filter((i) => i.isFinite() && i.length > 0); //.map(i => i.as);

	// const nonMapping = Interval.complement(reachableRightMappers.map((r) => r.from)).flatMap((i) =>
	// 	middleColumn.filterMap((m) => i.trim(m)),
	// );
	console.log(
		'nonMapping',
		nonMapping.map((nm) => nm.toString()),
	);

	reachableRightMappers.push(
		...nonMapping.map<Range>((interval) => ({
			from: interval,
			to: interval,
			destinationRange: interval.low,
			rangeLength: interval.length,
			slope: 0,
			sourceRangeStart: interval.low,
		})),
	);
	return reachableRightMappers;
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

	const maps = [
		data.seedToSoilMap,
		data.soilToFertilizerMap,
		data.fertilizerToWaterMap,
		data.waterToLightMap,
		data.lightToTemperatureMap,
		data.temperatureToHumidityMap,
		data.humidityToLocationMap,
	];

	return maps
		.reduce((acc, next) => refract(acc, next), seedRanges)
		.map((range) => range.to.low)
		.min();
};

await task(p2, packageJson.aoc); // 26714516 ~4.36ms
