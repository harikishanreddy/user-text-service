import generateToken from '../util/generate-token';
import bcrypt from 'bcryptjs';
import { insert, findById, update, deleteById } from '../db';
import buildErrorMessage from '../util/error-constants';
import { info, error, warn } from '../logger';
import { decodeData } from '../util/encode-decode';

/**
 * @name createUser
 * @description Method to create/register user 
 * @param {Object} req - Http request Object 
 * @param {Object} res - Http response Object
 */
const createUser = async (req, res) => {
    try {
        const { body: { email, password } } = req;
        if (email && password) {
            const userId = await insert(email, password);
            info('User registered successfully', userId);
            res.send({ status: 'success', userid: userId });
        } else {
            throw new Error('INVALID_REQUEST');
        }

    } catch (err) {
        error(`Exception while creating the user : ${err.message}`);
        const { http_status_code, message } = buildErrorMessage(err);
        res.status(http_status_code).send(message);
    }
};

/**
 * @name deleteUserText
 * @description Method to delete the user text
 * @param {Object} req - Http request Object 
 * @param {Object} res - Http response Object
 */
const deleteUserText = async (req, res) => {
    const { userData: { data: { userId, user } } } = req;
    try {
        await deleteById(user);
        info('User text deleted successfully', userId);
        res.send({ status: 'success' });
    } catch (err) {
        error(`Exception while deleting the user text : ${err.message}`, userId);
        const { http_status_code, message } = buildErrorMessage(err);
        res.status(http_status_code).send(message);
    }
};

/**
 * @name getUserText
 * @description Method to ge the user text
 * @param {Object} req - Http request Object 
 * @param {Object} res - Http response Object 
 */
const getUserText = async (req, res) => {
    const { userData: { data: { userId, user } } } = req;
    try {
        let userData = await findById(user);
        info('User text fetch successfull', userId);
        res.send({ text: decodeData(userData.text) });
    } catch (err) {
        error(`Exception while fetching user text: ${err.message}`, userId);
        const { http_status_code, message } = buildErrorMessage(err);
        res.status(http_status_code).send(message);
    }
};

/**
 * @name addUserText
 * @description Method to add the user text
 * @param {Object} req - Http request Object 
 * @param {Object} res - Http response Object 
 */
const addUserText = async (req, res) => {
    const { userData, body: { text } } = req;
    try {
        if (text) {
            await update(text, userData);
            info('User text updated successfully', userData.data.userId);
            res.send({ status: 'success' });
        } else {
            throw new Error('INVALID_REQUEST');
        }

    } catch (err) {
        error(`Exception while updating the user text: ${err.message}`, userData.data.userId);
        const { http_status_code, message } = buildErrorMessage(err);
        res.status(http_status_code).send(message);
    }
};

/**
 * @name authenticateUser
 * @description Method to authenticate user
 * @param {Object} req - Http request Object 
 * @param {Object} res - Http response Object
 */
const authenticateUser = async (req, res) => {
    try {
        const { body: { email: id, password } } = req;
        if (id && password) {
            const userData = await findById(id);
            if (bcrypt.compareSync(password, userData.password)) {
                const token = await generateToken({ userId: userData.user_id, user: userData._id });
                res.set('x-transaction-id', token);
                info('User Authenticated sucessfully', userData.user_id);
                res.send({ status: 'success' });
            } else {
                warn('user entered incorrect data');
                throw new Error('UN_AUTHORIZED');
            }
        } else {
            warn('recieved empty credentials');
            throw new Error('INVALID_REQUEST');
        }

    } catch (err) {
        error(`Exception while authenticating user: ${err.message}`);
        const { http_status_code, message } = buildErrorMessage(err);
        res.status(http_status_code).send(message);
    }
};


module.exports = {
    createUser,
    deleteUserText,
    getUserText,
    addUserText,
    authenticateUser
};