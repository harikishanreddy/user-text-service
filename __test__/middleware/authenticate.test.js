import httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import authorizeUser from '../../src/middleware/authenticate';
import generateToken from '../../src/util/generate-token';

const createRequest = (options) => httpMocks.createRequest(options);
const createResponse = (req) => httpMocks.createResponse({
    req,
    eventEmitter: EventEmitter,
    locals: {
        body: '',
    }
});



describe('Test Authneticate Midlleware', () => {

    test('Should be able to validate token if token validate retun 403 FORBIDDEN', () => {

        const headers = {
            'x-transaction-id': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTEyMjQ0NTEsImRhdGEiOnsidXNlcklkIjoiY2NmMmM0NjEtMTYzZi00NGQ1LTk2NGItNDAzODA0MTNkNTc4IiwidXNlciI6InRlc3QxQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MTEyMjA4NTF9.5qnJ_voomZoRUKbTtx8Pv2z5kBTB7YEsz2MLsQQYCRA",
        };

        const req = createRequest({
            method: 'POST',
            url: '/user/add-text',
            body: {
                text: 'user private text'
            },
            headers,
        });

        const res = createResponse(req);
        const next = jest.fn();
        authorizeUser(req, res, next);
        res.on('end', () => {
            expect(res.statusCode).toBe(403);
        });
    });


    test('Should be return 401 UN_AUTHORIZED if Header contains empty toke', () => {

        const headers = {
            'x-transaction-id': "",
        };

        const req = createRequest({
            method: 'POST',
            url: '/user/add-text',
            body: {
                text: 'user private text'
            },
            headers,
        });

        const res = createResponse(req);
        const next = jest.fn();
        authorizeUser(req, res, next);
        res.on('end', () => {
            expect(res.statusCode).toBe(401);
        });
    });

    test('Should be validate the token if it is valid allow user to access the resources', async () => {

        const toekn = await generateToken({ userId: '123', user: 'test'});
        const headers = {
            'x-transaction-id': toekn,
        };

        const req = createRequest({
            method: 'POST',
            url: '/user/add-text',
            body: {
                text: 'user private text'
            },
            headers,
        });

        const res = createResponse(req);
        const next = jest.fn();
        authorizeUser(req, res, next);
        res.on('end', () => {
            expect(res.statusCode).toBe(401);
        });
    });

});