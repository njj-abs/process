import { map } from '@laufire/utils/collection';
import { rndBetween } from '@laufire/utils/random';

const types = {
	random: ({ min, max }) => rndBetween(min, max + 1),

};

const process = (data) => map(data, (value) => types[value.type](value));

export default process;
