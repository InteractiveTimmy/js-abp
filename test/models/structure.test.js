// import and deconstruct
const JSABP = require('../../build/js-abp');

const { Structure, Validator } = JSABP.models;

// unit tests
test('constructor should throw error with no parameters specified', () => {
  expect(() => {
    const structure = new Structure();
  }).toThrow();
});

test('constructor with first parameter should return Structure class object', () => {
  const structure = new Structure('example');
  expect(structure).toBeInstanceOf(Structure);
});

test('constructor without 2+ parameters should generate an id validator group', () => {
  const structure = new Structure('example');
  expect(structure.validators.id).toEqual([]);
});

test('constructor with 2+ parameters should generate matching validator group', () => {
  const myKeys = [
    Math.random().toString(),
    Math.random().toString(),
    Math.random().toString(),
  ];

  const structure = new Structure('example', ...myKeys);

  myKeys.forEach((key) => {
    expect(structure.validators[key]).toEqual([]);
  });
});

// integration test
test('should load validators', () => {
  const structure = new Structure('example', 'keyA');
  const validatorA = new Validator();
  const validatorB = new Validator();

  structure.load('keyA', validatorA, validatorB);

  expect(structure.validators.keyA[0]).toBe(validatorA);
  expect(structure.validators.keyA[1]).toBe(validatorB);
});

test('should not load anything other than a validator', () => {
  const structure = new Structure('exmaple', 'keyA');

  const validatorA = 'hello validator';
  const validatorB = 123;
  const validatorC = [];
  const validatorD = {};

  expect(() => { structure.load('keyA', validatorA); }).toThrow();
  expect(() => { structure.load('keyA', validatorB); }).toThrow();
  expect(() => { structure.load('keyA', validatorC); }).toThrow();
  expect(() => { structure.load('keyA', validatorD); }).toThrow();
});

test('should not load if param key is invalid', () => {
  const structure = new Structure('example', 'key');
  const validator = new Validator();

  expect(() => { structure.load('keyB', validator); }).toThrow();
  expect(() => { structure.load(123, validator); }).toThrow();
  expect(() => { structure.load({}, validator); }).toThrow();
  expect(() => { structure.load([], validator); }).toThrow();
});

test('should unload listed validators', () => {
  const structure = new Structure('example', 'key');
  const validatorA = new Validator();
  const validatorB = new Validator(false);

  const unloadedValidator = (Math.random() > 0.5) ? validatorA : validatorB;
  const notUnloadedValidator = (unloadedValidator === validatorA) ? validatorB : validatorA;

  structure.load('key', validatorA, validatorB);
  structure.unload('key', unloadedValidator);

  expect(structure.validators.key[0]).toBe(notUnloadedValidator);
});

test('should unload all validators', () => {
  const structure = new Structure('example', 'keyA', 'keyB');
  const validatorA = new Validator();
  const validatorB = new Validator(false);
  const validatorC = new Validator();
  const validatorD = new Validator(false);

  structure.load('keyA', validatorA, validatorB);
  structure.load('keyB', validatorC, validatorD);
  structure.unload();

  expect(structure.validators.keyA).toEqual([]);
  expect(structure.validators.keyB).toEqual([]);
});

test('should unload all validators under key', () => {
  const structure = new Structure('example', 'key1', 'key2');
  const validatorA = new Validator();
  const validatorB = new Validator(false);
  const validatorC = new Validator();
  const validatorD = new Validator(false);

  structure.load('key1', validatorA, validatorB);
  structure.load('key2', validatorC, validatorD);

  const unloadedKey = (Math.random() > 0.5) ? 'key1' : 'key2';
  const loadedKey = (unloadedKey === 'key1') ? 'key2' : 'key1';
  structure.unload(unloadedKey);

  expect(structure.validators[unloadedKey]).toEqual([]);
  expect(structure.validators[loadedKey].length).toBe(2);
});

test('should not unload if param key is invalid', () => {
  const structure = new Structure('example', 'key');
  const validator = new Validator();

  structure.load('key', validator);

  expect(() => { structure.unload('otherKey', validator); }).toThrow();
  expect(() => { structure.unload(456, validator); }).toThrow();
  expect(() => { structure.unload({}, validator); }).toThrow();
  expect(() => { structure.unload([], validator); }).toThrow();
});

test('should not unload anything other than a validator', () => {
  const structure = new Structure('example', 'key');
  const validator = new Validator();

  structure.load('key', validator);

  expect(() => { structure.unload('key', 'validator'); }).toThrow();
  expect(() => { structure.unload('key', 1234); }).toThrow();
  expect(() => { structure.unload('key', {}); }).toThrow();
  expect(() => { structure.unload('key', []); }).toThrow();
});
