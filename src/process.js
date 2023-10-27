import { map, range } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/random';

const types = {
	random: ({ min, max }) => rndBetween(min, max + 1),

	split: ({ value, count }) => {
		const half = Math.floor(count / value);
		const data = range(0, value).map(() => half);

		data[0] += count - (half * value);

		return data;
	},
};

const process = (data) => map(data, (value) => types[value.type](value));

export default process;
