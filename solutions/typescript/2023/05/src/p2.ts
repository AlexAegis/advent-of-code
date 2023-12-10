import { Interval, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse, type Range } from './parse.js';

/**
 * Takes a set of mappings, and reduces the right side to only the effective ones
 */
export const refract = (left: Range[], right: Range[]): Range[] => {
	const middleColumn = Interval.merge(left.map((l) => l.to));
	// this is the set of sections that are mapping to another region
	const reachableRightMappers = right.flatMap<Range>((rightMapper) =>
		middleColumn
			.filterMap((middleSection) => Interval.intersection(middleSection, rightMapper.from))
			.map((reachableRightMapper) => ({
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
			})),
	);

	const nonMapping = Interval.complement(
		reachableRightMappers.map((r) => r.from),
		middleColumn,
	).map<Range>((interval) => ({
		from: interval,
		to: interval,
		destinationRange: interval.low,
		rangeLength: interval.length,
		slope: 0,
		sourceRangeStart: interval.low,
	}));

	return [...reachableRightMappers, ...nonMapping];
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

	return data.maps
		.reduce((acc, next) => refract(acc, next), seedRanges)
		.map((range) => range.to.low)
		.min();
};

await task(p2, packageJson.aoc); // 26714516 ~0.39ms
