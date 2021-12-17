import { split } from '@lib';
import { Vec2, Vec2String } from '@lib/model';

export enum SeatState {
	FLOOR = '.',
	EMPTY = 'L',
	OCCUPIED = '#',
}

export const parse = (
	input: string
): { seats: Map<Vec2String, SeatState>; height: number; width: number } => {
	const lines = split(input);
	const seats = new Map<Vec2String, SeatState>();
	let y = 0;
	const height = lines.length;
	const width = lines[0]?.length;
	for (const line of lines) {
		let x = 0;
		for (const letter of [...line]) {
			const vec = new Vec2(x, y);
			if (letter === SeatState.EMPTY) {
				seats.set(vec.toString(), letter as SeatState);
			}
			x++;
		}
		y++;
	}
	return { seats, height, width };
};
