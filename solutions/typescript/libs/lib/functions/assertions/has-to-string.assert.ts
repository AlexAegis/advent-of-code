import type { ToString } from '../../model/to-string.interface.js';

export const hasToString = <T>(t: T): t is T & ToString =>
	typeof (t as ToString).toString === 'function';
