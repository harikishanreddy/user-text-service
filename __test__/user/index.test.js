import httpMocks from 'node-mocks-http';
import { EventEmitter } from 'events';
import bcryptjs from 'bcryptjs';
import { createUser, deleteUserText, getUserText, addUserText, authenticateUser } from '../../src/user';

jest.mock('../../src/db', () => {

    const insert = (email, password) => '23423-23423-23423-23423';

    const deleteById = (user) => {
        if (user === 'error') {
            throw new Error();
        }
        return "";
    };

    const findById = (user) => {
        if (user === 'error') {
            throw new Error();
        }
        return {
            _id: 'test',
            username: 'test',
            password: '1234'
        };
    };

    const update = (text) => {
        if (text === 'error') {
            throw new Error();
        }
        return "welocme to the service";
    };

    return {
        insert: jest.fn(insert),
        deleteById: jest.fn(deleteById),
        findById: jest.fn(findById),
        update: jest.fn(update)
    }

});

jest.mock('bcryptjs', () => {
    const compareSync = (passowrd) => {
        if(passowrd === 'error') return false;
        return true;
    };
    return {
        compareSync: jest.fn(compareSync),
    }
});

const createRequest = (options) => httpMocks.createRequest(options);
const createResponse = (req) => httpMocks.createResponse({
    req,
    eventEmitter: EventEmitter,
    locals: {
        body: '',
    }
});

describe('User service controller test', () => {

    test('Should be able to register the user', () => {
        const req = createRequest({
            method: 'POST',
            url: '/user/register',
            body: {
                email: 'test@test.com',
                password: '12344'
            },
        });
        const res = createResponse(req);
        createUser(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(200);
        });
    });

    test('Should be able to verify email and passowrd if empty retune invalid request', () => {
        const req = createRequest({
            method: 'POST',
            url: '/user/register',
            body: {
                email: '',
                password: '12344'
            },
        });
        const res = createResponse(req);
        createUser(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(400);
        });
    });

    test('Should be able to delte the user text', () => {
        const req = createRequest({
            method: 'DELETE',
            url: '/user/delete-text',
            userData: {
                data: {
                    userId: '23423-234-234-32423423',
                    user: 'test@t.com'
                }
            }
        });
        const res = createResponse(req);
        deleteUserText(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(200);
        });
    });

    test('Should be able to handle error while deleting the text', () => {
        const req = createRequest({
            method: 'DELETE',
            url: '/user/delete-text',
            userData: {
                data: {
                    userId: '23423-234-234-32423423',
                    user: 'error'
                }
            }
        });
        const res = createResponse(req);
        deleteUserText(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(500);
        });
    });


    test('Should be able to delte the user text', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/user/text',
            userData: {
                data: {
                    userId: '23423-234-234-32423423',
                    user: 'test@t.com'
                }
            }
        });
        const res = createResponse(req);
        await getUserText(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(200);
        });
    });

    test('Should be able to handle error while deleting the text', async () => {
        const req = createRequest({
            method: 'GET',
            url: '/user/text',
            userData: {
                data: {
                    userId: '23423-234-234-32423423',
                    user: 'error'
                }
            }
        });
        const res = createResponse(req);
        await getUserText(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(500);
        });
    });


    test('Should be able to add the user text', async () => {
        const req = createRequest({
            method: 'POST',
            url: '/user/add-text',
            body: {
                text: 'this is private text'
            },
            userData: {
                data: {
                    userId: '23423-234-234-32423423',
                    user: 'test@t.com'
                }
            }
        });
        const res = createResponse(req);
        await addUserText(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(200);
        });
    });

    test('Should be able to handle error while adding user text', async () => {
        const req = createRequest({
            method: 'POST',
            url: '/user/add-text',
            body: {
                text: ''
            },
            userData: {
                data: {
                    userId: '23423-234-234-32423423',
                    user: 'test@t.com'
                }
            }
        });
        const res = createResponse(req);
        await addUserText(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(400);
        });
    });

    test('Should be able to return 400 if id  emapty', async () => {
        const req = createRequest({
            method: 'POST',
            url: '/user/authenticate',
            body: {
                email: '',
                password: '1234'
            }
        });
        const res = createResponse(req);
        await authenticateUser(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(400);
        });
    });

    test('Should be able to return 400 if password emapty', async () => {
        const req = createRequest({
            method: 'POST',
            url: '/user/authenticate',
            body: {
                email: 'test',
                password: ''
            }
        });
        const res = createResponse(req);
        await authenticateUser(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(400);
        });
    });

    test('Should be able to return UN_AUTHORIZED user crentials were wrong', async () => {
        const req = createRequest({
            method: 'POST',
            url: '/user/authenticate',
            body: {
                email: 'test',
                password: 'error'
            }
        });
        const res = createResponse(req);
        await authenticateUser(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(401);
        });
    });

    test('Should be able to return token if user provide valid credntials', async () => {
        const req = createRequest({
            method: 'POST',
            url: '/user/authenticate',
            body: {
                email: 'test',
                password: '1234'
            }
        });
        const res = createResponse(req);
        await authenticateUser(req, res);
        res.on('end', () => {
            expect(res.statusCode).toBe(200);
        });
    });

});