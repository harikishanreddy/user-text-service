import PouchDB from 'pouchdb';
import bcrypt from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';
import AsyncLock from 'async-lock';
import { encodeData } from '../util/encode-decode';

const db = new PouchDB('userdb');
const lock = new AsyncLock();

/**
 * @name insert
 * @description Method to create the new user
 * @param {String} email - user email Id
 * @param {String} password - user passowrd
 */
const insert = (email = '', password) => new Promise((resolve, reject) => {
    const id = uuidV4();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) reject(err);
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) reject(err);
            const doc = {
                _id: email.toLowerCase(),
                user_id: id,
                email,
                password: hash,
                text: ''
            }
            lock.acquire('insert', () => {
                db.put(doc)
                    .then(() => resolve(id))
                    .catch(err => {
                        if (err.message === 'Document update conflict') {
                            reject('USER_ALREADY_EXIST');
                        } else {
                            reject(err);
                        }
                    });
            });
        });
    });
});

/**
 * @name update
 * @description Method to update the user text
 * @param {String} text - User text
 * @param {Object} userData - User meta data
 */
const update = (text, userData) => new Promise((resolve, reject) => {
    const { data: { user = '' } } = userData;
    lock.acquire('update', () => {
        db.get(user.toLowerCase())
            .then(doc => {
                doc.text = encodeData(text);
                db.put(doc);
                resolve();
            })
            .catch(err => reject(err));
    });
});

/**
 * @name findById
 * @description Method to find the user details from DB
 * @param {String} id - User id 
 */
const findById = (id = '') => new Promise((resolve, reject) => {

    lock.acquire('findById', () => {
        db.get(id.toLowerCase()).then(data => resolve(data)).catch(err => reject(err));
    });

});

/**
 * @name deleteById
 * @description Method to delete the text of user
 * @param {Object} userData - User meta information
 */
const deleteById = (user = '') => new Promise((resolve, reject) => {
    lock.acquire('findById', () => {
        db.get(user.toLowerCase())
            .then(doc => {
                doc.text = '';
                db.put(doc);
                resolve();
            })
            .catch(err => reject(err));
    });
});

module.exports = {
    insert,
    update,
    deleteById,
    findById,
    db,
};