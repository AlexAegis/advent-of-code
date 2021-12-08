import { bench, read } from '@lib';
import { day, year } from '.';

/**
 *
 *   0:      1:      2:      3:      4:
 *  aaaa    ....    aaaa    aaaa    ....
 * b    c  .    c  .    c  .    c  b    c
 * b    c  .    c  .    c  .    c  b    c
 *  ....    ....    dddd    dddd    dddd
 * e    f  .    f  e    .  .    f  .    f
 * e    f  .    f  e    .  .    f  .    f
 *  gggg    ....    gggg    gggg    ....
 *
 *   5:      6:      7:      8:      9:
 *  aaaa    aaaa    aaaa    aaaa    aaaa
 * b    .  b    .  .    c  b    c  b    c
 * b    .  b    .  .    c  b    c  b    c
 *  dddd    dddd    ....    dddd    dddd
 * .    f  e    f  .    f  e    f  .    f
 * .    f  e    f  .    f  e    f  .    f
 *  gggg    gggg    ....    gggg    gggg
 */
const getNumberFromCode = (code: string, segmentMap: Record<string, string>): number => {
	if (code.includes(segmentMap['a'])) {
		if (code.includes(segmentMap['b'])) {
			if (code.includes(segmentMap['c'])) {
				if (code.includes(segmentMap['d'])) {
					if (code.includes(segmentMap['e'])) {
						return 8;
					} else {
						return 9;
					}
				} else {
					return 0;
				}
			} else {
				if (code.includes(segmentMap['e'])) {
					return 6;
				} else {
					return 5;
				}
			}
		} else {
			if (code.includes(segmentMap['d'])) {
				if (code.includes(segmentMap['e'])) {
					return 2;
				} else {
					return 3;
				}
			} else {
				return 7;
			}
		}
	} else {
		if (code.includes(segmentMap['b'])) {
			return 4;
		} else {
			return 1;
		}
	}
};

/**
 * Characterset from A - B
 */
const getOnlyInFirst = (a: string, b: string): string => {
	const aLetters = [...a];
	const bLetters = [...b];
	const result = aLetters.filter((aLetter) => !bLetters.find((bLetter) => aLetter === bLetter));
	return result.join('');
};

/**
 * Character Intersection
 */
const getIntersecion = (a: string, b: string): string => {
	const aLetters = [...a];
	const bLetters = [...b];
	const result = aLetters.filter((aLetter) => bLetters.find((bLetter) => aLetter === bLetter));
	return result.join('');
};

/**
 *
 * @param codes of the 10 unique numbers!
 * @returns mapping to the default segment locations
 */
const generateSegmentMap = (codes: string[]): Record<string, string> => {
	const [oneCF] = codes.filter((code) => code.length === 2);
	const [sevenACF] = codes.filter((code) => code.length === 3);
	const [fourBCDF] = codes.filter((code) => code.length === 4);
	const twoThreeFiveABCDEFG = codes.filter((code) => code.length === 5);
	const zeroSixNineABCDEFG = codes.filter((code) => code.length === 6);

	const a = getOnlyInFirst(sevenACF, oneCF);

	const bd = getOnlyInFirst(fourBCDF, sevenACF);

	const [_sixNineABCDEFG, [zeroABCEFG]] = zeroSixNineABCDEFG.partition((code) =>
		[...bd].every((letter) => code.includes(letter))
	);

	const d = getOnlyInFirst(fourBCDF, zeroABCEFG);
	const b = getOnlyInFirst(bd, d);

	const [[fiveABDFG], twoThreeACDEFG] = twoThreeFiveABCDEFG.partition((code) => code.includes(b));

	const fg = getOnlyInFirst(fiveABDFG, `${a}${b}${d}`);
	const f = getIntersecion(fg, oneCF);

	const g = getOnlyInFirst(fg, f);
	const c = getOnlyInFirst(oneCF, f);

	const [[_threeACDFG], [twoACDEG]] = twoThreeACDEFG.partition((code) => code.includes(f));

	const e = getOnlyInFirst(twoACDEG, `${a}${c}${d}${g}`);

	return { a, b, c, d, e, f, g };
};

export const runner = (input: string): number =>
	input
		.lines()
		.map((line) => {
			const [uniqueSignalPatterns, output] = line
				.split(/ \| /)
				.map((codes) => codes.split(/ /g));
			const segmentMap = generateSegmentMap(uniqueSignalPatterns);
			return output
				.map((digit) => getNumberFromCode(digit, segmentMap).toString())
				.join('')
				.toInt();
		})
		.sum();

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1097568 ~0.95ms
}
