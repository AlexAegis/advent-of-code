export const getSizedGroups = <T>(array: T[], groupSize: number): T[][] =>
	array.reduce<T[][]>(
		(groups, next) => {
			let lastGroup = groups.at(-1);
			if (lastGroup) {
				if (lastGroup.length >= groupSize) {
					lastGroup = [];
					groups.push(lastGroup);
				}
				lastGroup.push(next);
			}
			return groups;
		},
		[[]],
	);
