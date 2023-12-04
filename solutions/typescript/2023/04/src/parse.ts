export interface Game {
	id: number;
}

export const parse = (line: string): Game => {
	console.log(line);
	return {
		id: 1,
	};
};
