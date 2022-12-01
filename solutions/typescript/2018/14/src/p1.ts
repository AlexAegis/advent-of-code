import { benchTask } from '@alexaegis/advent-of-code-lib';

export const p1 = (input: number): string => {
	const recipes: number[] = [3, 7];
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
	return recipes.splice(input, 10).join('');
};

if (process.env.RUN) {
	console.log(`Result: ${await benchTask(p1, { input: 327901 })}`); // 1115317115 ~9.6ms
}
