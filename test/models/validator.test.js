// import and deconstruct
const JSABP = require('../../build/js-abp');

const { Validator } = JSABP.models;

// unit tests
test('should return Validator class object', () => {
  const validator = new Validator();
  expect(validator).toBeInstanceOf(Validator);
});

test('non-boolean params should throw error', () => {
  expect(() => { const validator = new Validator('true'); }).toThrow();
  expect(() => { const validator = new Validator(1234); }).toThrow();
  expect(() => { const validator = new Validator({}); }).toThrow();
  expect(() => { const validator = new Validator([]); }).toThrow();
});

test('no params should return true', () => {
  const validator = new Validator();
  expect(validator.pTruthy).toBe(true);
});

test('true param should return true', () => {
  const validator = new Validator(true);
  expect(validator.pTruthy).toBe(true);
});

test('false param should return false', () => {
  const validator = new Validator(false);
  expect(validator.pTruthy).toBe(false);
});

test('validate method should return true on param truthy', () => {
  const validator = new Validator();
  expect(validator.validate('value')).toBe(true);
});

test('validate method should return false on empty param truthy', () => {
  const validator = new Validator();
  expect(validator.validate()).toBe(false);
});

test('validate method should return false on param falsy', () => {
  const validator = new Validator(false);
  expect(validator.validate('value')).toBe(false);
});

test('validate method should return true on empty param falsy', () => {
  const validator = new Validator(false);
  expect(validator.validate()).toBe(true);
});
