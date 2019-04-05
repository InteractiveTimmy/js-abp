import { Validator } from './validator';
test('should return Validator class object', () => {
    const myValidator = new Validator();
    expect(myValidator).toBeInstanceOf(Validator);
});
test('should have appropriate properties', () => {
    const myValidator = new Validator();
    expect(myValidator).toHaveProperty('validate');
});
