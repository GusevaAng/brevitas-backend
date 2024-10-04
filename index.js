import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
import userRouter from './routes/UserRouter.js'

const PORT = 3000

const app = express()
app.use(express.json())

app.use(bodyParser.json())

app.use(cors())

app.use('/api', userRouter)

const startApp = async () => {
    try {
        await app.listen(PORT, () => {
            console.log(`Сервер запущен: ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
} 

startApp()