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

const r = /([NSEWLRF]{1})(\d+)/;

export const parse = (line: string): FerryActionValue => {
	const [, action, value] = r.exec(line) ?? [];
	return { action: action as FerryAction, value: value ? parseInt(value, 10) : 0 };
};
