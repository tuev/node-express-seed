import request from 'supertest'
import app from '../../../app'
import TodoModel from '../../models/Todo'
import { expect } from 'chai'

describe('test todo api', () => {
  const todoContent = { title: 'test', content: 'content' }
  let todoId = null
  before(() => {
    TodoModel.create(todoContent).then((todo) => (todoId = todo._id))
  })

  after(() => TodoModel.deleteMany({}))

  describe('GET todo list', () => {
    it('should return 200 OK', (done) => {
      request(app)
        .get('/api/v1/todo')
        .expect((res) => {
          expect(res.body).be.not.empty
        })
        .expect(200, done)
    })
  })
  describe('POST todo', () => {
    it('should return 200 OK', (done) => {
      const newTitle = 'new title'
      const newContent = 'new content'
      request(app)
        .post('/api/v1/todo')
        .field('title', newTitle)
        .field('content', newContent)
        .expect((res) => {
          expect(res.body.title).to.equal(newTitle)
          expect(res.body.content).to.equal(newContent)
        })
        .expect(200, done)
    })
  })
  describe('GET todo item', () => {
    it('should return 200 OK', (done) => {
      request(app)
        .get(`/api/v1/todo/${todoId}`)
        .expect((res) => {
          expect(res.body._id).to.equal(`${todoId}`)
        })
        .expect(200, done)
    })
  })
  describe('PUT todo item', () => {
    it('should return 200 OK', (done) => {
      const newTitle = 'new title'
      const newContent = 'new content'
      request(app)
        .put(`/api/v1/todo/${todoId}`)
        .field('title', newTitle)
        .field('content', newContent)
        .expect((res) => {
          expect(res.body.title).to.equal(newTitle)
          expect(res.body.content).to.equal(newContent)
        })
        .expect(200, done)
    })
  })
  describe('DELETE todo', () => {
    it('should return 200 OK', (done) => {
      request(app)
        .delete(`/api/v1/todo/${todoId}`)
        .expect((res) => expect(res.body.data).to.equal('success'))
        .expect(200, done)
    })
  })
})
