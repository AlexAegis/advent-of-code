import { NEWLINE } from '../../regex/index.js';

export type SmallLetterMatrixAlphabet = (typeof UPPERCASE_ALPHABET)[number];
type RowRenderedLetter = string[];
export type RowRenderedAlphaBet = Record<SmallLetterMatrixAlphabet, RowRenderedLetter>;
export type LetterMatrixType = 'small' | 'big';

export const getMatrixAlphabet = (
	letterMatrixType: LetterMatrixType,
): Readonly<Record<SmallLetterMatrixAlphabet, string>> => {
	return letterMatrixType === 'small' ? MATRIX_ALPHABET_SMALL : MATRIX_ALPHABET_BIG;
};

export const getRowRenderedAlphabet = (letterMatrixType: LetterMatrixType): RowRenderedAlphaBet => {
	return Object.fromEntries(
		Object.entries(getMatrixAlphabet(letterMatrixType)).map(([key, value]) => [
			key,
			value.split(NEWLINE),
		]),
	) as RowRenderedAlphaBet;
};

export const UPPERCASE_ALPHABET = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
] as const;

export const A_LETTER_SMALL = `\
.##.
#..#
#..#
####
#..#
#..#` as const;

export const B_LETTER_SMALL = `\
###.
#..#
###.
#..#
#..#
###.` as const;

export const C_LETTER_SMALL = `\
.##.
#..#
#...
#...
#..#
.##.` as const;

export const D_UNVERIFIED_LETTER_SMALL = `\
###.
#..#
#..#
#..#
#..#
###.` as const;

export const E_LETTER_SMALL = `\
####
#...
###.
#...
#...
####` as const;

export const F_LETTER_SMALL = `\
####
#...
###.
#...
#...
#...` as const;

export const G_LETTER_SMALL = `\
.##.
#..#
#...
#.##
#..#
.###` as const;

export const H_LETTER_SMALL = `\
#..#
#..#
####
#..#
#..#
#..#` as const;

export const I_LETTER_SMALL = `\
###
.#.
.#.
.#.
.#.
###` as const;

export const J_LETTER_SMALL = `\
..##
...#
...#
...#
#..#
.##.` as const;

export const K_LETTER_SMALL = `\
#..#
#.#.
##..
#.#.
#.#.
#..#` as const;

export const L_LETTER_SMALL = `\
#...
#...
#...
#...
#...
####` as const;

export const M_UNVERIFIED_LETTER_SMALL = `\
#...#
##.##
#.#.#
#...#
#...#
#...#` as const;

export const N_UNVERIFIED_LETTER_SMALL = `\
#...#
##..#
#.#.#
#.#.#
#..##
#...#` as const;

export const O_LETTER_SMALL = `\
.##.
#..#
#..#
#..#
#..#
.##.` as const;

export const P_LETTER_SMALL = `\
###.
#..#
#..#
###.
#...
#...` as const;

export const Q_UNVERIFIED_LETTER_SMALL = `\
.##.
#..#
#..#
#..#
#.##
.###` as const;

export const R_LETTER_SMALL = `\
###.
#..#
#..#
###.
#.#.
#..#` as const;

export const S_LETTER_SMALL = `\
.###
#...
#...
.##.
...#
###.` as const;

export const T_UNVERIFIED_LETTER_SMALL = `\
#####
..#..
..#..
..#..
..#..
..#..` as const;

export const U_LETTER_SMALL = `\
#..#
#..#
#..#
#..#
#..#
.##.` as const;

export const V_UNVERIFIED_LETTER_SMALL = `\
#...#
#...#
#...#
#...#
.#.#.
..#..` as const;

export const W_UNVERIFIED_LETTER_SMALL = `\
#.......#
#.......#
#...#...#
#...#...#
.#.#.#.#.
..#...#..` as const;

export const X_UNVERIFIED_LETTER_SMALL = `\
#...#
.#.#.
..#..
..#..
.#.#.
#...#` as const;

export const Y_LETTER_SMALL = `\
#...#
#...#
.#.#.
..#..
..#..
..#..` as const;

export const Z_LETTER_SMALL = `\
####
...#
..#.
.#..
#...
####` as const;

export const MATRIX_ALPHABET_SMALL = {
	A: A_LETTER_SMALL,
	B: B_LETTER_SMALL,
	C: C_LETTER_SMALL,
	D: D_UNVERIFIED_LETTER_SMALL,
	E: E_LETTER_SMALL,
	F: F_LETTER_SMALL,
	G: G_LETTER_SMALL,
	H: H_LETTER_SMALL,
	I: I_LETTER_SMALL,
	J: J_LETTER_SMALL,
	K: K_LETTER_SMALL,
	L: L_LETTER_SMALL,
	M: M_UNVERIFIED_LETTER_SMALL,
	N: N_UNVERIFIED_LETTER_SMALL,
	O: O_LETTER_SMALL,
	P: P_LETTER_SMALL,
	Q: Q_UNVERIFIED_LETTER_SMALL,
	R: R_LETTER_SMALL,
	S: S_LETTER_SMALL,
	T: T_UNVERIFIED_LETTER_SMALL,
	U: U_LETTER_SMALL,
	V: V_UNVERIFIED_LETTER_SMALL,
	W: W_UNVERIFIED_LETTER_SMALL,
	X: X_UNVERIFIED_LETTER_SMALL,
	Y: Y_LETTER_SMALL,
	Z: Z_LETTER_SMALL,
} as const;

export const A_LETTER_BIG = `\
..##..
.#..#.
#....#
#....#
#....#
######
#....#
#....#
#....#
#....#
` as const;

export const B_LETTER_BIG = `\
#####.
#....#
#....#
#....#
#####.
#....#
#....#
#....#
#....#
#####.
` as const;

export const C_LETTER_BIG = `\
.####.
#....#
#.....
#.....
#.....
#.....
#.....
#.....
#....#
.####.
` as const;

export const D_UNVERIFIED_LETTER_BIG = `\
#####.
#....#
#....#
#....#
#....#
#....#
#....#
#....#
#....#
#####.
` as const;

export const E_LETTER_BIG = `\
######
#.....
#.....
#.....
#####.
#.....
#.....
#.....
#.....
######
` as const;

export const F_LETTER_BIG = `\
######
#.....
#.....
#.....
#####.
#.....
#.....
#.....
#.....
#.....
` as const;

export const G_LETTER_BIG = `\
.####.
#....#
#.....
#.....
#.....
#..###
#....#
#....#
#...##
.###.#
` as const;

export const H_LETTER_BIG = `\
#....#
#....#
#....#
#....#
######
#....#
#....#
#....#
#....#
#....#
` as const;

export const I_UNVERIFIED_LETTER_BIG = `\
###
.#.
.#.
.#.
.#.
.#.
.#.
.#.
.#.
###
` as const;

export const J_LETTER_BIG = `\
...###
....#.
....#.
....#.
....#.
....#.
....#.
#...#.
#...#.
.###..
` as const;

export const K_LETTER_BIG = `\
#....#
#...#.
#..#..
#.#...
##....
##....
#.#...
#..#..
#...#.
#....#
` as const;

export const L_LETTER_BIG = `\
#.....
#.....
#.....
#.....
#.....
#.....
#.....
#.....
#.....
######
` as const;

export const M_UNVERIFIED_LETTER_BIG = `\
#.....#
##...##
##...##
#.#.#.#
#.#.#.#
#..#..#
#..#..#
#.....#
#.....#
#.....#
` as const;

export const N_LETTER_BIG = `\
#....#
##...#
##...#
#.#..#
#.#..#
#..#.#
#..#.#
#...##
#...##
#....#
` as const;

export const O_UNVERIFIED_LETTER_BIG = `\
.####.
#....#
#....#
#....#
#....#
#....#
#....#
#....#
#....#
.####.
` as const;

export const P_LETTER_BIG = `\
#####.
#....#
#....#
#....#
#####.
#.....
#.....
#.....
#.....
#.....
` as const;

export const Q_UNVERIFIED_LETTER_BIG = `\
.####.
#....#
#....#
#....#
#....#
#....#
#....#
#..#.#
#...##
.#####
` as const;

export const R_LETTER_BIG = `\
#####.
#....#
#....#
#....#
#####.
#..#..
#...#.
#...#.
#....#
#....#
` as const;

export const S_UNVERIFIED_LETTER_BIG = `\
.####.
#.....
#.....
#.....
.####.
.....#
.....#
.....#
.....#
#####.
` as const;

export const T_UNVERIFIED_LETTER_BIG = `\
#####
..#..
..#..
..#..
..#..
..#..
..#..
..#..
..#..
..#..
` as const;

export const U_UNVERIFIED_LETTER_BIG = `\
#....#
#....#
#....#
#....#
#....#
#....#
#....#
#....#
#....#
.####.
` as const;

export const V_UNVERIFIED_LETTER_BIG = `\
#...#
#...#
#...#
#...#
#...#
#...#
#...#
.#.#.
.#.#.
..#..
` as const;

export const W_UNVERIFIED_LETTER_BIG = `\
#.......#
#.......#
#.......#
#...#...#
#...#...#
#...#...#
#...#...#
.#.#.#.#.
.#.#.#.#.
..#...#..
` as const;

export const X_LETTER_BIG = `\
#....#
#....#
.#..#.
.#..#.
..##..
..##..
.#..#.
.#..#.
#....#
#....#
` as const;

export const Y_UNVERIFIED_LETTER_BIG = `\
#...#
#...#
.#.#.
.#.#.
..#..
..#..
..#..
..#..
..#..
..#..
` as const;

export const Z_LETTER_BIG = `\
######
.....#
.....#
....#.
...#..
..#...
.#....
#.....
#.....
######
` as const;

export const MATRIX_ALPHABET_BIG = {
	A: A_LETTER_BIG,
	B: B_LETTER_BIG,
	C: C_LETTER_BIG,
	D: D_UNVERIFIED_LETTER_BIG,
	E: E_LETTER_BIG,
	F: F_LETTER_BIG,
	G: G_LETTER_BIG,
	H: H_LETTER_BIG,
	I: I_UNVERIFIED_LETTER_BIG,
	J: J_LETTER_BIG,
	K: K_LETTER_BIG,
	L: L_LETTER_BIG,
	M: M_UNVERIFIED_LETTER_BIG,
	N: N_LETTER_BIG,
	O: O_UNVERIFIED_LETTER_BIG,
	P: P_LETTER_BIG,
	Q: Q_UNVERIFIED_LETTER_BIG,
	R: R_LETTER_BIG,
	S: S_UNVERIFIED_LETTER_BIG,
	T: T_UNVERIFIED_LETTER_BIG,
	U: U_UNVERIFIED_LETTER_BIG,
	V: V_UNVERIFIED_LETTER_BIG,
	W: W_UNVERIFIED_LETTER_BIG,
	X: X_LETTER_BIG,
	Y: Y_UNVERIFIED_LETTER_BIG,
	Z: Z_LETTER_BIG,
} as const;
