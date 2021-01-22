import jwt from 'jsonwebtoken';
import { info } from '../logger';

const tokenSecreat = 'secret';

/**
 * @name generateToken
 * @description Method to generate the JWT token
 * @param {Object} claims - User meta data 
 */
const generateToken = async (claims) => {
    let token = await jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: { ...claims }
      }, tokenSecreat, { algorithm: 'HS256', encoding: 'utf8'});
      info('token created successfully');
      return token;
};

export default generateToken;