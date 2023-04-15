import { PairTree } from '@alexaegis/advent-of-code-lib/model';
import { beforeEach, describe, expect, it } from 'vitest';
import {
	addSnailfishNumbers,
	getMagnitude,
	parseSnailfishNumber,
	triggerExplosion,
	type SnailfishNumber,
} from './snailfish-number.js';

describe('snailfish numbers', () => {
	describe('magnitude', () => {
		it('should be 143 for [[1,2],[[3,4],5]]', () => {
			const number = parseSnailfishNumber('[[1,2],[[3,4],5]]');
			expect(getMagnitude(number)).to.equal(143);
		});

		it('should be 1384 for [[[[0,7],4],[[7,8],[6,0]]],[8,1]]', () => {
			const number = parseSnailfishNumber('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]');
			expect(getMagnitude(number)).to.equal(1384);
		});

		it('should be 445 for [[[[1,1],[2,2]],[3,3]],[4,4]]', () => {
			const number = parseSnailfishNumber('[[[[1,1],[2,2]],[3,3]],[4,4]]');
			expect(getMagnitude(number)).to.equal(445);
		});

		it('should be 791 for [[[[3,0],[5,3]],[4,4]],[5,5]]', () => {
			const number = parseSnailfishNumber('[[[[3,0],[5,3]],[4,4]],[5,5]]');
			expect(getMagnitude(number)).to.equal(791);
		});

		it('should be 1137 for [[[[5,0],[7,4]],[5,5]],[6,6]]', () => {
			const number = parseSnailfishNumber('[[[[5,0],[7,4]],[5,5]],[6,6]]');
			expect(getMagnitude(number)).to.equal(1137);
		});

		it('should be 3488 for [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]', () => {
			const number = parseSnailfishNumber(
				'[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
			);
			expect(getMagnitude(number)).to.equal(3488);
		});

		it('should be 4140 for the last example', () => {
			const numbers = [
				'[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]',
				'[[[5,[2,8]],4],[5,[[9,9],0]]]',
				'[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]',
				'[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]',
				'[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]',
				'[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]',
				'[[[[5,4],[7,7]],8],[[8,3],8]]',
				'[[9,3],[[9,9],[6,[4,9]]]]',
				'[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]',
				'[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]',
			].map((number) => parseSnailfishNumber(number));
			const sum = addSnailfishNumbers(...numbers);
			expect(sum.toString()).to.equal(
				'[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]'
			);
			expect(getMagnitude(sum)).to.equal(4140);
		});
	});

	describe('addition', () => {
		describe('with the detailed example', () => {
			const a = parseSnailfishNumber('[[[[4,3],4],4],[7,[[8,4],9]]]');
			const b = parseSnailfishNumber('[1,1]');

			it('should work in a set order', () => {
				const result = addSnailfishNumbers(a, b);
				expect(result.toString()).to.equal('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]');
			});
		});

		describe('with simple numbers', () => {
			let simpleNumber1!: SnailfishNumber;
			let simpleNumber2!: SnailfishNumber;
			let simpleNumber3!: SnailfishNumber;
			let simpleNumber4!: SnailfishNumber;
			let simpleNumber5!: SnailfishNumber;
			let simpleNumber6!: SnailfishNumber;

			beforeEach(() => {
				simpleNumber1 = new PairTree<number>(1, 1);
				simpleNumber2 = new PairTree<number>(2, 2);
				simpleNumber3 = new PairTree<number>(3, 3);
				simpleNumber4 = new PairTree<number>(4, 4);
				simpleNumber5 = new PairTree<number>(5, 5);
				simpleNumber6 = new PairTree<number>(6, 6);
			});

			it('should be able to add up the first 4', () => {
				const result = addSnailfishNumbers(
					simpleNumber1,
					simpleNumber2,
					simpleNumber3,
					simpleNumber4
				);
				expect(result.toString()).to.equal('[[[[1,1],[2,2]],[3,3]],[4,4]]');
			});

			it('should be able to add up the first 5', () => {
				const result = addSnailfishNumbers(
					simpleNumber1,
					simpleNumber2,
					simpleNumber3,
					simpleNumber4,
					simpleNumber5
				);
				expect(result.toString()).to.equal('[[[[3,0],[5,3]],[4,4]],[5,5]]');
			});

			it('should be able to add up all 6 of them', () => {
				const result = addSnailfishNumbers(
					simpleNumber1,
					simpleNumber2,
					simpleNumber3,
					simpleNumber4,
					simpleNumber5,
					simpleNumber6
				);
				expect(result.toString()).to.equal('[[[[5,0],[7,4]],[5,5]],[6,6]]');
			});
		});

		describe('with the complex example', () => {
			it('should be able to sum the first two up', () => {
				const firstNumber = parseSnailfishNumber(
					'[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]'
				);
				const secondNumber = parseSnailfishNumber('[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]');
				const result = addSnailfishNumbers(firstNumber, secondNumber);

				expect(result.toString()).to.equal(
					'[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]'
				);
			});

			it('should be able to sum the first three up', () => {
				const previousResult = parseSnailfishNumber(
					'[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]'
				);
				const thirdNumber = parseSnailfishNumber(
					'[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]'
				);
				const result = addSnailfishNumbers(previousResult, thirdNumber);
				expect(result.toString()).to.equal(
					'[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]'
				);
			});

			it('should be able to sum the first four up', () => {
				const previousResult = parseSnailfishNumber(
					'[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]'
				);
				const fourthNumber = parseSnailfishNumber(
					'[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]'
				);
				const result = addSnailfishNumbers(previousResult, fourthNumber);
				expect(result.toString()).to.equal(
					'[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]'
				);
			});

			it('should be able to sum the first five up', () => {
				const previousResult = parseSnailfishNumber(
					'[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]'
				);
				const fifthNumber = parseSnailfishNumber('[7,[5,[[3,8],[1,4]]]]');
				const result = addSnailfishNumbers(previousResult, fifthNumber);
				expect(result.toString()).to.equal(
					'[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]'
				);
			});

			it('should be able to sum the first six up', () => {
				const previousResult = parseSnailfishNumber(
					'[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]'
				);
				const sixthNumber = parseSnailfishNumber('[[2,[2,2]],[8,[8,1]]]');
				const result = addSnailfishNumbers(previousResult, sixthNumber);
				expect(result.toString()).to.equal(
					'[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]'
				);
			});

			it('should be able to sum the first seven up', () => {
				const previousResult = parseSnailfishNumber(
					'[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]'
				);
				const seventhNumber = parseSnailfishNumber('[2,9]');
				const result = addSnailfishNumbers(previousResult, seventhNumber);
				expect(result.toString()).to.equal(
					'[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]'
				);
			});

			it('should be able to sum the first eigth up', () => {
				const previousResult = parseSnailfishNumber(
					'[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]'
				);
				const eighthNumber = parseSnailfishNumber('[1,[[[9,3],9],[[9,0],[0,7]]]]');
				const result = addSnailfishNumbers(previousResult, eighthNumber);
				expect(result.toString()).to.equal(
					'[[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]'
				);
			});

			it('should be able to sum the first nine up', () => {
				const previousResult = parseSnailfishNumber(
					'[[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]'
				);
				const ninthNumber = parseSnailfishNumber('[[[5,[7,4]],7],1]');
				const result = addSnailfishNumbers(previousResult, ninthNumber);
				expect(result.toString()).to.equal(
					'[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]'
				);
			});

			it('should be able to sum the first ten up', () => {
				const previousResult = parseSnailfishNumber(
					'[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]'
				);
				const ninthNumber = parseSnailfishNumber('[[[[4,2],2],6],[8,7]]');
				const result = addSnailfishNumbers(previousResult, ninthNumber);
				expect(result.toString()).to.equal(
					'[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
				);
			});

			it('should be able to sum all of them up at once', () => {
				const numbers = [
					'[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
					'[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
					'[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]',
					'[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]',
					'[7,[5,[[3,8],[1,4]]]]',
					'[[2,[2,2]],[8,[8,1]]]',
					'[2,9]',
					'[1,[[[9,3],9],[[9,0],[0,7]]]]',
					'[[[5,[7,4]],7],1]',
					'[[[[4,2],2],6],[8,7]]',
				].map((number) => parseSnailfishNumber(number));
				const result = addSnailfishNumbers(...numbers);
				expect(result.toString()).to.equal(
					'[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
				);
			});
		});
	});

	describe('explosion', () => {
		it('should explode [[[[[9,8],1],2],3],4] into [[[[0,9],2],3],4]', async () => {
			const number = parseSnailfishNumber('[[[[[9,8],1],2],3],4]');
			let exploded = triggerExplosion(number);
			expect(exploded).to.be.true;
			expect(number.toString()).to.equal('[[[[0,9],2],3],4]');
			exploded = triggerExplosion(number);
			expect(exploded).to.be.false;
		});

		it('should explode [7,[6,[5,[4,[3,2]]]]] into [7,[6,[5,[7,0]]]]', async () => {
			const number = parseSnailfishNumber('[7,[6,[5,[4,[3,2]]]]]');
			let exploded = triggerExplosion(number);
			expect(exploded).to.be.true;
			expect(number.toString()).to.equal('[7,[6,[5,[7,0]]]]');
			exploded = triggerExplosion(number);
			expect(exploded).to.be.false;
		});

		it('should explode [[6,[5,[4,[3,2]]]],1] into [[6,[5,[7,0]]],3]', async () => {
			const number = parseSnailfishNumber('[[6,[5,[4,[3,2]]]],1]');
			let exploded = triggerExplosion(number);
			expect(exploded).to.be.true;
			expect(number.toString()).to.equal('[[6,[5,[7,0]]],3]');
			exploded = triggerExplosion(number);
			expect(exploded).to.be.false;
		});

		it('should explode [[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]] into [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]', async () => {
			const number = parseSnailfishNumber('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]');
			const exploded = triggerExplosion(number);
			expect(exploded).to.be.true;
			expect(number.toString()).to.equal('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]');
		});

		it('should explode [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]] into [[3,[2,[8,0]]],[9,[5,[7,0]]]]', async () => {
			const number = parseSnailfishNumber('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]');
			const exploded = triggerExplosion(number);
			expect(exploded).to.be.true;
			expect(number.toString()).to.equal('[[3,[2,[8,0]]],[9,[5,[7,0]]]]');
		});
	});
});
