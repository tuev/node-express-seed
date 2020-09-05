import express from 'express'
import todoRouter from './todoRouter'

const restRouter = express.Router()

restRouter.use('/todo', todoRouter)

export default restRouter
