/* eslint-disable max-lines-per-function */
/* eslint-disable max-nested-callbacks */

import process from './process';
import { retry } from '../test/helpers';
import { map, range } from '@laufire/utils/collection';
import { truthy } from '@laufire/utils/predicates';
import { sum } from '@laufire/utils/reducers';
import { rndBetween, rndString } from '@laufire/utils/random';

const hundred = 100;

describe('process', () => {
	test('random', () => {
		const data = {
			a: {
				type: 'random',
				min: 1,
				max: 10,
				step: 3,
			},
			b: {
				type: 'random',
				min: 1,
				max: 5000,
				step: 2000,
			},
		};

		retry(() => {
			const result = process(data);

			map(result, (value, key) => {
				expect(value).toBeGreaterThanOrEqual(data[key].min);
				expect(value).toBeLessThanOrEqual(data[key].max);
				expect(value % data[key].step).toBe(0);
			});
		});
	});

	test('split', () => {
		const hasNegativeValues = (value) =>
			truthy(value.filter((val) => val < 0).length);

		const hasNonPositiveValues = (value) =>
			truthy(value.filter((val) => val <= 0).length);

		const minValue = () => rndBetween(0, hundred);
		const maxValue = () => rndBetween(1, hundred);

		retry(() => {
			const data = range(0, rndBetween()).reduce((acc) => ({
				...acc,
				[rndString]: {
					type: 'split',
					count: rndBetween(minValue(), maxValue()),
					value: rndBetween(minValue(), maxValue()),
				},
			}), {});

			const result = process(data);

			map(result, (value, key) => {
				const isCountGreater = data[key].count > data[key].value;

				const isNegative = isCountGreater
					? hasNonPositiveValues(value)
					: hasNegativeValues(value);

				expect(value.length).toEqual(data[key].value);
				expect(value.reduce(sum)).toEqual(data[key].count);
				expect(isNegative).toBe(false);
			});
		});
	});
});
