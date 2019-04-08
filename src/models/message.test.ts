// dependencies
import { Message } from './message';
import { isOutput } from './types';

// unit tests
test('should return self', () => {
  const message = new Message();
  expect(message).toBeInstanceOf(Message);
});

test('should have property get', () => {
  const message = new Message();
  expect(message).toHaveProperty('get');
});

test('should have property set', () => {
  const message = new Message();
  expect(message).toHaveProperty('set');
});

test('should have property log', () => {
  const message = new Message();
  expect(message).toHaveProperty('log');
});

test('should return data output interface', () => {
  const output = new Message().get();

  expect(isOutput(output)).toBe(true);
});

test('should return matching data output after input', () => {
  const data = { valueA: 'a', valueB: 'b', valueC: 'c' };
  const message = new Message().set(data);

  const output = message.get();

  expect(isOutput(output)).toBe(true);
  expect(output.data).toBe(data);
});
