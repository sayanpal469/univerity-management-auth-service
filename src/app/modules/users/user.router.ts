import express from 'express'
import { UserController } from './user.controllers'

const router = express.Router();

router.route('/create-user').post(UserController.createUserController);

export const UserRoutes = router;
