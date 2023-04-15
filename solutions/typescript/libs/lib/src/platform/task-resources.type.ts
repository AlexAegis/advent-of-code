export interface TaskMetadata {
	year: number;
	day: number;
	part?: 1 | 2;
}

export const isTaskMetadata = (o: object): o is TaskMetadata =>
	Object.hasOwn(o, 'year') && Object.hasOwn(o, 'day');

/**
 * Some tasks define different handling for their examples than the real input.
 * These differencies can be stored alongside the input file as a `.args.json` file
 * which will be automatically read and parsed.
 */
export interface TaskResources<T, A = undefined> {
	input: T;
	args?: A | undefined;
}

/**
 * The type of a part. There's a default
 * result for the input, but more can be added.
 */
export interface PartResults<T = number> {
	input: T;
	example: T;
	[key: string]: T;
}

/**
 * The type of all the available inputs when it's not presented
 * in a file
 */
export interface PartInputs<T, A> {
	input: TaskResources<T, A>;
	example: TaskResources<T, A>;
	[key: string]: TaskResources<T, A>;
}

/**
 * The type of the results of a Day, describes
 * the results of both parts.
 */
export interface DayResults<O = number, T = O> {
	one: Partial<PartResults<O>>;
	two: Partial<PartResults<T>>;
}

/**
 * When the input is so brief that it's not even presented
 * to you as a separate page I just add them into the `index.ts`
 * in this format
 */
export interface DayInputs<O = number, T = O, A = undefined> {
	one: PartInputs<O, A>;
	two: PartInputs<T, A>;
}
