const { hashPassword, comparePassword } = require('../utils/password');

test('hashPassword should hash password', async () => {
    const hash = await hashPassword('secret123');
    expect(hash).not.toBe('secret123');
});

test('comparePassword should return true for correct password', async () => {
    const hash = await hashPassword('secret123');
    const result = await comparePassword('secret123', hash);
    expect(result).toBe(true);
});