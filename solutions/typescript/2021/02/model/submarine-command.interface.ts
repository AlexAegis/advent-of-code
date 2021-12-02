import { isSubmarineInstruction, SubmarineInstruction } from './submarine-instruction.enum';

export interface SubmarineCommand {
	instruction: SubmarineInstruction;
	amplitude: number;
}

export const parseSubmarineCommand = (line: string): SubmarineCommand | undefined => {
	const [a, b] = line.split(' ');
	if (isSubmarineInstruction(a)) {
		const amplitude = parseInt(b, 10);
		return { instruction: a, amplitude };
	} else return undefined;
};
