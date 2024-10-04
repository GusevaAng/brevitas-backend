import pool from '../db/db.js' 
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

class UserService {

    // 1) GET /users - получение списка всех пользователей
    getAllUsers = async () => {
        const { rows } = await pool.query('SELECT * FROM users')
        return rows
    }

    // 2) POST /users - добавление нового пользователя
    createNewUser = async (user_name, user_surname, user_login, user_birthday, user_email, user_password) => {
        const { rows } = await pool.query(
            'INSERT INTO users (user_name, user_surname, user_login, user_birthday, user_email, user_password) VALUES ($1, $2, $3, $4, $5, crypt($6, gen_salt(\'md5\'))) RETURNING *',
            [user_name, user_surname, user_login, user_birthday, user_email, user_password]
        )
        return rows[0]
    }

    // 3) POST /sign-in - авторизация пользователя
    signIn = async(user_email, password) => {
        try {
            const user = await pool.query(
                `select * from users where user_email=$1`,
                [ user_email]
            )
    
            const result = await this.verifyPass(password, user.rows[0].user_password)
            if (result.rows[0].crypt != user.rows[0].user_password) {
                const error = new Error('Неверный пароль')
                error.status = 401
                throw error
            }

            const token = jwt.sign({user_name: user.rows[0].user_name}, process.env.SECRET)
            return token
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    verifyPass = async(pass, hash) => {
        return pool.query(
            `SELECT crypt($1, $2);`,
            [ pass, hash]
        )
    }
}

export default new UserService()