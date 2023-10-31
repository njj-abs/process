import { collection } from '@laufire/utils';
import { rndValue } from '@laufire/utils/random';
import types from './types';
import { keys } from '@laufire/utils/lib';
import process from './index';

test('process', () => {
	const type = rndValue(keys(types));
	const data = { type };
	const processedValue = Symbol('typeValue');
	const typeFn = jest.fn().mockReturnValue();

	jest.spyOn(types, type).mockReturnValue(typeFn);
	jest.spyOn(collection, 'map').mockImplementation((value, cb) => {
		cb(value);

		expect(types[value.type]).toHaveBeenCalledWith(value);

		return processedValue;
	});

	const result = process(data);

	expect(collection.map).toHaveBeenCalledWith(data, expect.any(Function));
	expect(result).toEqual(processedValue);
});
