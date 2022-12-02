export const enum Shape {
	ROCK = 1,
	PAPER = 2,
	SCISSORS = 3,
}

export type ShapeKey = 'A' | 'B' | 'C';
export type StrategyResponse = 'X' | 'Y' | 'Z';

export type Strategy = [ShapeKey, StrategyResponse];

export const shapeKeyMap: Record<ShapeKey, Shape> = {
	A: Shape.ROCK,
	B: Shape.PAPER,
	C: Shape.SCISSORS,
};

export const winningResponseMap: Record<Shape, Shape> = {
	[Shape.ROCK]: Shape.PAPER,
	[Shape.PAPER]: Shape.SCISSORS,
	[Shape.SCISSORS]: Shape.ROCK,
};

export const losingResponseMap: Record<Shape, Shape> = {
	[Shape.ROCK]: Shape.SCISSORS,
	[Shape.PAPER]: Shape.ROCK,
	[Shape.SCISSORS]: Shape.PAPER,
};

export const enum Outcome {
	WIN = 6,
	DRAW = 3,
	LOSE = 0,
}

export const getOutcome = (opponentChoice: Shape, myChoice: Shape): Outcome => {
	if (winningResponseMap[opponentChoice] === myChoice) {
		return Outcome.WIN;
	} else if (losingResponseMap[opponentChoice] === myChoice) {
		return Outcome.LOSE;
	} else {
		return Outcome.DRAW;
	}
};
