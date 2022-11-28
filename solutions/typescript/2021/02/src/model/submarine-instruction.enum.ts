export enum SubmarineInstruction {
	FORWARD = 'forward',
	UP = 'up',
	DOWN = 'down',
}

const submarineInstructions = Object.values(SubmarineInstruction);

export const isSubmarineInstruction = (s: string): s is SubmarineInstruction => {
	return submarineInstructions.contains(s as SubmarineInstruction);
};
