export interface ToString {
	toString: () => string;
}

export const hasToString = <T>(t: T): t is T & ToString =>
	typeof (t as ToString).toString === 'function';
