import express from 'express'
import * as todoController from '../controllers/todoController'

const todoRouter = express.Router()

todoRouter
  .get('/', todoController.getTodoList)
  .post('/', todoController.createTodo)
  .put('/:id', todoController.updateTodo)
  .get('/:id', todoController.getTodo)
  .delete('/:id', todoController.deleteTodo)

export default todoRouter
