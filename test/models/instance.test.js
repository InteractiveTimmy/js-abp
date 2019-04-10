// import and deconstruct
const JSABP = require('../../build/js-abp');
const { Instance } = JSABP.models;

test('should return new Instance', () => {
  const instance = new Instance();
  expect(instance).toBeInstanceOf(Instance);
});