export interface SpringLog {
	/**
	 * `?` unknown
	 * `.` operational
	 * `#` damaged
	 */
	log: string;
	criteria: number[];
	criteriaRegExp: RegExp;
}

export const criteriaToRegExp = (criteria: number[]): RegExp =>
	new RegExp('^\\.*' + criteria.map((brokenCount) => `#{${brokenCount}}`).join('\\.+') + '\\.*$');

export const parse = (input: string): SpringLog[] => {
	return input.lines(false).map<SpringLog>((line) => {
		const [log, critRaw] = line.splitIntoStringPair(' ');
		const crit = critRaw.splitToInt({ delimiter: /,/ });
		return {
			log,
			criteria: crit,
			criteriaRegExp: criteriaToRegExp(crit),
		};
	});
};
