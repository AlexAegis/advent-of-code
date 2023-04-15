import { describe, expect, it } from 'vitest';
import { stringToMatrix } from '../../string/string-to-matrix.function.js';
import {
	A_LETTER_BIG,
	A_LETTER_SMALL,
	D_UNVERIFIED_LETTER_BIG,
	D_UNVERIFIED_LETTER_SMALL,
	E_LETTER_SMALL,
	I_UNVERIFIED_LETTER_BIG,
	M_UNVERIFIED_LETTER_BIG,
	M_UNVERIFIED_LETTER_SMALL,
	N_UNVERIFIED_LETTER_SMALL,
	O_UNVERIFIED_LETTER_BIG,
	Q_UNVERIFIED_LETTER_BIG,
	Q_UNVERIFIED_LETTER_SMALL,
	S_UNVERIFIED_LETTER_BIG,
	T_UNVERIFIED_LETTER_BIG,
	T_UNVERIFIED_LETTER_SMALL,
	U_UNVERIFIED_LETTER_BIG,
	V_UNVERIFIED_LETTER_BIG,
	V_UNVERIFIED_LETTER_SMALL,
	W_UNVERIFIED_LETTER_BIG,
	W_UNVERIFIED_LETTER_SMALL,
	X_UNVERIFIED_LETTER_SMALL,
	Y_UNVERIFIED_LETTER_BIG,
} from './letter-matrix.const.js';
import { parseLetterMatrix } from './parse-letter-matrix.function.js';

const SMALL_ALPHABET_VERIFIED = `\
.##..###...##..####.####..##..#..#.###...##.#..#.#.....##..###..###...###.#..#.#...#.####
#..#.#..#.#..#.#....#....#..#.#..#..#.....#.#.#..#....#..#.#..#.#..#.#....#..#.#...#....#
#..#.###..#....###..###..#....####..#.....#.##...#....#..#.#..#.#..#.#....#..#..#.#....#.
####.#..#.#....#....#....#.##.#..#..#.....#.#.#..#....#..#.###..###...##..#..#...#....#..
#..#.#..#.#..#.#....#....#..#.#..#..#..#..#.#.#..#....#..#.#....#.#.....#.#..#...#...#...
#..#.###...##..####.#.....###.#..#.###..##..#..#.####..##..#....#..#.###...##....#...####`;

const BIG_ALPHABET_VERIFIED = `\
..##...#####...####..######.######..####..#....#....###.#....#.#......#....#.#####..#####..#....#.######
.#..#..#....#.#....#.#......#......#....#.#....#.....#..#...#..#......##...#.#....#.#....#.#....#......#
#....#.#....#.#......#......#......#......#....#.....#..#..#...#......##...#.#....#.#....#..#..#.......#
#....#.#....#.#......#......#......#......#....#.....#..#.#....#......#.#..#.#....#.#....#..#..#......#.
#....#.#####..#......#####..#####..#......######.....#..##.....#......#.#..#.#####..#####....##......#..
######.#....#.#......#......#......#..###.#....#.....#..##.....#......#..#.#.#......#..#.....##.....#...
#....#.#....#.#......#......#......#....#.#....#.....#..#.#....#......#..#.#.#......#...#...#..#...#....
#....#.#....#.#......#......#......#....#.#....#.#...#..#..#...#......#...##.#......#...#...#..#..#.....
#....#.#....#.#....#.#......#......#...##.#....#.#...#..#...#..#......#...##.#......#....#.#....#.#.....
#....#.#####...####..######.#.......###.#.#....#..###...#....#.######.#....#.#......#....#.#....#.######`;

describe('parseLetterMatrix', () => {
	describe('small letters', () => {
		it('should be able to recognize a single letter', () => {
			const result = parseLetterMatrix(stringToMatrix(A_LETTER_SMALL), 'small');
			expect(result).toBe('A');
		});

		it('should be able to parse the verified letters', () => {
			const result = parseLetterMatrix(stringToMatrix(SMALL_ALPHABET_VERIFIED), 'small');
			expect(result).toBe('ABCEFGHIJKLOPRSUYZ');
		});

		it('should be able to parse the extended letters', () => {
			expect(parseLetterMatrix(stringToMatrix(E_LETTER_SMALL), 'small')).toBe('E');
		});

		it('should be able to parse the extended letters', () => {
			expect(parseLetterMatrix(stringToMatrix(D_UNVERIFIED_LETTER_SMALL), 'small')).toBe('D');
			expect(parseLetterMatrix(stringToMatrix(M_UNVERIFIED_LETTER_SMALL), 'small')).toBe('M');
			expect(parseLetterMatrix(stringToMatrix(N_UNVERIFIED_LETTER_SMALL), 'small')).toBe('N');
			expect(parseLetterMatrix(stringToMatrix(Q_UNVERIFIED_LETTER_SMALL), 'small')).toBe('Q');
			expect(parseLetterMatrix(stringToMatrix(T_UNVERIFIED_LETTER_SMALL), 'small')).toBe('T');
			expect(parseLetterMatrix(stringToMatrix(V_UNVERIFIED_LETTER_SMALL), 'small')).toBe('V');
			expect(parseLetterMatrix(stringToMatrix(W_UNVERIFIED_LETTER_SMALL), 'small')).toBe('W');
			expect(parseLetterMatrix(stringToMatrix(X_UNVERIFIED_LETTER_SMALL), 'small')).toBe('X');
		});
	});

	describe('big letters', () => {
		it('should be able to recognize a single letter', () => {
			const result = parseLetterMatrix(stringToMatrix(A_LETTER_BIG), 'big');
			expect(result).toBe('A');
		});

		it('should be able to parse the verified letters', () => {
			const result = parseLetterMatrix(stringToMatrix(BIG_ALPHABET_VERIFIED), 'big');
			expect(result).toBe('ABCEFGHJKLNPRXZ');
		});

		it('should be able to parse the extended letters', () => {
			expect(parseLetterMatrix(stringToMatrix(D_UNVERIFIED_LETTER_BIG), 'big')).toBe('D');
			expect(parseLetterMatrix(stringToMatrix(I_UNVERIFIED_LETTER_BIG), 'big')).toBe('I');
			expect(parseLetterMatrix(stringToMatrix(M_UNVERIFIED_LETTER_BIG), 'big')).toBe('M');
			expect(parseLetterMatrix(stringToMatrix(O_UNVERIFIED_LETTER_BIG), 'big')).toBe('O');
			expect(parseLetterMatrix(stringToMatrix(Q_UNVERIFIED_LETTER_BIG), 'big')).toBe('Q');
			expect(parseLetterMatrix(stringToMatrix(S_UNVERIFIED_LETTER_BIG), 'big')).toBe('S');
			expect(parseLetterMatrix(stringToMatrix(T_UNVERIFIED_LETTER_BIG), 'big')).toBe('T');
			expect(parseLetterMatrix(stringToMatrix(U_UNVERIFIED_LETTER_BIG), 'big')).toBe('U');
			expect(parseLetterMatrix(stringToMatrix(V_UNVERIFIED_LETTER_BIG), 'big')).toBe('V');
			expect(parseLetterMatrix(stringToMatrix(W_UNVERIFIED_LETTER_BIG), 'big')).toBe('W');
			expect(parseLetterMatrix(stringToMatrix(Y_UNVERIFIED_LETTER_BIG), 'big')).toBe('Y');
		});
	});
});
