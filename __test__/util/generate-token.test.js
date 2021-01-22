import generateToken from '../../src/util/generate-token';

describe('Test Generate token', () => {

    test('Should be be able to generate the token with given claims', async () => {
        const claims = {
            userId: '123456789',
            user: 'test@gmail.com'
        };
        const token = await generateToken(claims);
        expect(token).toBeDefined();
    });

});