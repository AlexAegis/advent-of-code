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

export const parse = (line: string): FerryActionValue => {
	const [, action, value] = line.split(/([NSEWLRF]{1})(\d+)/);
	return { action: action as FerryAction, value: parseInt(value, 10) };
};
