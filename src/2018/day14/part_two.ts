function shift(window: string, last: number, length: number): string {
	if (window.length >= length) {
		return window.slice(window.length - length + 1, window.length) + last;
	} else return window + last;
}

export const runner = async (input: string = '327901'): Promise<any> =>
	new Promise<any>(async res => {
		const recipes: Array<number> = [3, 7];
		let a = 0;
		let b = 1;
		let window: string = '';
		while (true) {
			const next = recipes[a] + recipes[b];
			if (next >= 10) {
				recipes.push(Math.floor(next / 10));
				window = shift(window, recipes[recipes.length - 1], input.length);
				if (window === input) break;
				recipes.push(next % 10);
				window = shift(window, recipes[recipes.length - 1], input.length);
				if (window === input) break;
			} else {
				recipes.push(next);
				window = shift(window, recipes[recipes.length - 1], input.length);
				if (window === input) break;
			}
			a = (a + recipes[a] + 1) % recipes.length;
			b = (b + recipes[b] + 1) % recipes.length;
		}
		res(recipes.length - input.length);
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); // 20229822 ~ 1024ms
}
