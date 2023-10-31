import { range } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/random';

const types = {
	random: ({ min, max, step = 1 }) => {
		const minWithStep = min - (min % step);
		const minValue = minWithStep ? minWithStep : minWithStep + step;

		const randomRange = rndBetween(minValue, max + 1);

		const result = randomRange - (randomRange % step);

		return result;
	},

	split: ({ value, count }) => {
		const half = Math.floor(count / value);
		const data = range(0, value).map(() => half);

		data[0] += count - (half * value);

		return data;
	},
};

export default types;
