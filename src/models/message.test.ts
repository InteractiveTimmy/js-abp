// dependencies
import { Message } from './message';
import { Payload } from './payload';

// unit tests
test('should return self', () => {
  const myMessage = new Message();

  expect(myMessage).toBeInstanceOf(Message);
  expect(myMessage.log()).toBeInstanceOf(Message);
  expect(myMessage.setParent()).toBeInstanceOf(Message);
});

test('should have properties', () => {
  const myMessage = new Message();

  expect(myMessage).toHaveProperty('timestamp');
  expect(myMessage).toHaveProperty('value');
});

test('should return Data interface', () => {
  const myOutput = new Message().get();

  expect(myOutput).toHaveProperty('cid');
  expect(myOutput).toHaveProperty('timestamp');
  expect(myOutput).toHaveProperty('data');
  expect(myOutput).toHaveProperty('success');
});

// integration tests
test('should set parent', () => {
  const myPayload = new Payload('yes', 'create', 'test', {});
  const myMessage = myPayload.output.setParent(myPayload);

  expect(myMessage.parent).toBe(myPayload);
});

test('should get data from parent', () => {
  const myPayload = new Payload('yes', 'create', 'test', {});
  const myOutput = myPayload.output.get();

  expect(typeof myOutput.cid).toBe('string');
  expect(typeof myOutput.timestamp).toBe('string');
  expect(typeof myOutput.data).toBe('object');
  expect(typeof myOutput.success).toBe('boolean');
});

test('should return object', () => {
  const myPayload = new Payload('yes', 'create', 'test', {});

  myPayload.output.set({ valueA: '1', valueB: '2' });

  const myOutput = myPayload.output.get();

  expect(typeof myOutput.data).toBe('object');
  expect(myOutput.data).not.toHaveProperty('length');
});

test('should return array', () => {
  const myPayload = new Payload('yes', 'create', 'test', {});

  myPayload.output.set([{ valueA: '1', valueB: '2' }, { valueA: '1', valueB: '2' }]);

  const myOutput = myPayload.output.get();

  expect(typeof myOutput.data).toBe('object');
  expect(myOutput.data).toHaveProperty('length');
});
