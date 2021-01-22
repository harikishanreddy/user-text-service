import userModuleRoutes from '../../src/routes';

jest.mock('../../src/app');

const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();
const mockDelete = jest.fn();

jest.mock('express', () => ({
    Router: () => ({
        get: (context, func1, func2) => mockGet(context, func1, func2),
        post: (context, func1, func2) => mockPost(context, func1, func2),
        put: (context, func1, func2) => mockPut(context, func1, func2),
        delete: (context, func1, func2) => mockDelete(context, func1, func2),
    }),
}));

describe('Test User Service routes', () => {
    test('routes called', () => {
        const Routes = userModuleRoutes();
        expect(mockGet.mock.calls[0]).toContain('/user/text');
        expect(mockPost.mock.calls[0]).toContain('/user/register');
        expect(mockPost.mock.calls[1]).toContain('/user/add-text');
        expect(mockPut.mock.calls[0]).toContain('/user/update-text');
        expect(mockDelete.mock.calls[0]).toContain('/user/delete-text');
    });
});