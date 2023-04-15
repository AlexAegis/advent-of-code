import { split } from '@alexaegis/advent-of-code-lib';

export interface Valve {
	name: string;
	flowRate: number;
	leadsTo: string[];
}

export const parse = (input: string): Valve[] => {
	const match = /^Valve ([A-Z]{2}) has flow rate=(-?[0-9]+); tunnels? leads? to valves? (.*)$/;
	return split(input).map((line) => {
		const groups = match.exec(line);
		if (groups) {
			const [, name, rawFlowRate, rawLeadsTo] = groups;
			return {
				name,
				flowRate: parseInt(rawFlowRate!, 10),
				leadsTo: rawLeadsTo!.split(', '),
			} as Valve;
		} else {
			throw new Error(`Line is not valve data ${line}`);
		}
	});
};
