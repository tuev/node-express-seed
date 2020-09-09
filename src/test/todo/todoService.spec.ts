import { expect } from 'chai'
import TodoService from '../../services/TodoService'
import TodoModel from '../../models/Todo'

describe('Todo service', () => {
  const todoContent = { title: 'test', content: 'content' }
  let todoId: string = ''
  before(() => {
    TodoModel.create(todoContent).then((todo) => (todoId = todo._id))
  })

  after(() => TodoModel.deleteMany({}))

  describe('should create a new todo empty', () => {
    it('should success', (done) => {
      TodoService.createTodo()
        .then((todo) => {
          expect(todo).not.empty
          done()
        })
        .catch(done)
    })
  })

  describe('should create a new todo', () => {
    it('should success', (done) => {
      const todoContentCreate = { title: 'test2', content: 'content2' }
      TodoService.createTodo(todoContentCreate)
        .then((todo) => {
          expect(todo).not.empty
          done()
        })
        .catch(done)
    })
  })

  describe('should get a todo', () => {
    it('should success', (done) => {
      TodoService.getTodo(todoId)
        .then((todo) => {
          expect(todo).not.empty
          done()
        })
        .catch(done)
    })
  })

  describe('should get todo list', () => {
    it('should success', (done) => {
      TodoService.getTodoList()
        .then((todos) => {
          expect(todos.length).to.equal(3)
          done()
        })
        .catch(done)
    })
  })

  describe('should update todo', () => {
    it('should be success', async () => {
      const newContent = 'new content'
      const updateTodo = await TodoService.updateTodo(todoId, {
        title: newContent,
      })
      expect(updateTodo?.toJSON().title).to.equal(newContent)
    })
  })

  describe('should delete todo', () => {
    it('should success', (done) => {
      TodoService.deleteTodo(todoId)
        .then(() => {
          return TodoModel.findById(todoId)
        })
        .then((todo) => {
          expect(todo).to.equal(null)
          done()
        })
        .catch(done)
    })
  })
})
