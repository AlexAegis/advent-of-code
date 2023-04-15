export const getSizedGroups = <T>(array: T[], groupSize: number): T[][] =>
	array.reduce(
		(groups, next) => {
			let lastGroup = groups[groups.length - 1];
			if (lastGroup) {
				if (lastGroup.length >= groupSize) {
					lastGroup = [];
					groups.push(lastGroup);
				}
				lastGroup.push(next);
			}
			return groups;
		},
		[[]] as T[][]
	);
