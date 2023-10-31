/* eslint-disable max-lines-per-function */
/* eslint-disable max-nested-callbacks */

import { sum } from '@laufire/utils/reducers';
import { rndBetween } from '@laufire/utils/random';
import types from './types';
import { retry } from '../../test/helpers';

const hundred = 100;

describe('types', () => {
	test('random', () => {
		retry(() => {
			const data = {
				min: 1,
				max: 10,
				step: 3,
			};

			const result = types.random(data);

			expect(result).toBeGreaterThanOrEqual(data.min);
			expect(result).toBeLessThanOrEqual(data.max);
			expect(result % data.step).toBe(0);
		});
	});

	test('split', () => {
		const getPositiveValues = (value) =>
			value.filter((val) => val >= 0).length;

		const getParam = () => [rndBetween(0, hundred), rndBetween(1, hundred)];

		retry(() => {
			const data = {
				count: rndBetween(...getParam()),
				value: rndBetween(...getParam()),
			};

			const result = types.split(data);

			expect(result.length).toEqual(data.count);
			expect(result.reduce(sum)).toEqual(data.value);
			expect(getPositiveValues(result)).toBe(data.count);
		});
	});
});
