import { Request, Response } from 'express'
import TodoService from '../services/TodoService'
import pick from 'lodash/pick'

export const getTodoList = async (req: Request, res: Response) => {
  const todoList = await TodoService.getTodoList()
  console.log(todoList, 'todlo')
  res.json(todoList)
}

export const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params
  const todoItem = await TodoService.getTodo(id as string)
  res.json(todoItem)
}

export const createTodo = async (req: Request, res: Response) => {
  const body = req.body
  const newTodo = await TodoService.createTodo(body)
  res.json(newTodo)
}

export const updateTodo = async (req: Request, res: Response) => {
  const todo = req.body
  const { id } = req.params
  const updatedTodo = await TodoService.updateTodo(id,
    pick(todo, ['title', 'content']))
  res.json(updatedTodo)
}

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params
  await TodoService.deleteTodo(id)
  res.json({ data: 'success' })
}
