const errorConstants = {

    INTERNAL_SERVER_ERROR: {
        http_status_code: '500',
        message: {
            status_code: '500',
            description: 'Internal server error'
        }
    },

    INVALID_REQUEST: {
        http_status_code: '400',
        message: {
            status_code: '400',
            description: 'Inavlid request'
        }
    },

    UN_AUTHORIZED: {
        http_status_code: '401',
        message: {
            status_code: '401',
            description: 'In valid User'
        }
    },

    USER_ALREADY_EXIST: {
        http_status_code: '409',
        message: {
            status_code: '409',
            description: 'User already exist'
        }
    }
};

const buildErrorMessage = (err) => {
    if (err) {
        return errorConstants[err.message] || errorConstants[err] || errorConstants.INTERNAL_SERVER_ERROR;
    } else {
        return errorConstants.INTERNAL_SERVER_ERROR;
    }
};

export default buildErrorMessage;