import { uuid } from './uuid';
test('should return string', () => {
    const myUUID = uuid();
    expect(typeof myUUID).toBe('string');
});
test('should be length of 36', () => {
    const myUUID = uuid();
    expect(myUUID.length).toBe(36);
});
test('should be unique', () => {
    for (let i = 0; i < 1000; i += 1) {
        expect(uuid()).not.toBe(uuid());
    }
});
