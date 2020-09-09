import TodoModel from '../models/Todo'
import { Document } from 'mongoose'

class TodoService {
  public async getTodoList(): Promise<Document[]> {
    return TodoModel.find()
  }

  public async getTodo(id: string): Promise<Document | null> {
    return TodoModel.findById(id)
  }

  public async createTodo(todo: { title?: string; content?: string } = { title: '', content: '' }): Promise<Document> {
    return TodoModel.create(todo)
  }

  public async updateTodo(id: string,
    todo: { title?: string; content?: string }): Promise<Document | null> {
    return TodoModel.findByIdAndUpdate(id, todo, { new: true })
  }

  public async deleteTodo(id: string): Promise<Document | null> {
    return TodoModel.findOneAndDelete({ _id: id })
  }
}

export default new TodoService()
