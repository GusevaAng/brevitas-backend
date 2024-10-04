import { Router } from 'express'
import UserController from '../controllers/UserController.js'

const userRouter = new Router()

// 1) GET /users - получение списка всех пользователей
userRouter.get('/users', UserController.getAllUsers)

// 2) POST /users - регистрация нового пользователя
userRouter.post('/users', UserController.createNewUser)

// 3) POST /sign-in - авторизация пользователя
userRouter.post('/signIn', UserController.signIn)



export default userRouter