export const parse = (input: string): number[][] =>
	input.lines(false).map((line) => line.splitToInt());

export const extrapolateSequence = (sequence: number[]): number[][] => {
	const sequenceStack: number[][] = [sequence];
	while (sequenceStack.last().some((i) => i !== 0)) {
		sequenceStack.push(
			sequenceStack
				.last()
				.slideWindow(2, 1)
				.map(([left, right]) => right - left),
		);
	}
	return sequenceStack;
};
