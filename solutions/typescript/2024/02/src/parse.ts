export type Report = number[];

export const parseReports = (input: string): Report[] =>
	input.lines().map((line) => line.splitToInt());

export const isReportSafe = (report: Report): boolean => {
	let monotoneAscending = true;
	let monotoneDescending = true;
	let safeDiff = true;
	let last = undefined;
	for (const v of report) {
		if (last !== undefined && v <= last) {
			monotoneAscending = false;
		}

		if (last !== undefined && v >= last) {
			monotoneDescending = false;
		}

		if (last !== undefined) {
			const diff = Math.abs(last - v);
			if (diff < 1 || diff > 3) {
				safeDiff = false;
				break;
			}
		}

		if (!monotoneAscending && !monotoneDescending) {
			break;
		}

		last = v;
	}

	return (monotoneAscending || monotoneDescending) && safeDiff;
};
