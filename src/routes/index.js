import { Router } from 'express';
import authorizeUser from '../middleware/authenticate';
import {
    createUser,
    deleteUserText,
    getUserText,
    addUserText,
    authenticateUser
} from '../user';

/**
 * @name userModuleRoutes
 * @description Method to prepare the user routes
 */
const userModuleRoutes = () => {
    const routes = Router();
    routes.get('/user/text', authorizeUser, getUserText);
    routes.post('/user/register', createUser);
    routes.post('/user/add-text', authorizeUser, addUserText);
    routes.put('/user/update-text', authorizeUser, addUserText);
    routes.delete('/user/delete-text', authorizeUser, deleteUserText); 
    routes.post('/user/authenticate', authenticateUser)
    return routes;
};

export default userModuleRoutes;