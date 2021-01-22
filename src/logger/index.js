import { createLogger, transports } from 'winston';

const logger = createLogger({
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
    ],
});

const handleLog = (message, userid, level) => {
    const logData = {
        timestamp: new Date(Date.now()),
        message,
    };
    if (userid) logData.userid = userid;
    return logger[level](logData)
};

const info = (message, userid) => handleLog(message, userid, 'info');

const error = (message,userid) => handleLog(message, userid, 'error');

const warn = (message, userid) => handleLog(message, userid, 'warn');

module.exports = {
    info,
    error,
    warn
}