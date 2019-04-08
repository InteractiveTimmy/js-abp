import {
  isMethod,
  isData,
  isDataArray,
  isErr,
  isOutput,
} from './types';

test('isMethod should return true', () => {
  expect(isMethod('create')).toBe(true);
  expect(isMethod('read')).toBe(true);
  expect(isMethod('update')).toBe(true);
  expect(isMethod('delete')).toBe(true);
});
