import buildErrorMessage from "../../src/util/error-constants";

describe('Test the Error constants', () => {

    test('Should be able to return Internal Server error if any error is undefined', () => {
        const errorData = buildErrorMessage(undefined);
        const expResponse = {
            http_status_code: '500',
            message: {
                status_code: '500',
                description: 'Internal server error'
            }
        };
        expect(errorData).toEqual(expResponse);
    });

    test('Should be able to return INVALID_REQUEST if any error raised with invalid data', () => {
        const errorData = buildErrorMessage({ message: "INVALID_REQUEST"});
        const expResponse = {
            http_status_code: '400',
            message: {
                status_code: '400',
                description: 'Inavlid request'
            }
        };
        expect(errorData).toEqual(expResponse);
    });

    test('Should be able to return Internal Server error if any error is empty', () => {
        const errorData = buildErrorMessage("test");
        const expResponse = {
            http_status_code: '500',
            message: {
                status_code: '500',
                description: 'Internal server error'
            }
        };
        expect(errorData).toEqual(expResponse);
    });

    test('Should be able to return UN_AUTHORIZED if any token is invalid', () => {
        const errorData = buildErrorMessage('UN_AUTHORIZED');
        const expResponse = {
            http_status_code: '401',
            message: {
                status_code: '401',
                description: 'In valid User'
            }
        };
        expect(errorData).toEqual(expResponse);
    });


});