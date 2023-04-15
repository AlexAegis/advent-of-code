import { split } from '@alexaegis/advent-of-code-lib';

export interface Monkey {
	id: number;
	items: number[];
	operation: (wl: number) => number;
	test: number;
	trueTarget: number;
	falseTarget: number;
	inspects: number;
}

export class MonkeyBuilder {
	id?: number;
	items: number[] = [];
	operation?: (wl: number) => number;
	test?: number;
	trueTarget?: number;
	falseTarget?: number;

	setId(id: number): void {
		this.id = id;
	}

	setItems(items: number[]): void {
		this.items = items;
	}

	setTest(test: number): void {
		this.test = test;
	}

	setOperation(operation: (wl: number) => number): void {
		this.operation = operation;
	}

	setTrueTarget(trueTarget: number): void {
		this.trueTarget = trueTarget;
	}

	setFalseTarget(falseTarget: number): void {
		this.falseTarget = falseTarget;
	}

	build(): Monkey {
		if (
			this.id !== undefined &&
			this.test !== undefined &&
			this.operation !== undefined &&
			this.falseTarget !== undefined &&
			this.trueTarget !== undefined
		) {
			return {
				id: this.id,
				test: this.test,
				operation: this.operation,
				items: this.items,
				inspects: 0,
				falseTarget: this.falseTarget,
				trueTarget: this.trueTarget,
			};
		} else {
			throw new Error('Monkey not buildable!');
		}
	}
}

export const parse = (input: string): { monkeyMap: Record<number, Monkey>; monkeys: Monkey[] } => {
	const lines = split(input, true);
	const monkeyMap: Record<number, Monkey> = {};

	const monkeyIdMatcher = /^Monkey (\d+):$/;
	const monkeyStartingItemMatcher = /^ *Starting items: (.+)$/;
	const monkeyOperationMatcher = /^ *Operation: new = (.+)$/;
	const monkeyTestMatcher = /^ *Test: divisible by (\d+)$/;
	const monkeyTrueTargetMatcher = /^ *If true: throw to monkey (\d+)$/;
	const monkeyFalseTargetMatcher = /^ *If false: throw to monkey (\d+)$/;

	let monkeyBuilder = new MonkeyBuilder();
	for (const line of lines) {
		if (!line) {
			const monkey = monkeyBuilder.build();
			monkeyMap[monkey.id] = monkey;
			monkeyBuilder = new MonkeyBuilder();
			continue;
		}

		const monkeyIdMatch = monkeyIdMatcher.exec(line)?.[1];
		if (monkeyIdMatch) {
			monkeyBuilder.setId(monkeyIdMatch.toInt());
			continue;
		}

		const monkeyStartingItemMatch = monkeyStartingItemMatcher.exec(line)?.[1];
		if (monkeyStartingItemMatch) {
			monkeyBuilder.setItems(monkeyStartingItemMatch.split(', ').toInt());
			continue;
		}

		const monkeyOperationMatch = monkeyOperationMatcher.exec(line)?.[1];
		if (monkeyOperationMatch) {
			monkeyBuilder.setOperation(eval('old => ' + monkeyOperationMatch));
			continue;
		}

		const monkeyTestMatch = monkeyTestMatcher.exec(line)?.[1];
		if (monkeyTestMatch) {
			monkeyBuilder.setTest(monkeyTestMatch.toInt());
			continue;
		}

		const monkeyTrueTargetMatch = monkeyTrueTargetMatcher.exec(line)?.[1];
		if (monkeyTrueTargetMatch) {
			monkeyBuilder.setTrueTarget(monkeyTrueTargetMatch.toInt());
			continue;
		}

		const monkeyFalseTargetMatch = monkeyFalseTargetMatcher.exec(line)?.[1];
		if (monkeyFalseTargetMatch) {
			monkeyBuilder.setFalseTarget(monkeyFalseTargetMatch.toInt());
			continue;
		}
	}

	return { monkeyMap, monkeys: Object.values(monkeyMap) };
};
