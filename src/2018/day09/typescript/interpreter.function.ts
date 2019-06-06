export interface Setup {
	players: number;
	lastMarble: number;
}

export const interpreter = (input: string): Setup => {
	const split = input.split(' ');
	return { players: Number(split[0]), lastMarble: Number(split[6]) };
};
