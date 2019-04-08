import { Validator } from './validator';

test('should return Validator class object', () => {
  const validator = new Validator();

  expect(validator).toBeInstanceOf(Validator);
});

test('should return boolean', () => {
  const validator = new Validator();

  expect(typeof validator.validate('value')).toBe('boolean');
});

test('should return true', () => {
  const validator = new Validator();

  expect(validator.validate('value')).toBe(true);
  expect(validator.validate()).toBe(false);
});

test('should return false', () => {
  const validator = new Validator(false);

  expect(validator.validate()).toBe(true);
  expect(validator.validate('value')).toBe(false);
});
