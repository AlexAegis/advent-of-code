import { add } from 'benny';

import { defaultBench } from '../../benchmark/index.js';
import { invMod, invModBigInt, invModEgdc, invModEgdcBigInt } from './inverse-modulo.function.js';

await defaultBench(
	'Inverse Modulo',
	add('invModEgdc', () => {
		invModEgdc(123, 4567);
	}),
	add('invModEgdcBigInt', () => {
		invModEgdcBigInt(123n, 4567n);
	}),
	add('invMod', () => {
		invMod(123, 4567);
	}),
	add('invModBigInt', () => {
		invModBigInt(123n, 4567n);
	}),
);
