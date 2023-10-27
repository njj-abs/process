import { peek } from '@laufire/utils/debug';
import process from './process';

test('process', () => {
	const data = {
		a: {
			type: 'random',
			min: 1,
			max: 10,
			step: 2,
		},
		b: {
			type: 'split',
			value: 5,
			count: 10,
		},
	};

	peek(process(data));
});
