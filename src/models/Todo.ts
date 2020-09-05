import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    title: String,
    content: String,
  },
  { timestamps: true })

const TodoModel = mongoose.model('Todo', todoSchema)

export default TodoModel
