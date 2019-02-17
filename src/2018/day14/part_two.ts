export const runner = async (input: number = 327901): Promise<any> =>
	new Promise<any>(async res => {
		const recipes: Array<number> = [3, 7];
		let a = 0;
		let b = 1;
		for (let i = 0; recipes.length <= input + 10; i++) {
			const next = recipes[a] + recipes[b];
			if (next >= 10) {
				recipes.push(Math.floor(next / 10));
				recipes.push(next % 10);
			} else {
				recipes.push(next);
			}
			a = (a + recipes[a] + 1) % recipes.length;
			b = (b + recipes[b] + 1) % recipes.length;
		}
		res(recipes.splice(input, 10).join(''));
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); //
}
