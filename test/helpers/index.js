/**
 *
 * Helper functions for testing.
 */

const { map, range } = require('@laufire/utils/collection');

const expectMockCalls = (fn) => (expectation) =>
	expect(fn.mock.calls).toEqual(expectation);

// #TODO: Fix. Module paths wont work due the inability in resolving paths, relative to the calling module.
const forceRequire = (module) => {
	jest.unmock(module);
	return require(module);
};

const retry = (fn, retryCount = 100) =>
	map(range(0, retryCount), (value) => fn(value));

module.exports = {
	expectMockCalls,
	forceRequire,
	retry,
};
