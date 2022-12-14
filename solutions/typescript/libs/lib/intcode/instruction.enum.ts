export enum Instruction {
	ADD = 1,
	MUL = 2,
	IN = 3,
	OUT = 4,
	JIT = 5,
	JIF = 6,
	LT = 7,
	EQ = 8,
	REL = 9,
	HALT = 99,
}

export const isInstruction = (n: number): n is Instruction => (n >= 1 && n <= 9) || n === 99;

export const toInstruction = (code: number): Instruction => {
	const inst = code % 100;
	if (isInstruction(inst)) {
		return inst;
	} else {
		throw new Error(`Unsupported instruction ${inst}`);
	}
};
