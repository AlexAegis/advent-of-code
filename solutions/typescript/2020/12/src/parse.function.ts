export enum FerryAction {
	NORTH = 'N',
	SOUTH = 'S',
	EAST = 'E',
	WEST = 'W',
	LEFT = 'L',
	RIGHT = 'R',
	FORWARD = 'F',
}

export interface FerryActionValue {
	action: FerryAction;
	value: number;
}

const r = /([EFLNRSW])(\d+)/;

export const parse = (line: string): FerryActionValue => {
	const [, action, value] = r.exec(line) ?? [];
	return { action: action as FerryAction, value: value ? Number.parseInt(value, 10) : 0 };
};
