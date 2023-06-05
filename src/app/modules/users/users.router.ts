import express from 'express'
import usersControllers from './users.controllers'

const router = express.Router()

router.route('/create-user').post(usersControllers.createUserController)

export default router
