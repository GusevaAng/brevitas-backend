import UserService from '../services/UserService.js'


class UserController {

    // 1) GET /users - получение списка всех пользователей
    getAllUsers = async (req, res) => {
        try {
            const users = await UserService.getAllUsers()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // 2) POST /users - добавление нового пользователя
    createNewUser = async (req, res) => {
        try {
            const { user_name, user_surname, user_login, user_birthday, user_email, user_password } = req.body
            const user = await UserService.createNewUser(user_name, user_surname, user_login, user_birthday, user_email, user_password)
            res.status(201).json(user)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    // 3) POST /sign-in - авторизация пользователя
    signIn = async (req, res) => {
        try {
            const { user_email, user_password } = req.body
            const user = await UserService.signIn(user_email, user_password)
            res.status(201).json(user)
        } catch (error) {
            if (error.status === 401) {
                res.status(401).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    }
}

export default new UserController()

