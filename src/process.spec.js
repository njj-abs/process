/* eslint-disable max-lines-per-function */
/* eslint-disable max-nested-callbacks */

import process from './process';
import { retry } from '../test/helpers';
import { map } from '@laufire/utils/collection';

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
});
