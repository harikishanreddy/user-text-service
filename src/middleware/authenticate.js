import jwt from 'jsonwebtoken';
import { info, error } from '../logger';

const tokenSecreat = 'secret';

/**
 * @name authorizeUser
 * @description Method to validate the token and authorize the User to access the resources
 * @param {Object} req - Http request object
 * @param {Object} res - Http response Object 
 * @param {*} next - Method to invoke next middleware or controller
 */
const authorizeUser = (req, res, next) => {
    const transactionId = req.headers['x-transaction-id'];
    if (transactionId) {
        jwt.verify(transactionId, tokenSecreat, (err, data) => {
            if (err) {
                error('In valid token recived');
                res.status(403).send('FORBIDDEN');
            } else {
                info('Token validated successfully');
                req.userData = data;
                next();
            }
        });
    } else {
        error('Transaction id missing in the request headers');
        res.status(401).send('UN_AUTHORIZED');
    }
};

export default authorizeUser;